/* ./src/app/constants/route.constants.ts */
export const ROUTES_PATHS = Object.freeze({
  SECBASE_HOME: '',
  AUTH: {
    SIGNING: 'auth/signin',
    SIGNUP: 'auth/signup',
    LOGIN: 'login',
    REGISTER: 'register'
  },

  SECBASE_VIEW: 'secbase-view',
  PROFILES: {
    NEW: 'profiles/new'
  },
  ENCLAVE: {
    LOBBY: 'enclave',
    LOBBY_WITH_PROFILE: 'enclave/:profileId',
    ITEM_NEW: 'enclave/:profileId/item/new',
    ITEM_DETAIL: 'enclave/:profileId/item/:id'
  }
});
