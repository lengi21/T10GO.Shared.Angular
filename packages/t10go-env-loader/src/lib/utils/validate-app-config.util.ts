import { AppConfig } from '../interfaces';

export function validateAppConfig(value: unknown): asserts value is AppConfig {
  if (!value || typeof value !== 'object') {
    throw new Error('Application configuration must be an object.');
  }

  const config = value as Record<string, unknown>;

  if (typeof config['environment'] !== 'string') {
    throw new Error('Application configuration is missing "environment".');
  }

  if (typeof config['baseUrl'] !== 'string') {
    throw new Error('Application configuration is missing "baseUrl".');
  }

  if (typeof config['shellUrl'] !== 'string') {
    throw new Error('Application configuration is missing "shellUrl".');
  }

  if (!config['services'] || typeof config['services'] !== 'object') {
    throw new Error('Application configuration is missing "services".');
  }
}
