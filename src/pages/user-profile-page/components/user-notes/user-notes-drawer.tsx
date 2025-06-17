import { CloseIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Heading,
    HStack,
    IconButton,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AppTextarea } from '~/components/form-fields';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { NoteSchema, noteSchema } from '~/constants/validation-schemas/note';
import { useCreateNoteMutation } from '~/query/services/user';

type UserNotesDrawerProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const UserNotesDrawer: React.FC<UserNotesDrawerProps> = ({ isOpen, onClose }) => {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(noteSchema),
        mode: 'onSubmit',
    });

    const [createNote] = useCreateNoteMutation();

    const onSubmit: SubmitHandler<NoteSchema> = async ({ text }) => await createNote({ text });

    return (
        <Drawer isOpen={isOpen} onClose={onClose}>
            <DrawerOverlay />

            <DrawerContent w={SIZES.full} maxW={{ base: 'drawerWidth.sm', lg: 'drawerWidth.lg' }}>
                <DrawerHeader>
                    <HStack justifyContent='space-between'>
                        <Heading>Новая заметка</Heading>

                        <IconButton
                            variant={STYLE_VARIANTS.black}
                            icon={<CloseIcon />}
                            aria-label='close'
                            borderRadius={SIZES.full}
                            size='xs'
                            onClick={onClose}
                        />
                    </HStack>
                </DrawerHeader>

                <Box as='form' onSubmit={handleSubmit(onSubmit)}>
                    <AppTextarea
                        register={register('text')}
                        placeholder={PLACEHOLDERS.maxNoteLength}
                        setValue={setValue}
                        isInvalid={!!errors.text}
                        testId=''
                    />

                    <Button type='submit'>Опубликовать</Button>
                </Box>
            </DrawerContent>
        </Drawer>
    );
};
