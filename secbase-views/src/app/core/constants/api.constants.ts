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
  },
  PROFILES: {
    CREDENTIALS_PROFILE: 'api/v1/credentials/profiles'
  },
  CREDENTIALS: {
    GET_BASE_CREDENTIALS_BY_PROFILE_ID : (profileId: string | number) => `api/v1/credentials/${profileId}/items`,
    GET_CREDENTIAL_BY_ID: (credentialId: string | number) => `api/v1/credentials/${credentialId}`,
    DELETE_CREDENTIAL_BY_ID: (credentialId: string | number) => `api/v1/credentials/${credentialId}`,
    CREATE_CREDENTIAL_BY_PROFILE_ID: (profileId: string | number) => `api/v1/credentials/${profileId}/items`
  }
});
