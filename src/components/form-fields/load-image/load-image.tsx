import { Box, Image, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Control, FieldPath } from 'react-hook-form';

import { FallbackImage } from '~/components/fallback-image';
import { COLORS, COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { BORDERS } from '~/constants/styles/styles';
import { RecipeSchema } from '~/constants/validation-schemas/recipe';
import { getFullImagePath } from '~/helpers/get-full-image-path';

import { LoadImageModal } from './load-image-modal';

type LoadImageProps = {
    control: Control<RecipeSchema>;
    name: FieldPath<RecipeSchema>;
    testIdImageBlock: string;
    testIdImage: string;
    testIdInput: string;
    isInvalid?: boolean;
};

export const LoadImage: React.FC<LoadImageProps> = ({
    control,
    isInvalid,
    name,
    testIdImageBlock,
    testIdImage,
    testIdInput,
}) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [imageUrl, setImageUrl] = useState<string>();

    const imageSrc = imageUrl && getFullImagePath(imageUrl);

    return (
        <Box w={SIZES.full} h={SIZES.full}>
            <Box
                onClick={onOpen}
                h={SIZES.full}
                border={BORDERS.solid}
                borderRadius='lg'
                borderColor={isInvalid ? COLORS.red : COLORS_BLACK_ALPHA[200]}
                data-test-id={testIdImageBlock}
            >
                {!imageSrc ? (
                    <FallbackImage />
                ) : (
                    <Image
                        src={imageSrc}
                        w={SIZES.full}
                        h={SIZES.full}
                        objectFit='cover'
                        borderRadius='lg'
                        data-test-id={testIdImage}
                    />
                )}
            </Box>

            <LoadImageModal
                isOpen={isOpen}
                onClose={onClose}
                setImageUrl={setImageUrl}
                imageUrl={imageUrl}
                control={control}
                name={name}
                testIdInput={testIdInput}
            />
        </Box>
    );
};
