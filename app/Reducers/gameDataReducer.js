import {
  SET_QUERY,
  SET_GOAL_ARTICLE,
  SET_GOAL_SUMMARY,
  GET_SEARCH_RESULTS,
  LOADING_ARTICLES,
} from '../Actions/types';

import {statement} from '@babel/template';

const initialState = {
  query: '',
  missedArticle: 0,
  numberOfClicks: 0,
  goalArticle: '',
  goalArticleSummary: '',
  startArticle: '',
  articles: [],
  visitedArticles: [],
  loadingArticles: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        query: action.payload,
        numberOfClicks: state.numberOfClicks + 1,
      };
    case SET_GOAL_ARTICLE:
      return {
        ...state,
        goalArticle: action.payload,
      };
    case SET_GOAL_SUMMARY:
      return {
        ...state,
        goalArticleSummary: action.payload,
      };
    case GET_SEARCH_RESULTS:
      return {
        ...state,
        articles: action.payload,
        loadingArticles: false,
      };
    case LOADING_ARTICLES:
      return {
        ...state,
        loadingArticles: true,
      };
    default:
      return state;
  }
}
