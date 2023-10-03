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

export const getSecondCoordinateFromDimension = (data) => {
    let x2 = 0;
    let y2 = 0;
    x2 = data.width + data.x;
    y2 = data.height + data.y;
    console.log({x: x2, y: y2})
    return {x: x2, y: y2};
}

export const findMinMax = (array) => {
    let minX = Number.MAX_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;
    let maxX = Number.MIN_SAFE_INTEGER;
    let maxY = Number.MIN_SAFE_INTEGER;

    array?.forEach(obj=>{
        const secondCoordinate = getSecondCoordinateFromDimension(obj);
        minX = Math.min(Math.min(obj.x, secondCoordinate?.x), minX);
        minY = Math.min(Math.min(obj.y, secondCoordinate?.y), minY);
        maxX = Math.max(Math.max(obj.x, secondCoordinate?.x), maxX);
        maxY = Math.max(Math.max(obj.y, secondCoordinate?.y), maxY);
    })

    return {x1: minX, x2: maxX, y1: minY, y2: maxY};
};