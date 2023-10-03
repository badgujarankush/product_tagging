import React, { useEffect, useState } from "react";

const useParentDimensions = (ref) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      const element = ref?.current?.getBoundingClientRect();
    console.log({element})
      setDimensions({
        width: element.width,
        height: element.height,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [ref]);

  return dimensions;
};

export default useParentDimensions;
