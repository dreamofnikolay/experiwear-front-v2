import MagicAccAlert from 'parts/Card/MagicAccAlert'
import { memo, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { getNotifications, getMoreNotifications } from 'actions/getNotifications'
import { getAccelerometerData } from 'actions/getAccelerometer'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import MagicCardHeader from 'parts/Card/MagicCardHeader'

const useStyles = makeStyles((theme) => ({
  card: {
    minHeight: 420
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(2)
  }
}))

const ScheduleList = ({ setSelectedItem }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { all: { results, total } } = useSelector(state => state.notifications)

  useEffect(() => {
    dispatch(getNotifications())
  }, [dispatch])

  const selectHandler = useCallback((item) => {
    setSelectedItem(item)
    dispatch(getAccelerometerData(item.id))
  }, [setSelectedItem, dispatch])

  const moreHandler = () => {
    dispatch(getMoreNotifications())
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <MagicCardHeader title='Sent Notifications'/>
        {
          results.map((item, index) => (
            <MagicAccAlert
              key={index}
              item={item}
              onSelect={selectHandler}
            />
          ))
        }
        {
          results.length < total &&
          <div className={classes.button}>
            <ContainedButton
              color='green'
              onClick={moreHandler}
            >
              More
            </ContainedButton>
          </div>
        }
      </CardContent>
    </Card>
  )
}

export default memo(ScheduleList)
