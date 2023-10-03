import { Box } from "@mui/material";
import React from "react";
import { getStaticCoordinates } from "../utils";
import { MODE } from "../constants";

const Marker = (props) => {
  const { item, handleClick, parentDimensions, mode } = props;

  const staticDimensions = getStaticCoordinates({parentDimensions, elementCoordinates: {x: item?.x, y: item?.y}, elementDimensions: {width: item?.width, height: item?.height}})
  

  return (
    <Box
      id={item?.id}
      style={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        top: staticDimensions?.y,
        left: staticDimensions?.x,
        width: staticDimensions?.width,
        height: staticDimensions?.height,
        transform: `rotate(${item?.rotate % 360}deg)`,
        zIndex: 3,
      }}
      sx={{
        cursor: 'pointer',
        background: "#ee8",
        transition: 'background 0.25s ease-in-out',
        ':hover':{
            background: mode === MODE.CREATE_GROUP ? 'red' : '#ee8'
        }
      }}
      onClick={(e) => {
        e.stopPropagation();
        handleClick({ id: item?.id, target: e.target });
      }}
    >
      {item?.name}
    </Box>
  );
};

export default Marker;
