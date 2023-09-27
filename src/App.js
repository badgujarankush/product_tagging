import { Box } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import Moveable from 'react-moveable';
import Marker from './Components/Marker';

const App = () => {

  const containerRef = useRef();
  const [target, setTarget] = useState(null);
  const [dragTarget, setDragTarget] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);

  const [markers, setMarkers] = useState([
    { id: 1, name: "BOX1", width: 100, height: 100, x: 10, y: 10, rotate: 0, translate: [10, 10, 0, 0] },
    { id: 2, name: "BOX2", width: 100, height: 100, x: 100, y: 100, rotate: 0, translate: [100, 100, 0, 0] },
    { id: 3, name: "BOX3", width: 100, height: 100, x: 200, y: 200, rotate: 0, translate: [200, 200, 0, 0] },
  ]);

  const findElement = () => {
    const temp = markers?.find(item=> item?.id === selectedElement);
    return temp
  }


  const handleClick = ({id, target}) => {
    setSelectedElement(id);
    setTarget(target);
  };

  console.log({markers, target})

  return (
    <Box ref={containerRef} id='container' sx={{position: 'relative', width: 800, height: 600, border: '1px solid red'}}>
       <Moveable
        target={target}
        draggable={true}
        resizable={true}
        rotatable={true}
        rotationPosition={"top"}
        throttleResize={0}
        throttleDrag={0}
        throttleRotate={0}
        startDragRotate={0}
        throttleDragRotate={0}
        snappable={true}
        bounds={{ left: 0, top: 0, right: 800, bottom: 600 }}
        origin={false}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
        onDragStart={({ set }) => {
          const temp = findElement();
          set(temp?.translate);
        }}
        onDrag={({ target, beforeTranslate, ...rest }) => {
          const temp = [...markers];
          temp?.forEach((item, i)=>{
            if(item?.id === selectedElement){
              temp[i].translate = [...beforeTranslate];
            }
          });

          setMarkers(temp);
          target.style.left = `${beforeTranslate[0]}px`;
          target.style.top = `${beforeTranslate[1]}px`;
        }}
        onResizeStart={({ setOrigin, dragStart }) => {
          setOrigin(["%", "%"]);
          const temp = findElement();
          dragStart && dragStart.set(temp?.translate);
        }}
        onResize={({ target, width, height, drag }) => {
          const temp = [...markers];
          temp?.forEach((item, i)=>{
            if(item?.id === selectedElement){
              temp[i].width = width;
              temp[i].height = height;
            }
          });

          setMarkers(temp);

          target.style.width = `${width}px`;
          target.style.height = `${height}px`;
        }}
        onRotateStart={({ set }) => {
          const temp = findElement();
          set(temp?.rotate);
        }}
        onRotate={({ rotation }) => {
          const temp = [...markers];
          temp?.forEach((item, i)=>{
            if(item?.id === selectedElement){
              temp[i].rotate = Math.abs(rotation%360);
            }
          });

          setMarkers(temp);
          target.style.transform = `rotate(${Math.abs(rotation%360)}deg)`;
        }}
      />
      {markers?.map(item=>
        <Marker key={item?.id} item={item} handleClick={handleClick} />  
      )}
    </Box>
  )
}

export default App