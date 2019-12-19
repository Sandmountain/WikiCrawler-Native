import {
  SET_QUERY,
  SET_GOAL_ARTICLE,
  SET_GOAL_SUMMARY,
  LOADING_ARTICLES,
} from './types';

const axios = require('axios');

export const setQuery = query => async dispatch => {
  try {
    dispatch({
      type: SET_QUERY,
      payload: query,
    });
  } catch (error) {
    console.log('setQuery', error);
  }
};

export const setSummary = summary => async dispatch => {
  co;
  try {
    dispatch({
      type: SET_GOAL_SUMMARY,
      payload: summary,
    });
  } catch (error) {
    console.log('setSummary', error);
  }
};

export const setGoal = article => async dispatch => {
  try {
    dispatch({
      type: SET_GOAL_ARTICLE,
      payload: article,
    });
  } catch (error) {
    console.log('setGoal', error);
  }
};

export const setLoadingArticles = () => {
  return {
    type: LOADING_ARTICLES,
  };
};
