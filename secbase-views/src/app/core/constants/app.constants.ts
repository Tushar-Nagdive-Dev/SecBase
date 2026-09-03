/* ./src/app/constants/app.constants.ts */
export const SecBaseAppConstants = Object.freeze({
  APP_NAME: 'SecBase Application',
  APP_VERSION: '0.0.1',
  ANY: '**',
  FULL: 'full',

  PAGINATION : {
    DEFAULT_PAGE_SIZE: 20,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },

  DEBOUNCE: {
    SEARCH: 300,
    AUTOCOMPLETE: 250,
  },

  UI: {
    TOAST_DURATION: 3000,
    DIALOG_WIDTH: '500px',
  },

  TITLES: {
    SIGN_IN: 'SECBASE | Sign In',
    SIGN_UP: 'SECBASE | Register',
    SECBASE_HOME: 'Secbase Home | Zero-Knowledge Black Box',
    SECBASE_VIEWS: 'SecBase View | Dashboard'
  }

});
