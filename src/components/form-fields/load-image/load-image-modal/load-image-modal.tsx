import { Button, Heading, Image, Input, VStack } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
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
    setImageUrl: (imageUrl?: string) => void;
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
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>();
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>();

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
        } catch {
            onClose();
        }
    };

    const onDeleteImage = () => {
        field.onChange(null);
        setImageUrl();
        setSelectedImageFile(null);
        setSelectedImageUrl(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }

        onClose();
    };

    useEffect(() => {
        if (field.value) {
            const imageUrl = field.value as string;
            setImageUrl(imageUrl);
        }
    }, [field, setImageUrl]);

    const imagePreviewUrl = selectedImageUrl ?? (imageUrl && getFullImagePath(imageUrl));
    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose} testId=''>
            <Heading fontSize='2xl'>Изображение</Heading>

            <VStack w={SIZES.imagelg} h={SIZES.imagelg} onClick={onSelectImage} my={4}>
                <Image
                    src={imagePreviewUrl}
                    fallback={<FallbackImage />}
                    h={SIZES.imagelg}
                    borderRadius='lg'
                />
            </VStack>

            {selectedImageUrl && (
                <VStack gap={4} w={SIZES.full}>
                    <Button variant={STYLE_VARIANTS.black} onClick={onSaveImage} w={SIZES.full}>
                        Сохранить
                    </Button>

                    <Button onClick={onDeleteImage} variant={STYLE_VARIANTS.none}>
                        Удалить
                    </Button>
                </VStack>
            )}

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
