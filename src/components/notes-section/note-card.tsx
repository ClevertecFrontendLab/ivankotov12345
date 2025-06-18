import { Card, Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import React from 'react';

import { DELETE_NOTE_STATUS, RESPONSE_STATUS } from '~/constants/statuses';
import { COLORS_BLACK_ALPHA, COLORS_LIME } from '~/constants/styles/colors';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { BORDERS } from '~/constants/styles/styles';
import { formatDate } from '~/helpers/format-date';
import { useDeleteNoteMutation } from '~/query/services/user';
import { useAppDispatch } from '~/store/hooks';
import { setToastData, setToastIsOpen } from '~/store/slices/app-slice';
import { BloggerNotes } from '~/types/blogger';

import { DeleteIcon } from '../icons';

type NoteCardProps = BloggerNotes & { display: 'none' | 'block'; isUserNotes: boolean };

export const NoteCard: React.FC<NoteCardProps> = ({ date, text, _id, display, isUserNotes }) => {
    const [deleteNote] = useDeleteNoteMutation();
    const dispatch = useAppDispatch();

    const handleDeleteNote = async () => {
        try {
            if (_id) {
                await deleteNote(_id).unwrap();
                dispatch(setToastData(DELETE_NOTE_STATUS[RESPONSE_STATUS.OK]));
                dispatch(setToastIsOpen(true));
            }
        } catch {
            dispatch(setToastIsOpen(true));
        }
    };
    return (
        <Card
            p={6}
            border={BORDERS.solid}
            borderColor={COLORS_BLACK_ALPHA[200]}
            borderRadius='lg'
            display={display}
        >
            <Flex direction='column' gap={4}>
                <HStack justifyContent='space-between'>
                    <Text color={COLORS_LIME[600]} fontSize='sm'>
                        {formatDate(date)}
                    </Text>

                    {isUserNotes && (
                        <IconButton
                            aria-label='delete note'
                            icon={<DeleteIcon />}
                            variant={STYLE_VARIANTS.none}
                            size='xs'
                            onClick={handleDeleteNote}
                        />
                    )}
                </HStack>
                <Text fontSize='sm'>{text}</Text>
            </Flex>
        </Card>
    );
};
