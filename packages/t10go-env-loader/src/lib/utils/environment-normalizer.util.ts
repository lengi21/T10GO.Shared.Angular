import { AppConfig } from '../interfaces';
import { ENVIRONMENT_ALIASES } from '../constants/config/environment-aliases.const';

export function normalizeAppConfig(config: AppConfig): AppConfig {
  const environment = ENVIRONMENT_ALIASES[config.environment];

  if (!environment) {
    throw new Error(
      `Unsupported application environment: "${config.environment}"`,
    );
  }

  return {
    ...config,
    environment,
  };
}
