import { environment } from '@Environments/environment';

/**
 * The API configuration.
 */
export const ENDPOINT = {
  AUTH: {
    AUTHENTICATE: '/api/authenticate',
    ACCOUNT: '/api/account',
  }
};

export const getEndpoint = (api: string): string => {
  return `${environment.BASE_URL}${api}`;
};
