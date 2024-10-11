import cv from 'opencv-ts';

export const applyGrayscale = async (image: HTMLImageElement, canvas: HTMLCanvasElement) => {
    const src = cv.imread(image);
    const dst = new cv.Mat();
    cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
    cv.imshow(canvas, dst);
    src.delete();
    dst.delete();
};

export const cropImage = async (image: HTMLImageElement, canvas: HTMLCanvasElement) => {
    const src = cv.imread(image);
    const rect = new cv.Rect(0, 0, 100, 100); // Example: crop 100x100 from top-left
    const dst = src.roi(rect);
    cv.imshow(canvas, dst);
    src.delete();
    dst.delete();
};