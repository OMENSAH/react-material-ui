import React from 'react';
import { VictoryPie} from 'victory';

const chart = (props) => {
  let data = props.data.map(d => {
    return {
      x: d.eventName,
      y: d.totalParticipants
    }
  })

  return (
      <VictoryPie
        data={data}
      />
  )

}

export default chart;
