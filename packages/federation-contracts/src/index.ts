/** A route-aware item rendered by the shared T10GO sidebar. */
export interface T10goNavigationItem {
  readonly id: string;
  readonly label: string;
  readonly icon?: string;
  readonly route?: string;
  readonly children?: readonly T10goNavigationItem[];
}

export type FederationRouteType = 'children' | 'component';

export interface FederationRoute {
  readonly id: string;
  readonly path: string;
  readonly type: FederationRouteType;
  readonly exposedModule: string;
  readonly exportName: string;
}

export interface FederationRemote {
  readonly name: string;
  readonly entry: string;
  readonly developmentEntry?: string;
}

export interface FederationApplication {
  readonly id: string;
  readonly name: string;
  readonly enabled?: boolean;
  readonly remote: FederationRemote;
  readonly routes?: readonly FederationRoute[];
}

export interface FederationManifest {
  readonly version: string;
  readonly applications: Record<string, FederationApplication>;
}
