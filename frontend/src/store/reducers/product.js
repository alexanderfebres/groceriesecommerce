import {
  PRODUCT_START,
  PRODUCT_SUCCESS,
  PRODUCT_FAIL,
  SINGLE_PRODUCT_SUCCESS,
  FEATURED_PRODUCT_COUNT,
  OFF_PRODUCT_SUCCESS,
  SET_PRODUCT_QUANTITY,
  SET_TO_FEATURED_SUCCESS,
  FEATURED_PRODUCT_SUCCESS,
  PRODUCT_SEARCH_RESULTS_SUCCESS,
  PRODUCT_CATEGORIES_SUCCESS,
} from "../actions/actionTypes";

import { updateState } from "./utility";

const initialState = {
  products: [],
  offProducts: [],
  featuredProducts: [],
  searchResults: [],
  categories: [],
  product: {},
  productQuantity: 0,
  featuredCount: 0,
  loading: false,
  heartSpin: false,
  error: null,
};

// Product Initialize
export const productStart = (state, action) => {
  return updateState(state, {
    loading: true,
    error: null,
  });
};

// Fetch Product Success
export const productSuccess = (state, action) => {
  return updateState(state, {
    products: action.products,
    loading: false,
  });
};

// Product Error
export const productFail = (state, action) => {
  return updateState(state, {
    loading: false,
    error: action.error,
  });
};

// Fetch Off Product Success
export const offProductSuccess = (state, action) => {
  return updateState(state, {
    offProducts: action.offProducts,
  });
};

// Fetch Single Product Succcess
export const singleProductSuccess = (state, action) => {
  return updateState(state, {
    product: action.product,
    loading: false,
  });
};

// Count Featured Products
export const featuredProductCount = (state, action) => {
  return updateState(state, {
    featuredCount: action.featuredCount,
  });
};

// Set product to featured Success
export const setToFeaturedSuccess = (state, action) => {
  return updateState(state, {
    loading: false,
  });
};

// Fetch Featured Products Success
export const featuredProductSuccess = (state, action) => {
  return updateState(state, {
    loading: false,
    featuredProducts: action.featuredProducts,
  });
};

// Set Product Quanity Success
export const setProductQuantity = (state, action) => {
  return updateState(state, {
    loading: false,
    productQuantity: action.productQuantity,
  });
};

// Fetch Search Results Success
export const productSearchResults = (state, action) => {
  return updateState(state, {
    loading: false,
    searchResults: action.searchResults,
  });
};

// Fetch Product Categories Success
export const productCategoriesSuccess = (state, action) => {
  return updateState(state, {
    categories: action.categories,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_START:
      return productStart(state, action);
    case PRODUCT_SUCCESS:
      return productSuccess(state, action);
    case PRODUCT_FAIL:
      return productFail(state, action);
    case FEATURED_PRODUCT_COUNT:
      return featuredProductCount(state, action);
    case SINGLE_PRODUCT_SUCCESS:
      return singleProductSuccess(state, action);
    case OFF_PRODUCT_SUCCESS:
      return offProductSuccess(state, action);
    case SET_PRODUCT_QUANTITY:
      return setProductQuantity(state, action);
    case FEATURED_PRODUCT_SUCCESS:
      return featuredProductSuccess(state, action);
    case SET_TO_FEATURED_SUCCESS:
      return setToFeaturedSuccess(state, action);
    case PRODUCT_SEARCH_RESULTS_SUCCESS:
      return productSearchResults(state, action);
    case PRODUCT_CATEGORIES_SUCCESS:
      return productCategoriesSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
