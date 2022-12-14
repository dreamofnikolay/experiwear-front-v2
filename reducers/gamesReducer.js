
import * as TYPES from 'actions/types'

const INITIAL_STATE = Object.freeze({
  results: [],
  select: {},
  closestUpcoming: {}
});

const gamesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.FETCH_GAMES:
      return { ...state, results: action.payload };
    case TYPES.SET_SELECT_GAME:
      return { ...state, select: action.payload };
    case TYPES.SET_CLOSEST_UPCOMING_GAME:
      return { ...state, closestUpcoming: action.payload };
    default:
      return state;
  }
};

export default gamesReducer;
