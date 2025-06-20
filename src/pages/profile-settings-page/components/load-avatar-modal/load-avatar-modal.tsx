import { Box, Button, Heading, ModalProps } from '@chakra-ui/react';
import { useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';

import { ModalWrapper } from '~/components/modal-wrapper';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { useLoadAvatarMutation } from '~/query/services/load-image';

import { CROP_SIZE, cropperStyles } from './constants';
import { getCroppedImage } from './helpers/get-cropped-image';

type LoadAvatarModalProps = Pick<ModalProps, 'isOpen' | 'onClose'> & {
    selectedImageUrl: string | null;
    selectedImageFileName: string | null;
};

export const LoadAvatarModal: React.FC<LoadAvatarModalProps> = ({
    isOpen,
    onClose,
    selectedImageUrl,
    selectedImageFileName,
}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [pixelCrop, setPixelCrop] = useState<Area | null>(null);

    const [loadAvatar] = useLoadAvatarMutation();

    const onCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) =>
        setPixelCrop(croppedAreaPixels);

    const onCreateCroppedImage = async () => {
        if (!selectedImageUrl || !selectedImageFileName || !pixelCrop) return;

        const blob = await getCroppedImage(selectedImageUrl, pixelCrop);
        const imageFile = new File([blob], selectedImageFileName, { type: 'image/jpeg' });

        const formData = new FormData();
        formData.append('file', imageFile);

        try {
            await loadAvatar(formData).unwrap();
            onClose();
        } catch {
            onClose();
        }
    };

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose}>
            <Heading fontSize='2xl'>Изменить изображение профиля</Heading>

            {selectedImageUrl && (
                <Box position='relative' w={SIZES.imagelg} h={SIZES.imagelg} overflow='hidden'>
                    <Cropper
                        image={selectedImageUrl}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                        showGrid={false}
                        cropShape='round'
                        cropSize={{ width: CROP_SIZE, height: CROP_SIZE }}
                        style={cropperStyles}
                    />
                </Box>
            )}

            <Button variant={STYLE_VARIANTS.black} onClick={onCreateCroppedImage}>
                Кадрировать и сохранить
            </Button>
        </ModalWrapper>
    );
};
