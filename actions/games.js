
import * as TYPES from './types'
import * as gameAPI from 'services/api-game'
import { isEmpty } from 'utils/helpers/utility'
import GAME_STATUS from 'utils/constants/game-status'

const getGames = (refresh = false) => async (dispatch, getState) => {
  try {
    const { games: { results } } = getState();
    if (!refresh && !isEmpty(results)) {
      return
    }

    const { results: games = [] } = await gameAPI.getGames();

    const playGame = games.find((item) => item.statusGame === GAME_STATUS.IN_PLAY)
    let closestUpcomingGame = {};
    if (!isEmpty(playGame)) {
      closestUpcomingGame = playGame;
    } else {
      const currentDate = new Date();
      let minDiffTime = 0;

      for (const game of games) {
        const diffTime = new Date(game.date) - currentDate;
        if (diffTime > 0 && (minDiffTime === 0 || diffTime < minDiffTime)) {
          minDiffTime = diffTime;
          closestUpcomingGame = game;
        }
      };
    }

    await dispatch(setGames(games));
    dispatch(setSelectGame(closestUpcomingGame));
    dispatch(setClosestUpcomingGame(closestUpcomingGame));
  } catch (error) {
    console.log('[getGames] error => ', error);
  }
};

const setGames = games => {
  return {
    type: TYPES.FETCH_GAMES,
    payload: games
  };
};

const setSelectGame = game => {
  return {
    type: TYPES.SET_SELECT_GAME,
    payload: game
  };
};

const setClosestUpcomingGame = game => {
  return {
    type: TYPES.SET_CLOSEST_UPCOMING_GAME,
    payload: game
  };
};

export {
  getGames,
  setGames,
  setSelectGame,
  setClosestUpcomingGame
}
