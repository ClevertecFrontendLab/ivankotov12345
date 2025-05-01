import { IMAGES_BASE_URL } from '~/query/constants/paths';

export const getFullImagePath = (src: string): string => `${IMAGES_BASE_URL}${src}`;
