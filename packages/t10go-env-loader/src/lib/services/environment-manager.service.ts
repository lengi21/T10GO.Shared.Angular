import { Injectable } from '@angular/core';

import { AppConfig, AppEnvironment, AppServicesConfig } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentManager {
  private config: AppConfig | null = null;

  initialize(config: AppConfig): void {
    if (this.config) {
      throw new Error('EnvironmentManager has already been initialized.');
    }

    this.config = config;
  }

  get isInitialized(): boolean {
    return this.config !== null;
  }

  get environment(): AppEnvironment {
    return this.getConfig().environment;
  }

  get baseUrl(): string {
    return this.getConfig().baseUrl;
  }

  get shellUrl(): string {
    return this.getConfig().shellUrl;
  }

  get services(): AppServicesConfig {
    return this.getConfig().services;
  }

  get configValue(): AppConfig {
    return this.getConfig();
  }

  private getConfig(): AppConfig {
    if (!this.config) {
      throw new Error('EnvironmentManager has not been initialized.');
    }

    return this.config;
  }
}
