/* ./src/app/core/constants/api.constants.ts */
export const APIs_PATH = Object.freeze({
  AUTH: {
    LOGIN: 'api/v1/login',
    REGISTER: 'api/v1/register',
  },
  USERS: {
    LIST: 'api/v1/users',
    BY_ID: (id: string | number) => `api/v1/users/${id}`
  }
});
