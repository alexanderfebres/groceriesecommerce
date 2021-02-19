// const host = "http://127.0.0.1:8000";
const host = process.env.REACT_APP_API_HOST;
const apiURL = "/api";

export const endpoint = `${host}${apiURL}`;

// AUTH
export const loginURL = `${host}/rest-auth/login/`;
export const signupURL = `${host}/rest-auth/registration/`;

// PRODUCT
export const productListURL = `${endpoint}/product-list/`;
export const filteredProductListURL = `${endpoint}/filtered-product-list/`;
export const productDetailURL = (id) => `${endpoint}/product/${id}/`;
export const offProductListURL = `${endpoint}/off-product-list/`;
export const categoryListURL = `${endpoint}/category-list/`;
export const featuredProductListURL = `${endpoint}/featured-product-list/`;
export const setToFeaturedURL = `${endpoint}/set-to-featured/`;

// ORDER
export const orderSummaryURL = `${endpoint}/order-summary/`;

// CART
export const addToCartURL = `${endpoint}/add-to-cart/`;
export const removeFromCartURL = `${endpoint}/remove-from-cart/`;
export const addCouponURL = `${endpoint}/add-coupon/`;
export const deleteOrderProductURL = (id) =>
  `${endpoint}/delete-product-from-cart/${id}/`;

// CHECKOUT
export const checkoutURL = `${endpoint}/checkout/`;
export const paymentURL = `${endpoint}/payment/`;

// BLOG
export const postListURL = `${endpoint}/blog/post-list/`;
export const postDetailURL = (id) => `${endpoint}/blog/post-details/${id}/`;
export const blogCategoryListURL = `${endpoint}/blog/category-list/`;
export const tagListURL = `${endpoint}/blog/tag-list/`;

// CONTACT
export const leaveMessageURL = `${host}/marketing/send-mail/`;
