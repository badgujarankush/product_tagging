import { Box, Button, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Moveable from "react-moveable";
import Marker from "./Components/Marker";
import useParentDimensions from "./hooks/useParentDimensions";
import {
  findMinMax,
  getDynamicCoordinates,
  getStaticCoordinates,
} from "./utils";
import { MODE } from "./constants";
import { v4 as uuidv4 } from "uuid";

const imageUrl = "https://grapholite.com/Images/OfficeLayout.png";

const App = () => {
  const containerRef = useRef();
  const [mode, setMode] = useState("");
  const [target, setTarget] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [newGroupId, setNewGroupId] = useState(null);
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState({});
  const [selectedElementsForGroup, setSelectedElementsForGroup] = useState([]);

  // width height x y and translate are in %
  const [markers, setMarkers] = useState([
    {
      id: 1,
      name: "BOX1",
      width: 20,
      height: 20,
      x: 10,
      y: 10,
      rotate: 0,
      translate: [10, 10, 0, 0],
    },
    {
      id: 2,
      name: "BOX2",
      width: 20,
      height: 20,
      x: 20,
      y: 40,
      rotate: 0,
      translate: [20, 40, 0, 0],
    },
    {
      id: 3,
      name: "BOX3",
      width: 20,
      height: 20,
      x: 30,
      y: 70,
      rotate: 0,
      translate: [30, 70, 0, 0],
    },
    {
      id: 4,
      name: "BOX4",
      width: 10,
      height: 10,
      x: 70,
      y: 50,
      rotate: 0,
      translate: [70, 50, 0, 0],
    },
  ]);

  const parentDimensions = useParentDimensions(containerRef);

  const findElement = () => {
    const temp = markers?.find((item) => item?.id === selectedElement);
    return temp;
  };

  const createNewGroup = () => {
    const id = uuidv4();
    setNewGroupId(id);
    setNewGroup({
      id,
      name: `Group ${groups?.length + 1}`,
      markers: [],
      color: "#2ed47a47",
    });
  };

  const handleAddToGroup = ({ elementId, groupId }) => {
    const temp = [...markers];
    temp?.forEach((item) => {
      if (item?.id === elementId) {
        if (item?.groupId) {
          item.groupId = null;
        } else {
          item.groupId = newGroupId;
        }
      }
    });
    setSelectedElementsForGroup((prev) => {
      let temp = [...prev];
      if (temp?.includes(elementId)) {
        temp = temp?.filter((item) => item !== elementId);
      } else {
        temp.push(elementId);
      }

      setNewGroup((prev) => {
        return { ...prev, markers: temp };
      });
      return temp;
    });
    setMarkers(temp);
  };

  const handleClick = ({ id, target }) => {
    if (mode === MODE.CREATE_GROUP) {
      handleAddToGroup({ elementId: id });
    } else {
      setSelectedElement(id);
      setTarget(target);
    }
  };

  const handleModeChange = (new_mode) => {
    setTarget(null);
    setSelectedElement(null);
    setMode(new_mode);
    if (new_mode === MODE.CREATE_GROUP) {
      createNewGroup();
    }
  };

  const handleSaveGroup = () => {
    setGroups([...groups, newGroup]);
    setNewGroup({});
    setSelectedElementsForGroup([]);
    setMode(null);
  };

  useEffect(() => {
    setTarget(null);
  }, [parentDimensions]);

  const NewSkeletonGroup = () => {
    const resultantMarkers = [];
    newGroup?.markers?.forEach((id) => {
      markers?.forEach((marker) => {
        if (marker?.id === id) {
          resultantMarkers?.push(marker);
        }
      });
    });
    const computedCoordinates = findMinMax(resultantMarkers);
    return (
      <Box
        sx={{
          position: "absolute",
          left: `${computedCoordinates?.x1}%`,
          top: `${computedCoordinates?.y1}%`,
          width: `${computedCoordinates?.x2 - computedCoordinates?.x1}%`,
          height: `${computedCoordinates?.y2 - computedCoordinates?.y1}%`,
          border: "1px dashed black",
          zIndex: 1,
          background: newGroup.color,
        }}
      ></Box>
    );
  };

  const Group = ({ group }) => {
    const resultantMarkers = [];
    group?.markers?.forEach((id) => {
      markers?.forEach((marker) => {
        if (marker?.id === id) {
          resultantMarkers?.push(marker);
        }
      });
    });
    const computedCoordinates = findMinMax(resultantMarkers);

    return (
      <Box
        sx={{
          position: "absolute",
          left: `${computedCoordinates?.x1}%`,
          top: `${computedCoordinates?.y1}%`,
          width: `${computedCoordinates?.x2 - computedCoordinates?.x1}%`,
          height: `${computedCoordinates?.y2 - computedCoordinates?.y1}%`,
          border: "1px solid green",
          zIndex: 1,
          background: group.color,
        }}
      >
        <Box sx={{ position: "absolute", top: "-7%", left: "0%", background: 'green', width: 'max-content', color: 'white' }}>
          {group?.name}
        </Box>
      </Box>
    );
  };

  const getFilteredMarkers = () =>{
    let list = [];
    if(mode === MODE.CREATE_GROUP){
      list = markers?.filter(item=> !item?.groupId);
    }else{
      list = markers;
    }
    return list;
  }

  // const filteredMarkers = getFilteredMarkers();

  return (
    <Stack width="100%">
      <Stack direction="row" width="100%" flexDirection="row-reverse">
        {mode === MODE.CREATE_GROUP ? (
          <Button onClick={() => handleSaveGroup()}> Add Group</Button>
        ) : (
          <Button onClick={() => handleModeChange(MODE.CREATE_GROUP)}>
            Create Group
          </Button>
        )}
        <Button onClick={() => handleModeChange("")}>Cancel</Button>
      </Stack>
      <Box
        ref={containerRef}
        id="container"
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          border: "1px solid red",
        }}
      >
        <img
          src={imageUrl}
          alt="layout"
          style={{ position: "absolute" }}
          width="100%"
          height="100%"
        />
        <Moveable
          target={target}
          draggable={true}
          keepRatio={true}
          resizable={true}
          rotatable={true}
          rotationPosition={"top"}
          throttleResize={0}
          throttleScale={0}
          throttleDrag={0}
          throttleRotate={0}
          startDragRotate={0}
          throttleDragRotate={0}
          snappable={true}
          bounds={{
            left: 0,
            top: 0,
            right: parentDimensions?.width,
            bottom: parentDimensions?.height,
          }}
          origin={false}
          padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
          onDragStart={({ set }) => {
            const temp = findElement();
            const translate = temp?.translate;
            const staticDimensions = getStaticCoordinates({
              parentDimensions,
              elementCoordinates: { x: translate?.[0], y: translate?.[1] },
            });
            set([staticDimensions?.x, staticDimensions?.y, 0, 0]);
          }}
          onDrag={({ target, beforeTranslate, ...rest }) => {
            const temp = [...markers];
            const dynamicDimensions = getDynamicCoordinates({
              parentDimensions,
              elementCoordinates: {
                x: beforeTranslate?.[0],
                y: beforeTranslate?.[1],
              },
            });

            temp?.forEach((item, i) => {
              if (item?.id === selectedElement) {
                temp[i].translate = [
                  dynamicDimensions.x,
                  dynamicDimensions.y,
                  0,
                  0,
                ];
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
            const staticDimensions = getStaticCoordinates({
              parentDimensions,
              elementCoordinates: { x: translate?.[0], y: translate?.[1] },
            });

            dragStart &&
              dragStart.set([staticDimensions?.x, staticDimensions?.y, 0, 0]);
          }}
          onResize={({ target, width, height, drag }) => {
            const temp = [...markers];
            const dynamicDimensions = getDynamicCoordinates({
              parentDimensions,
              elementDimensions: { width, height },
            });

            temp?.forEach((item, i) => {
              if (item?.id === selectedElement) {
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
            temp?.forEach((item, i) => {
              if (item?.id === selectedElement) {
                temp[i].rotate = rotation % 360;
              }
            });

            setMarkers(temp);
            target.style.transform = `rotate(${rotation % 360}deg)`;
          }}
        />
        {markers?.map((item) => (
          <Marker
            key={item?.id}
            item={item}
            mode={mode}
            parentDimensions={parentDimensions}
            handleClick={handleClick}
          />
        ))}

        {mode === MODE.CREATE_GROUP && <NewSkeletonGroup />}

        {mode !== MODE.CREATE_GROUP && (
          <>
            {groups?.map((item) => (
              <Group key={item?.id} group={item} />
            ))}
          </>
        )}
      </Box>
    </Stack>
  );
};

export default App;
