import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import auth, * as authSelectors from './auth/auth.reducer';
import user, * as userSelectors from './user/user.reducer';
import categories, * as categoriesSelectors from './categories/categories.reducer';
import cart, * as cartSelectors from './cart/cart.reducer';
import products, * as productsSelectors from './products/products.reducer';
import coupon, * as couponSelectors from './coupon/coupon.reducer';
import order, * as orderSelectors from './order/order.reducer';
import invoice, * as invoiceSelectors from './invoice/invoice.reducer';
import payment, * as paymentSelectors from './payment/payment.reducer';
import wishlist, * as wishlistSelectors from './wishlist/wishlist.reducer';
import search, * as searchSelectors from './search/search.reducer';
import galleryItems, * as galleryItemsSelectors from './galleryitems/galleryitems.reducer';
import review, * as reviewSelectors from './review/review.reducer';

const reducer = combineReducers({
    auth,
    categories,
    cart,
    user,
    products,
    coupon,
    order,
    invoice,
    payment,
    wishlist,
    search,
    galleryItems,
    review,
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

export const getUser = (state) => userSelectors.getUser(state.user);
export const getIsFetchingUser = (state) => userSelectors.getIsFetchingUser(state.user);
export const getIsUpdatingUser = (state) => userSelectors.getIsUpdatingUser(state.user);
export const getIsChangingPassword = state => userSelectors.getIsChangingPassword(state.user);
export const getIsFetchingUserError = state => userSelectors.getFetchingUserError(state.user);

export const getCategories = state => categoriesSelectors.getCategories(state.categories);
export const getCategoryProducts = state => categoriesSelectors.getCategoryProducts(state.categories);
export const getIsFetchingCategories = state => categoriesSelectors.getIsFetchingCategories(state.categories);
export const getIsFetchingCategoriesError = state => categoriesSelectors.getIsFetchingCategoriesError(state.categories);

export const getCartItem = (state, id) => cartSelectors.getCartItem(state.cart, id);
export const getCartItems = (state) => cartSelectors.getCartItems(state.cart);
export const getIsFetchingCartItems = (state) => cartSelectors.getIsFetchingCartItems(state.cart);
export const getIsFetchingCartItemsError = state => cartSelectors.getIsFetchingCartItemsError(state.cart);
export const getCartItemByProductId = (state,productId) => cartSelectors.getCartItemByProductId(state.cart, productId);
export const getAddCartItemError = (state) => cartSelectors.getAddCartItemError(state.cart);
export const getRemoveCartItemError = (state) => cartSelectors.getRemoveCartItemError(state.cart);
export const getUpdateCartItemError = (state) => cartSelectors.getUpdateCartItemError(state.cart);
export const getCart = state => cartSelectors.getCart(state.cart);
export const getIsFetchingCart = state => cartSelectors.getIsFetchingCart(state.cart);
export const getFetchCartError = state => cartSelectors.getFetchCartError(state.cart); 
export const getCartSubtotal = state => cartSelectors.getCartSubtotal(state.cart);

export const getProduct = (state,id) => productsSelectors.getProduct(state.products,id);
export const getProducts = state => productsSelectors.getProducts(state.products);

export const getCoupon = state => couponSelectors.getCoupon(state.coupon);
export const getIsFetchingCoupon = state => couponSelectors.getIsFetchingCoupon(state.coupon);
export const getFetchingCouponError = state => couponSelectors.getFetchingCouponError(state.coupon);
export const getCouponField = state => couponSelectors.getCouponField(state.coupon);

/** order selectors */
export const getOrderItem = (state,id) => orderSelectors.getOrderItem(state.order,id);
export const getOrderItems = (state) => orderSelectors.getOrderItems(state.order);
export const getIsFetchingOrderItems = state => orderSelectors.getIsFetchingOrderItems(state.order);
export const getFecthingOrderItemsError = state => orderSelectors.getFecthingOrderItemsError(state.order);
export const getOrder = state => orderSelectors.getOrder(state.order);
export const getIsPostingOrder = state => orderSelectors.getIsPostingOrder(state.order);
export const getPostingOrderError = state => orderSelectors.getPostingOrderError(state.order);

/** invoice selectors */
export const getInvoiceItem = (state,id) => invoiceSelectors.getInvoiceItem(state.invoice,id);
export const getInvoiceItems = (state) => invoiceSelectors.getInvoiceItems(state.invoice);
export const getIsFetchingInvoiceItems = state => invoiceSelectors.getIsFetchingInvoiceItems(state.invoice);
export const getFecthingInvoiceItemsError = state => invoiceSelectors.getFecthingInvoiceItemsError(state.invoice);

export const getInvoice = state => invoiceSelectors.getInvoice(state.invoice);
export const getIsPostingInvoice = state => invoiceSelectors.getIsPostingInvoice(state.invoice)
export const getPostingInvoiceError = state => invoiceSelectors.getPostingInvoiceError(state.invoice);

/** payment selectors */
export const getPaymentItem = (state,id) => paymentSelectors.getPaymentItem(state.payment,id);
export const getPaymentItems = (state) => paymentSelectors.getPaymentItems(state.payment);
export const getIsFetchingPaymentItems = state => paymentSelectors.getIsFetchingPaymentItems(state.payment);
export const getFecthingPaymentItemsError = state => paymentSelectors.getFecthingPaymentItemsError(state.payment);

export const getPayment = state => paymentSelectors.getPayment(state.payment);
export const getIsPostingPayment = state => paymentSelectors.getIsPostingPayment(state.payment)
export const getPostingPaymentError = state => paymentSelectors.getPostingPaymentError(state.payment);

/** wishlist selectors */
export const getWishlist = state => wishlistSelectors.getWishlist(state.wishlist);
export const getIsFetchingWishlist = state => wishlistSelectors.getIsFetchingWishlist(state.wishlist);
export const getFetchingWishlistError = state => wishlistSelectors.getFetchingWishlistError(state.wishlist);
export const getAddWishlistItemError = state => wishlistSelectors.getAddWishlistItemError(state.wishlist);
export const getRemoveWishlistItemError = state => wishlistSelectors.getRemoveWishlistItemError(state.wishlist);

/* search selectors */
export const getFilteredProducts = state => searchSelectors.getFilteredProducts(state.search);
export const getIsSearching = state => searchSelectors.getIsSearching(state.search);
export const getSearchingError = state => searchSelectors.getSearchingError(state.search);

/** galleryItems selectors */
export const getGalleryItem = (state, id) => galleryItemsSelectors.getGalleryItem(state.galleryItems, id);
export const getGalleryItems = state => galleryItemsSelectors.getGalleryItems(state.galleryItems);
export const getisFetchingGalleryItems = state => galleryItemsSelectors.getIsFetchingGalleryItems(state.galleryItems);
export const getFetchingGalleryItemsError = state => galleryItemsSelectors.getFetchingGalleryItemsError(state.galleryItems);

/* reviews selectors */
export const getReview = (state,id) => reviewSelectors.getReview(state.review, id);
export const getReviews = (state) => reviewSelectors.getReviews(state.review);
export const getIsFetchingPaymentItems = state => reviewSelectors.getIsFetchingReview(state.review);
export const getIsPostingReview = state => reviewSelectors.getIsPostingReview(state.review);
export const getFecthingReviewError = state => reviewSelectors.getFecthingReviewError(state.review);
export const getPostingReviewError = state => reviewSelectors.getPostingReviewError(state.review);
