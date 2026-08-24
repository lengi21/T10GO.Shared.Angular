import { AppConfig } from '../interfaces';
import { validateAppConfig } from './validate-app-config.util';

const CONFIG_URL = '/config/config.json';

export async function loadAppConfig(): Promise<AppConfig> {
  const response = await fetch(CONFIG_URL, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(
      `Failed to load application configuration: ${CONFIG_URL} ` +
        `(${response.status} ${response.statusText})`,
    );
  }

  let config: unknown;

  try {
    config = await response.json();
  } catch {
    throw new Error(
      `Application configuration is not valid JSON: ${CONFIG_URL}`,
    );
  }

  validateAppConfig(config);

  return config;
}
