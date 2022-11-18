import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Examplesite from '../../../components/prototypes/d1/Examplesite'
import NodeMap from '../../../components/prototypes/d2/NodeMap'
import Loading from '../../../components/Loading'
import TubeMap from '../../../components/prototypes/d3/TubeMap'
import S1 from '../../../components/prototypes/s1/prototypeS1'
import S2 from '../../../components/prototypes/s2/S2'
import S3 from '../../../components/prototypes/s3/S3'
import CollapsibleForce from '../../../components/prototypes/d4/collapsibleforce'
import S4 from '../../../components/prototypes/s4/S4'
import S5 from '../../../components/prototypes/s5/S5'
import DelaunayMap from '../../../components/prototypes/d5/DelaunayMap'
import S6 from '../../../components/prototypes/s6/S6'
import S7 from '../../../components/prototypes/s7/S7'
import Button from '@mui/material/Button';
import { trpc } from '../../../utils/trpc'


const AllUserHeatmap = () => {
  const recordWindow = {
    width: 1338,
    height: 875
  }
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0) 
  const router = useRouter()
  const prototypeId = router.query.prototypeId
  const pttrialsData = trpc.useraction.getPttrials.useQuery();
  let parsedtrialsData = []
  if (pttrialsData.data !== undefined) {
    parsedtrialsData = pttrialsData.data.map((dataset: any) => JSON.parse(dataset.pttrials) );
  }

  
  
  // const parsedtrialsData = pttrialsDataArr !== undefined ? pttrialsDataArr.map((dataset: any) => { JSON.parse(dataset) }) : '';
  // console.log(parsedtrialsData);

  // const ptspecificdata = pttrialsDataArr !== undefined ? pttrialsDataArr.filter((dataset: any) => {
  //   if (dataset.pttrials !== null) {
  //     const parsedtrials = JSON.parse(dataset.pttrials);
  //     return (parsedtrials.filter((trial: any) => { trial.prototype === prototypeId }).length) > 0;
  //   }
  // }) : ''; 
  // console.log(ptspecificdata);
  
  useEffect(() => {
    setWidth(window?.outerWidth)
    setHeight(window?.outerHeight)
    const coordsarray = [[1118, 65], [1128, 61], [1123, 70], [856, 632], [852, 623], [866, 631], [613, 429]]
    const adjustedCoordsarray = coordsarray.map((coordinates) => {
      if (coordinates[0] && coordinates[1]) {
        const x = coordinates[0] * window?.innerWidth / recordWindow.width;
        const y = coordinates[1] * window?.outerHeight / recordWindow.height;
        return [x, y]
      }
    })

    const occurrences = adjustedCoordsarray.reduce(function (acc: any, curr: any) {
      return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
    }, {});

    const occurrencesArrays: any = [];
    for (const coordinate in occurrences) {
      const coordarr: string[] = coordinate.split(',');
      occurrencesArrays.push([coordarr, occurrences[coordinate]])
    } 
  
    const c = document.getElementById("myCanvas") as HTMLCanvasElement;
    const ctx: any = c.getContext("2d");
    
    for (let i = 0; i < occurrencesArrays.length; i++) {
      if (occurrencesArrays[i][1] > 1 ) {
        ctx.fillStyle = "red";
        ctx.shadowBlur = 5;
        ctx.fillRect(occurrencesArrays[i][0][0], occurrencesArrays[i][0][1], 1, 1);
      } else {
        ctx.fillStyle = "green";
        ctx.shadowBlur = 5;
        ctx.fillRect(occurrencesArrays[i][0][0], occurrencesArrays[i][0][1], 1, 1);
      }  
    }
  })
  
  const prototypeInsert = (prototype: string | string[] | undefined) => {
    switch (prototype) {
      case 'd1':
        return <Examplesite />
      case 'd2':
        return <NodeMap />
      case 'd3':
        return <TubeMap />
      case 'd4':
        return <CollapsibleForce />
      case 'd5':
        return <DelaunayMap />
      case 's1':
        return <S1 />
      case 's2':
        return <S2 />
      case 's3':
        return <S3 />
      case 's4':
        return <S4 />
      case 's5':
        return <S5 />
      case 's6':
        return <S6 />
      case 's7':
        return <S7 />
      default:
        return <Loading />
    }
  }

  return (
    <div className="flex relative ">
      <canvas id="myCanvas" width={width} height={height} className="absolute z-10"></canvas>
      {prototypeInsert(prototypeId)}
    </div>
  )
}

export default AllUserHeatmap