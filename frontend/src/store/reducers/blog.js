import {
  POST_START,
  POST_SUCCESS,
  SINGLE_POST_SUCCESS,
  POST_FAIL,
  POST_CATEGORIES_SUCCESS,
  POST_SEARCH_RESULTS_SUCCESS,
  RECENT_POST_SUCCESS,
  POST_TAGS_SUCCESS,
} from "../actions/actionTypes";
import { updateState } from "./utility";

const initialState = {
  posts: [],
  searchResults: [],
  recentPosts: [],
  categories: [],
  tags: [],
  post: {},
  loading: false,
  error: null,
};

// Post Initialize
export const postStart = (state, action) => {
  return updateState(state, {
    loading: true,
    error: null,
  });
};

// Fetch Post Success
export const postSuccess = (state, action) => {
  return updateState(state, {
    loading: false,
    posts: action.posts,
  });
};

// Fetch Single Post Success
export const singlePostSuccess = (state, action) => {
  return updateState(state, {
    loading: false,
    post: action.post,
  });
};

// Post Error
export const postFail = (state, action) => {
  return updateState(state, {
    loading: false,
    error: action.error,
  });
};

// Fetch Categories Success
export const postCategoriesSuccess = (state, action) => {
  return updateState(state, {
    loading: false,
    categories: action.categories,
  });
};

// Fetch Tags Success
export const postTagsSuccess = (state, action) => {
  return updateState(state, {
    loading: false,
    tags: action.tags,
  });
};

// Fetch Search Results Success
export const postSearchResultsSuccess = (state, action) => {
  return updateState(state, {
    loading: false,
    searchResults: action.searchResults,
  });
};

// Fetch Recent Posts Success
export const recentPostSuccess = (state, action) => {
  return updateState(state, {
    loading: false,
    recentPosts: action.recentPosts,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_START:
      return postStart(state, action);
    case POST_SUCCESS:
      return postSuccess(state, action);
    case SINGLE_POST_SUCCESS:
      return singlePostSuccess(state, action);
    case POST_CATEGORIES_SUCCESS:
      return postCategoriesSuccess(state, action);
    case POST_TAGS_SUCCESS:
      return postTagsSuccess(state, action);
    case POST_SEARCH_RESULTS_SUCCESS:
      return postSearchResultsSuccess(state, action);
    case RECENT_POST_SUCCESS:
      return recentPostSuccess(state, action);
    case POST_FAIL:
      return postFail(state, action);

    default:
      return state;
  }
};

export default reducer;
