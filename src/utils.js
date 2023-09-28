export const getStaticCoordinates = ({parentDimensions, elementDimensions, elementCoordinates}) => {
    const parentWidth = parentDimensions?.width || 0;
    const parentHeight = parentDimensions?.height || 0;
    const elementWidth = elementDimensions?.width || 0;
    const elementHeight = elementDimensions?.height || 0;
    const elementX_Left = elementCoordinates?.x || 0;
    const elementY_Top = elementCoordinates?.y || 0;

    const staticX = (elementX_Left * parentWidth) /100;
    const staticY = (elementY_Top * parentHeight) /100;

    const staticWidth = (elementWidth * parentWidth)/100;
    const staticHeight = (elementHeight * parentHeight)/100;

    return {x: staticX, y: staticY, width: staticWidth, height: staticHeight};
};

export const getDynamicCoordinates = ({parentDimensions, elementDimensions, elementCoordinates}) => {
    const parentWidth = parentDimensions?.width || 0;
    const parentHeight = parentDimensions?.height || 0;
    const elementWidth = elementDimensions?.width || 0;
    const elementHeight = elementDimensions?.height || 0;
    const elementX_Left = elementCoordinates?.x || 0;
    const elementY_Top = elementCoordinates?.y || 0;

    const dynamicX = (elementX_Left / parentWidth) *100;
    const dynamicY = (elementY_Top / parentHeight) *100;

    const dynamicWidth = (elementWidth / parentWidth)*100;
    const dynamicHeight = (elementHeight / parentHeight)*100;

    return {x: dynamicX, y: dynamicY, width: dynamicWidth, height: dynamicHeight};
};