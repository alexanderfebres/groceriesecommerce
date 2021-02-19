import axios from "axios";
import authAxios from "../../axios";
import {
  PRODUCT_START,
  PRODUCT_SUCCESS,
  OFF_PRODUCT_SUCCESS,
  PRODUCT_FAIL,
  SINGLE_PRODUCT_SUCCESS,
  FEATURED_PRODUCT_SUCCESS,
  PRODUCT_SEARCH_RESULTS_SUCCESS,
  FEATURED_PRODUCT_COUNT,
  SET_TO_FEATURED_SUCCESS,
  SET_PRODUCT_QUANTITY,
  PRODUCT_CATEGORIES_SUCCESS,
} from "./actionTypes";
import {
  productListURL,
  setToFeaturedURL,
  productDetailURL,
  categoryListURL,
} from "../../constants";

// Product Initialize
export const productStart = () => {
  return {
    type: PRODUCT_START,
  };
};

// Fetch Product Success
export const productSuccess = (products) => {
  return {
    type: PRODUCT_SUCCESS,
    products: products,
  };
};

// Fetch Off Product Success
export const offProductSuccess = (offProducts) => {
  return {
    type: OFF_PRODUCT_SUCCESS,
    offProducts: offProducts,
  };
};

// Product Error
export const productFail = (error) => {
  return {
    type: PRODUCT_FAIL,
    error: error,
  };
};

// Count Featured Products
const countFeaturedProducts = (products) => {
  let featuredCount = 0;
  products.map((product) => {
    if (product.featured) {
      featuredCount++;
    }
  });
  return featuredCount;
};

// Featured Products Count Success
export const featuredProductCount = (products) => {
  const featuredCount = countFeaturedProducts(products);
  return {
    type: FEATURED_PRODUCT_COUNT,
    featuredCount: featuredCount,
  };
};

// Fetch Product List
export const fetchProducts = (
  filterCriteria = null,
  min = null,
  max = null
) => {
  return (dispatch) => {
    dispatch(productStart());
    axios
      .get(productListURL, { params: { filterCriteria, min, max } })
      .then((res) => {
        const products = res.data.products;
        const offProducts = res.data.offProducts;
        dispatch(productSuccess(products));
        dispatch(offProductSuccess(offProducts));
        dispatch(featuredProductCount(products));
      })
      .catch((err) => {
        dispatch(productFail(err));
      });
  };
};

// Fetch Featured Products Success
export const featuredProductSuccess = (featuredProducts) => {
  return {
    type: FEATURED_PRODUCT_SUCCESS,
    featuredProducts: featuredProducts,
  };
};

// Fetch Featured Products
export const fetchFeaturedProducts = (key) => {
  return (dispatch) => {
    dispatch(productStart());
    axios
      .get(productListURL, { params: { key } })
      .then((res) => {
        const featuredProducts = res.data.products;
        dispatch(featuredProductSuccess(featuredProducts));
      })
      .catch((err) => {
        dispatch(productFail(err));
      });
  };
};

// Fetch Single Product Success
export const singleProductSuccess = (product) => {
  return {
    type: SINGLE_PRODUCT_SUCCESS,
    product: product,
  };
};

// Fetch Single Product
export const fetchSingleProduct = (id) => {
  return (dispatch) => {
    dispatch(productStart());
    axios
      .get(productDetailURL(id))
      .then((res) => {
        const product = res.data;
        const category = product.category;
        dispatch(singleProductSuccess(product));
        dispatch(fetchProducts(category));
      })
      .catch((err) => {
        dispatch(productFail(err));
      });
  };
};

// Set Product to Featured Success
export const setToFeaturedSuccess = () => {
  return {
    type: SET_TO_FEATURED_SUCCESS,
  };
};

// Set Product To Featured
export const setToFeatured = (productID) => {
  return (dispatch) => {
    dispatch(productStart());
    authAxios
      .post(setToFeaturedURL, { productID })
      .then((res) => {
        dispatch(setToFeaturedSuccess());
        dispatch(fetchProducts());
      })
      .catch((err) => {
        dispatch(productFail(err));
      });
  };
};

// Search Results Success
export const productSearchResultsSuccess = (searchResults) => {
  return {
    type: PRODUCT_SEARCH_RESULTS_SUCCESS,
    searchResults: searchResults,
  };
};

// Fetch Search Results
export const fetchProductSearchResults = (searchFilter) => {
  return (dispatch) => {
    dispatch(productStart());
    axios
      .get(productListURL, { params: { searchFilter } })
      .then((res) => {
        const searchResults = res.data.products;
        dispatch(productSearchResultsSuccess(searchResults));
      })
      .catch((err) => {
        dispatch(productFail(err));
      });
  };
};

// Fetch Categories Success
export const productCategoriesSuccess = (categories) => {
  return {
    type: PRODUCT_CATEGORIES_SUCCESS,
    categories: categories,
  };
};

// Fetch Product Categories
export const fetchProductCategories = () => {
  return (dispatch) => {
    dispatch(productStart());
    axios
      .get(categoryListURL)
      .then((res) => {
        const categories = res.data;
        dispatch(productCategoriesSuccess(categories));
      })
      .catch((err) => {
        dispatch(productFail(err));
      });
  };
};

export const getProductQuantity = (id, items) => {
  const productId = parseInt(id);
  let productQuantity = 0;
  if (!items) {
    return productQuantity;
  }
  items.map((item) => {
    if (item.product.id === productId) {
      productQuantity = item.quantity;
    }
  });
  return productQuantity;
};

// Set Product Quantity in the order
export const setProductQuantity = (id, items) => {
  const productQuantity = getProductQuantity(id, items);
  return {
    type: SET_PRODUCT_QUANTITY,
    productQuantity: productQuantity,
  };
};
