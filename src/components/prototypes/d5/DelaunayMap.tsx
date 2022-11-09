import React, { useState } from 'react'
import airports from '../../../data/airports.json'
import * as d3 from 'd3'


type Props = {}

const DelaunayMap = (props: Props) => {
    const [data, setData] = useState<any[]>(airports)
    const latLngArr = Array.from(data, (airport) => [+airport.longitude, +airport.latitude])
    
    
    

    return (
    <div>DelaunayMap</div>
  )
}

export default DelaunayMap