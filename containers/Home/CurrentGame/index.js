import { memo } from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import TeamLogo from 'parts/TeamLogo'
import HomeCardWrapper from '../Shared/HomeCardWrapper'
import { isEmpty } from 'utils/helpers/utility'
import {
  getEnglishDate,
  getEnglishTime,
  getEnglishDateWithTime
} from 'utils/helpers/time'
import GAME_STATUS from 'utils/constants/game-status'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    marginTop: theme.spacing(2)
  },
  team: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  score: {
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: theme.spacing(2)
  },
  vs: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quarter: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: theme.spacing(1)
  },
  time: {
    fontSize: 18
  }
}));

const CurrentGame = () => {
  const classes = useStyles();

  const { select = {} } = useSelector(state => state.games);

  return (
    <HomeCardWrapper
      title='Current Game'
      subTitle={!isEmpty(select) ? getEnglishDateWithTime(select.date) : ''}
    >
      {
        !isEmpty(select) &&
        <>
          <div className={classes.container}>
            <div className={classes.team}>
              <TeamLogo
                size={130}
                team={select.visitorTeam.abbreviation}
              />
              <Typography
                color='textPrimary'
                className={classes.score}
              >
                {select.visitorTeamScore}
              </Typography>
            </div>
            <Typography
              color='textPrimary'
              className={classes.vs}
            >
              VS
            </Typography>
            <div className={classes.team}>
              <TeamLogo
                size={130}
                team={select.homeTeam.abbreviation}
              />
              <Typography
                color='textPrimary'
                className={classes.score}
              >
                {select.homeTeamScore}
              </Typography>
            </div>
          </div>
          <Typography
            color='textPrimary'
            className={classes.quarter}
          >
            {select?.statusGame === GAME_STATUS.FINISHED
              ? 'Final'
              : select?.clock
                ? `${select.currentPeriod} Quarter`
                : getEnglishDate(select.date)
            }
          </Typography>
          {
            select?.statusGame !== GAME_STATUS.FINISHED &&
            <Typography
              color='textPrimary'
              className={classes.time}
            >
              {select?.statusGame === GAME_STATUS.IN_PLAY
                ? select?.clock
                  ? `${select.clock} remaining`
                  : `End Quarter ${select?.endOfPeriod || 0 + 1}`
                : getEnglishTime(select.date)
              }
            </Typography>
          }
        </>
      }
    </HomeCardWrapper>
  );
};

export default memo(CurrentGame);
