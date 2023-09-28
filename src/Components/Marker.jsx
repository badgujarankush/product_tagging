import { Box } from "@mui/material";
import React from "react";
import { getStaticCoordinates } from "../utils";

const Marker = (props) => {
  const { item, handleClick, parentDimensions } = props;

  const staticDimensions = getStaticCoordinates({parentDimensions, elementCoordinates: {x: item?.x, y: item?.y}, elementDimensions: {width: item?.width, height: item?.height}})
  

  return (
    <Box
      id={item?.id}
      style={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ee8",
        top: staticDimensions?.y,
        left: staticDimensions?.x,
        width: staticDimensions?.width,
        height: staticDimensions?.height,
      }}
      onClick={(e) => {
        handleClick({ id: item?.id, target: e.target });
      }}
    >
      {item?.name}
    </Box>
  );
};

export default Marker;
