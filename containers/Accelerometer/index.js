import AccChart from 'containers/Accelerometer/AccChart'
import NotificationsList from './NotificationsList'
import { memo, useState } from 'react'
import { Grid } from '@material-ui/core'

const Accelerometer = () => {
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <AccChart
          selectedItem={selectedItem}
        />
      </Grid>
      <Grid item xs={12}>
        <NotificationsList
          setSelectedItem={setSelectedItem}
        />
      </Grid>
    </Grid>
  )
}

export default memo(Accelerometer)
