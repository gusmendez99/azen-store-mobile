import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import auth, * as authSelectors from './auth/auth.reducer';
import categories, * as categoriesSelectors from './categories/categories.reducer';
import cart, * as cartSelectors from './cart/cart.reducer';

const reducer = combineReducers({
    auth,
    categories,
    cart,
    form: formReducer
  });
  
export default reducer;

export const getAuthToken = state => authSelectors.getAuthToken(state.auth);
export const getIsRegistering = state => authSelectors.getIsRegistering(state.auth);
export const getRegisteringError = state => authSelectors.getRegisteringError(state.auth);
export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.auth);
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.auth);
export const getIsAuthenticatingFacebook = state => authSelectors.getIsAuthenticatingFacebook(state.auth);
export const getAuthenticatingFacebookError = state => authSelectors.getAuthenticatingFacebookError(state.auth);
export const isAuthenticated = state => getAuthToken(state) != null;
export const getAuthUserID = state => authSelectors.getAuthUserID(state.auth);
export const getAuthExpiration = state => authSelectors.getAuthExpiration(state.auth);
export const getAuthUsername = state => authSelectors.getAuthUsername(state.auth);
export const getIsRefreshingToken = state => authSelectors.getIsRefreshingToken(state.auth);
export const getRefreshingError = state => authSelectors.getRefreshingError(state.auth);

export const getCategories = state => categoriesSelectors.getCategories(state.categories);
export const getCategoryProducts = state => categoriesSelectors.getCategoryProducts(state.categories);
export const getIsFetchingCategories = state => categoriesSelectors.getIsFetchingCategories(state.categories);
export const getIsFetchingCategoriesError = state => categoriesSelectors.getIsFetchingCategoriesError(state.categories);

export const getCartItem = (state, id) => cartSelectors.getCartItem(state.cart, id);
export const getCartItems = (state) => cartSelectors.getCartItems(state.cart);
export const getIsFetchingCartItems = (state) => cartSelectors.getIsFetchingCartItems(state.cart);
export const getIsFetchingCartItemsError = state => cartSelectors.getIsFetchingCartItemsError(state.cart);
