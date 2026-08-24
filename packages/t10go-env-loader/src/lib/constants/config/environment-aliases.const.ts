import { AppEnvironment } from '../../interfaces';

export const ENVIRONMENT_ALIASES: Record<string, AppEnvironment> = {
  dev: 'development',
  development: 'development',

  test: 'test',

  prod: 'production',
  production: 'production',
};
