import { FederationManifest } from '../federation';
import { AppConfig } from './index';

export interface LoadedApplicationConfiguration {
  config: AppConfig;
  manifest: FederationManifest;
}
