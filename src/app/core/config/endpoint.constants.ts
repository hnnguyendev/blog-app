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
    GET_POSTS: '/api/posts/search',
    GET_POST_DETAILS: (id: string) => `/api/posts/${id}`,
    ADD_POST: '/api/posts',
    UPDATE_POST: (id: string) => `/api/posts/${id}`,
    DELETE_POSTS: '/api/posts/delete',
  },
  CATEGORY: {
    GET_CATEGORY_OPTIONS: '/api/categories/options',
    ADD_CATEGORY: '/api/categories',
  },
  TAG: {
    GET_TAG_OPTIONS: '/api/tags/options',
    ADD_TAG: '/api/tags',
  },
  FILE: {
    UPLOAD_IMAGE: '/api/files/image',
    UPLOAD_FILE: '/api/files/file'
  }
};

export const getEndpoint = (api: string): string => {
  return `${environment.BASE_URL}${api}`;
};
