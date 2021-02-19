import {
  POST_START,
  POST_SUCCESS,
  POST_FAIL,
  POST_CATEGORIES_SUCCESS,
  POST_SEARCH_RESULTS_SUCCESS,
  RECENT_POST_SUCCESS,
  SINGLE_POST_SUCCESS,
  POST_TAGS_SUCCESS,
} from "./actionTypes";
import {
  postListURL,
  postDetailURL,
  blogCategoryListURL,
  tagListURL,
} from "../../constants";
import axios from "axios";

// Post Initialize
export const postStart = () => {
  return {
    type: POST_START,
  };
};

// Fetch Post Success
export const postSuccess = (posts) => {
  return {
    type: POST_SUCCESS,
    posts: posts,
  };
};

// Post Error
export const postFail = (error) => {
  return {
    type: POST_FAIL,
    error: error,
  };
};

// Fetch Posts
export const fetchPosts = (filterCriteria = null, value = null) => {
  return (dispatch) => {
    dispatch(postStart());

    axios
      .get(postListURL, { params: { filterCriteria, value } })
      .then((res) => {
        const posts = res.data.posts;
        dispatch(postSuccess(posts));
      })
      .catch((err) => {
        dispatch(postFail(err));
      });
  };
};

// Fetch Single Post Success
export const singlePostSuccess = (post) => {
  return {
    type: SINGLE_POST_SUCCESS,
    post: post,
  };
};

// Fetch Single Post
export const fetchSinglePost = (id) => {
  return (dispatch) => {
    dispatch(postStart());
    axios
      .get(postDetailURL(id))
      .then((res) => {
        const post = res.data;
        const tags = res.data.tags;
        const category = post.category;
        dispatch(singlePostSuccess(post));
        dispatch(postTagSuccess(tags));
        dispatch(fetchPosts(category));
      })
      .catch((err) => {
        dispatch(postFail(err));
      });
  };
};

// Fetch Seacrh Results Success
export const postSearchResultsSuccess = (searchResults) => {
  return {
    type: POST_SEARCH_RESULTS_SUCCESS,
    searchResults: searchResults,
  };
};

// Fetch Search Results
export const fetchPostSearchResults = (value) => {
  return (dispatch) => {
    dispatch(postStart());
    axios
      .get(postListURL, { params: { value } })
      .then((res) => {
        const searchResults = res.data.posts;
        dispatch(postSearchResultsSuccess(searchResults));
      })
      .catch((err) => {
        dispatch(postFail(err));
      });
  };
};

// Fetch Categories Success
export const postCategoriesSuccess = (categories) => {
  return {
    type: POST_CATEGORIES_SUCCESS,
    categories: categories,
  };
};

// Fetch Post Categories
export const fetchCategories = () => {
  return (dispatch) => {
    dispatch(postStart());
    axios
      .get(blogCategoryListURL)
      .then((res) => {
        const categories = res.data;
        dispatch(postCategoriesSuccess(categories));
      })
      .catch((err) => {
        dispatch(postFail(err));
      });
  };
};

// Fetch Tags Success
export const postTagSuccess = (tags) => {
  return {
    type: POST_TAGS_SUCCESS,
    tags: tags,
  };
};

// Fetch Post Tags
export const fetchTags = () => {
  return (dispatch) => {
    dispatch(postStart());
    axios
      .get(tagListURL)
      .then((res) => {
        const tags = res.data;
        dispatch(postTagSuccess(tags));
      })
      .catch((err) => {
        dispatch(postFail(err));
      });
  };
};

// Recent Post Success
export const recentPostSuccess = (recentPosts) => {
  return {
    type: RECENT_POST_SUCCESS,
    recentPosts: recentPosts,
  };
};

// Fetch Recent Posts
export const fetchRecentPosts = () => {
  return (dispatch) => {
    dispatch(postStart());
    axios
      .get(postListURL)
      .then((res) => {
        const recentPosts = res.data.posts;
        dispatch(recentPostSuccess(recentPosts));
      })
      .catch((err) => {
        dispatch(postFail(err));
      });
  };
};
