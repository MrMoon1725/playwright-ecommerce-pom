export const USERS = {
  standard: {
    username: process.env.SAUCE_USER || 'standard_user',
    password: process.env.SAUCE_PASSWORD || 'secret_sauce',
  },
  lockedOut: {
    username: 'locked_out_user',
    password: process.env.SAUCE_PASSWORD || 'secret_sauce',
  },
  invalid: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
};

export const PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltTshirt: 'Sauce Labs Bolt T-Shirt',
};

export const CHECKOUT_INFO = {
  firstName: 'Mateo',
  lastName: 'Pimienta',
  postalCode: '110111',
};

export const ERROR_MESSAGES = {
  lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
  invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
  usernameRequired: 'Epic sadface: Username is required',
  firstNameRequired: 'Error: First Name is required',
  postalCodeRequired: 'Error: Postal Code is required',
};
