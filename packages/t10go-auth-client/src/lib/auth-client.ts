import { HttpClient, HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { EnvironmentProviders, Injectable, InjectionToken, inject, makeEnvironmentProviders } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { firstValueFrom } from 'rxjs';

const ACCESS_TOKEN_KEY = 't10go.auth.access-token';
const PKCE_VERIFIER_KEY = 't10go.auth.pkce-verifier';

export interface T10goAuthConfig {
  /** Shell identity API base URL, for example `http://localhost:5100`. */
  readonly authApiUrl: string;
  /** Absolute URL of the Shell application, used by protected microfrontends. */
  readonly shellUrl: string;
  /** API base URLs which should receive the current Bearer token. */
  readonly protectedApiUrls?: readonly string[];
}

export interface RegisterResponse {
  readonly developmentConfirmationUrl?: string | null;
}

export interface TokenResponse {
  readonly accessToken: string;
}

export const T10GO_AUTH_CONFIG = new InjectionToken<T10goAuthConfig>('T10GO_AUTH_CONFIG');

/** Provides the shared session service and only attaches a token to configured APIs. */
export function provideT10goAuth(config: T10goAuthConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: T10GO_AUTH_CONFIG, useValue: config },
    provideHttpClient(withInterceptors([t10goAuthInterceptor])),
  ]);
}

@Injectable({ providedIn: 'root' })
export class T10goAuthSession {
  private readonly http = inject(HttpClient);
  private readonly config = inject(T10GO_AUTH_CONFIG);

  get accessToken(): string | null {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY);
  }

  get isAuthenticated(): boolean {
    return this.accessToken !== null;
  }

  async register(email: string, password: string): Promise<RegisterResponse> {
    return firstValueFrom(this.http.post<RegisterResponse>(`${this.config.authApiUrl}/api/auth/register`, { email, password }));
  }

  async login(email: string, password: string): Promise<void> {
    this.storeToken(await firstValueFrom(this.http.post<TokenResponse>(`${this.config.authApiUrl}/api/auth/login`, { email, password })));
  }

  /** Begins Google Authorization Code + PKCE. The verifier never leaves the browser until code exchange. */
  async beginGoogleSignIn(returnUrl: string): Promise<void> {
    const verifier = createVerifier();
    sessionStorage.setItem(PKCE_VERIFIER_KEY, verifier);
    const challenge = await createChallenge(verifier);
    const query = new URLSearchParams({ returnUrl, codeChallenge: challenge, codeChallengeMethod: 'S256' });
    window.location.assign(`${this.config.authApiUrl}/api/auth/google?${query}`);
  }

  async completeGoogleSignIn(code: string): Promise<void> {
    const verifier = sessionStorage.getItem(PKCE_VERIFIER_KEY);
    if (!verifier) throw new Error('The Google sign-in verifier was not found. Please start sign-in again.');
    try {
      this.storeToken(await firstValueFrom(this.http.post<TokenResponse>(`${this.config.authApiUrl}/api/auth/token`, { code, codeVerifier: verifier })));
    } finally {
      sessionStorage.removeItem(PKCE_VERIFIER_KEY);
    }
  }

  logout(): void {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  private storeToken(response: TokenResponse): void {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken);
  }
}

/** Route guard for any shell route or exposed microfrontend route requiring a signed-in user. */
export const t10goAuthGuard: CanActivateFn = (_route, state) => {
  const session = inject(T10goAuthSession);
  const config = inject(T10GO_AUTH_CONFIG);
  if (session.isAuthenticated) return true;
  const returnUrl = new URL(state.url, window.location.origin).toString();
  window.location.assign(`${config.shellUrl}/auth/login?${new URLSearchParams({ returnUrl })}`);
  return false;
};

/** Adds Authorization only to APIs explicitly opted into through the shared configuration. */
export const t10goAuthInterceptor: HttpInterceptorFn = (request, next) => {
  const config = inject(T10GO_AUTH_CONFIG);
  const session = inject(T10goAuthSession);
  const isProtectedApi = (config.protectedApiUrls ?? []).some((apiUrl) => request.url.startsWith(apiUrl));
  return isProtectedApi && session.accessToken
    ? next(request.clone({ setHeaders: { Authorization: `Bearer ${session.accessToken}` } }))
    : next(request);
};

function createVerifier(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(64));
  return base64Url(bytes);
}

async function createChallenge(verifier: string): Promise<string> {
  const bytes = new TextEncoder().encode(verifier);
  return base64Url(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)));
}

function base64Url(bytes: Uint8Array): string {
  let output = '';
  bytes.forEach((byte) => output += String.fromCharCode(byte));
  return btoa(output).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}
