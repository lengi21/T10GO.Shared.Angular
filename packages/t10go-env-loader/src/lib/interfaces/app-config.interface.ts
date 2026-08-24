export type AppEnvironment = 'development' | 'test' | 'production';

export interface AppConfig {
  /**
   * Deployment environment.
   * This value is injected/replaced by CI/CD.
   */
  environment: AppEnvironment;

  /**
   * Base URL of the current application.
   */
  baseUrl: string;

  /**
   * URL of the T10GO Shell.
   */
  shellUrl: string;

  /**
   * Application/service endpoints.
   */
  services: AppServicesConfig;
}

export interface AppServicesConfig {
  /**
   * Main backend API.
   */
  api: string;

  /**
   * Authentication/identity service.
   */
  auth: string;

  /**
   * Additional services can be added without
   * changing the core configuration models.
   */
  [key: string]: string;
}
