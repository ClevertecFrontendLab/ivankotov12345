import { CloseIcon } from '@chakra-ui/icons';
import {
    Button,
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Heading,
    HStack,
    IconButton,
    Spacer,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AppTextarea } from '~/components/form-fields';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { CREATE_NOTE_STATUS, RESPONSE_STATUS } from '~/constants/statuses';
import { BACKDROP_FILTER, SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { NoteSchema, noteSchema } from '~/constants/validation-schemas/note';
import { useCreateNoteMutation } from '~/query/services/user';
import { useAppDispatch } from '~/store/hooks';
import { setToastData, setToastIsOpen } from '~/store/slices/app-slice';

type UserNotesDrawerProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const UserNotesDrawer: React.FC<UserNotesDrawerProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();

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

    const onSubmit: SubmitHandler<NoteSchema> = async ({ text }) => {
        try {
            await createNote({ text }).unwrap();
            dispatch(setToastData(CREATE_NOTE_STATUS[RESPONSE_STATUS.OK]));
            dispatch(setToastIsOpen(true));
            onClose();
        } catch {
            dispatch(setToastIsOpen(true));
            onClose();
        }
    };

    return (
        <Drawer isOpen={isOpen} onClose={onClose}>
            <DrawerOverlay bg='shadowed' backdropFilter={BACKDROP_FILTER} />

            <DrawerContent
                w={SIZES.full}
                maxW={{ base: 'drawerWidth.sm', lg: 'drawerWidth.lg' }}
                p={8}
            >
                <DrawerHeader mb={10} p={0}>
                    <HStack justifyContent='space-between'>
                        <Heading fontSize='2xl' fontWeight='bold'>
                            Новая заметка
                        </Heading>

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

                <Flex
                    height={SIZES.full}
                    direction='column'
                    as='form'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <AppTextarea
                        register={register('text')}
                        placeholder={PLACEHOLDERS.maxNoteLength}
                        setValue={setValue}
                        isInvalid={!!errors.text}
                        testId=''
                    />

                    <Spacer />

                    <Button type='submit' variant={STYLE_VARIANTS.black} maxW={44} alignSelf='end'>
                        Опубликовать
                    </Button>
                </Flex>
            </DrawerContent>
        </Drawer>
    );
};
