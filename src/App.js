import { Box } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import Moveable from 'react-moveable';
import Marker from './Components/Marker';
import useParentDimensions from './hooks/useParentDimensions';
import { getDynamicCoordinates, getStaticCoordinates } from './utils';

const App = () => {

  const containerRef = useRef();
  const [target, setTarget] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);

  // width height x y and translate are in %
  const [markers, setMarkers] = useState([
    { id: 1, name: "BOX1", width: 20, height: 20, x: 10, y: 10, rotate: 0, translate: [10, 10, 0, 0] },
    { id: 2, name: "BOX2", width: 20, height: 20, x: 20, y: 40, rotate: 0, translate: [20, 40, 0, 0] },
    { id: 3, name: "BOX3", width: 20, height: 20, x: 30, y: 70, rotate: 0, translate: [30, 70, 0, 0] },
  ]);

  const parentDimensions = useParentDimensions(containerRef);

  const findElement = () => {
    const temp = markers?.find(item=> item?.id === selectedElement);
    return temp
  }


  const handleClick = ({id, target}) => {
    setSelectedElement(id);
    setTarget(target);
  };
  console.log({parentDimensions})

 console.log({markers})

  return (
    <Box ref={containerRef} id='container' sx={{position: 'relative', width: '100%', aspectRatio: '16/9', border: '1px solid red'}}>
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
        bounds={{ left: 0, top: 0, right: parentDimensions?.width, bottom: parentDimensions?.height }}
        origin={false}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
        onDragStart={({ set }) => {
          const temp = findElement();
          const translate = temp?.translate;
          const staticDimensions = getStaticCoordinates({parentDimensions, elementCoordinates: {x: translate?.[0], y: translate?.[1]}})
          set([staticDimensions?.x, staticDimensions?.y, 0, 0]);
        }}
        onDrag={({ target, beforeTranslate, ...rest }) => {
          const temp = [...markers];
          const dynamicDimensions = getDynamicCoordinates({parentDimensions, elementCoordinates: {x: beforeTranslate?.[0], y: beforeTranslate?.[1]}})

          temp?.forEach((item, i)=>{
            if(item?.id === selectedElement){
              temp[i].translate = [dynamicDimensions.x, dynamicDimensions.y, 0, 0];
              temp[i].x = dynamicDimensions.x;
              temp[i].y = dynamicDimensions.y;

            }
          });

          setMarkers(temp);
          target.style.left = `${beforeTranslate[0]}px`;
          target.style.top = `${beforeTranslate[1]}px`;
        }}
        onResizeStart={({ setOrigin, dragStart }) => {
          setOrigin(["%", "%"]);
          const temp = findElement();
          const translate = temp?.translate;
          const staticDimensions = getStaticCoordinates({parentDimensions, elementCoordinates: {x: translate?.[0], y: translate?.[1]}})

          dragStart && dragStart.set([staticDimensions?.x, staticDimensions?.y, 0, 0]);
        }}
        onResize={({ target, width, height, drag }) => {
          const temp = [...markers];
          const dynamicDimensions = getDynamicCoordinates({parentDimensions, elementDimensions: {width, height}});

          temp?.forEach((item, i)=>{
            if(item?.id === selectedElement){
              temp[i].width = dynamicDimensions?.width;
              temp[i].height = dynamicDimensions?.height;
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
              temp[i].rotate = (rotation%360);
            }
          });

          setMarkers(temp);
          target.style.transform = `rotate(${(rotation%360)}deg)`;
        }}
      />
      {markers?.map(item=>
        <Marker key={item?.id} item={item} parentDimensions={parentDimensions} handleClick={handleClick} />  
      )}
    </Box>
  )
}

export default App