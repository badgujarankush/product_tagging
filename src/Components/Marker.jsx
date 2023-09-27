import { Box } from "@mui/material";
import React from "react";

const Marker = (props) => {
  const { item, handleClick } = props;
  return (
    <Box
      id={item?.id}
      style={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ee8",
        top: item?.y,
        left: item?.x,
        width: item?.width,
        height: item?.height,
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
