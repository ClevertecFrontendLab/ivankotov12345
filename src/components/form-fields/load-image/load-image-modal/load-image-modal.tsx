import { Button, Heading, Image, Input, VStack } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { Control, FieldPath, useController } from 'react-hook-form';

import { FallbackImage } from '~/components/fallback-image';
import { ModalWrapper } from '~/components/modal-wrapper';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { RecipeSchema } from '~/constants/validation-schemas/recipe';
import { getFullImagePath } from '~/helpers/get-full-image-path';
import { useLoadImageMutation } from '~/query/services/load-image';

type LoadImageModalProps = {
    control: Control<RecipeSchema>;
    name: FieldPath<RecipeSchema>;
    isOpen: boolean;
    onClose: () => void;
    setImageUrl: (imageUrl: string | undefined) => void;
    imageUrl?: string;
};

export const LoadImageModal: React.FC<LoadImageModalProps> = ({
    isOpen,
    onClose,
    setImageUrl,
    control,
    name,
    imageUrl,
}) => {
    const [selectedImageUrl, setSelectedImageUrl] = useState<string>();
    const [selectedImageFile, setSelectedImageFile] = useState<File>();

    const onSelectImage = () => inputRef.current?.click();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const { field } = useController({ control, name });

    const [loadImage] = useLoadImageMutation();

    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setSelectedImageFile(file);
            setSelectedImageUrl(fileUrl);
        }
    };

    const onSaveImage = async () => {
        if (!selectedImageFile) return;

        try {
            const formData = new FormData();
            formData.append('file', selectedImageFile);
            const { url } = await loadImage(formData).unwrap();
            setImageUrl(url);
            field.onChange(url);
            onClose();
        } catch (error) {
            console.log(error);
            onClose();
        }
    };

    const imagePreviewUrl = imageUrl ? getFullImagePath(imageUrl) : selectedImageUrl;

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose} testId=''>
            <Heading fontSize='2xl'>Изображение</Heading>

            <VStack w={SIZES.imagelg} h={SIZES.imagelg} onClick={onSelectImage}>
                <Image
                    src={imagePreviewUrl}
                    fallback={<FallbackImage />}
                    h={SIZES.imagelg}
                    borderRadius='lg'
                />
            </VStack>

            {selectedImageUrl && (
                <Button variant={STYLE_VARIANTS.black} onClick={onSaveImage} w={SIZES.full}>
                    Сохранить
                </Button>
            )}

            {imageUrl && <Button>Удалить</Button>}

            <Input
                type='file'
                accept='image/*'
                ref={inputRef}
                display='none'
                onChange={onImageChange}
            />
        </ModalWrapper>
    );
};
