/* ./src/app/core/constants/api.constants.ts */
export const APIs_PATH = Object.freeze({
  AUTH: {
    LOGIN: 'api/v1/auth/login',
    REGISTER: 'api/v1/auth/register',
    LOGOUT: 'api/v1/auth/logout',
  },
  USERS: {
    LIST: 'api/v1/users',
    BY_ID: (id: string | number) => `api/v1/users/${id}`
  }
});
