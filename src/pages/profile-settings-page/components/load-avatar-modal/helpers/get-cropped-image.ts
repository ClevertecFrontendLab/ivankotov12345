import { Area } from 'react-easy-crop';

import { CROP_SIZE } from '../constants';

const createImage = (url: string) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.src = url;
    });

export const getCroppedImage = async (imageSrc: string, pixelCrop: Area): Promise<Blob> => {
    const image = (await createImage(imageSrc)) as HTMLImageElement;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Could not get canvas context');
    }

    canvas.width = CROP_SIZE;
    canvas.height = CROP_SIZE;

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        canvas.width,
        canvas.height,
    );

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(blob);
            }
        }, 'image/jpeg');
    });
};
