import { environment } from '@Environments/environment';

/**
 * The API configuration.
 */
export const ENDPOINT = {
  AUTH: {
    AUTHENTICATE: '/api/authenticate',
    ACCOUNT: '/api/account',
  },
  BLOG: {
    GET_BLOG_POSTS: '/api/posts/public',
    GET_BLOG_POST_DETAILS: (slug: string) => `/api/posts/public/${slug}`,
  }
};

export const getEndpoint = (api: string): string => {
  return `${environment.BASE_URL}${api}`;
};
