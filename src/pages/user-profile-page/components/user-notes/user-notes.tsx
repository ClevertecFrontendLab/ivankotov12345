import { Box, Button, HStack, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import React from 'react';

import { NoteCard } from '~/components/note-card';
import { TitleWithCount } from '~/components/title-with-count';
import { BloggerNotes } from '~/types/blogger';

import { UserNotesDrawer } from './user-notes-drawer';

export const UserNotes: React.FC<{ notes: BloggerNotes[] }> = ({ notes }) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <Box>
            <HStack justifyContent='space-between'>
                <TitleWithCount title='Заметки' count={notes.length} />

                <Button onClick={onOpen}>Новая заметка</Button>
            </HStack>

            <UserNotesDrawer isOpen={isOpen} onClose={onClose} />

            <SimpleGrid columns={3}>
                {notes.map((note) => (
                    <NoteCard {...note} />
                ))}
            </SimpleGrid>
        </Box>
    );
};
