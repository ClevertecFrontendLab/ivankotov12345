import { Button, HStack, SimpleGrid, useBreakpointValue, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { BORDERS } from '~/constants/styles/styles';
import { DATA_TEST_ID } from '~/constants/test-id';
import { BloggerNotes } from '~/types/blogger';

import { PenIcon } from '../icons';
import { TitleWithCount } from '../title-with-count';
import { NoteCard } from './note-card';

type NotesSectionProps = {
    notes: BloggerNotes[];
    isUserNotes?: boolean;
    onOpen?: () => void;
};

const BUTTON_TEXT = {
    showMore: 'Показать больше',
    hide: 'Свернуть',
};

export const NotesSection: React.FC<NotesSectionProps> = ({
    notes,
    isUserNotes = false,
    onOpen,
}) => {
    const [collapsed, setCollapsed] = useState(false);

    const isMobile = useBreakpointValue({ base: true, md: false });

    const initialNotes = isMobile ? 2 : 3;

    const onLoadMoreClick = () => setCollapsed(!collapsed);

    return (
        <VStack
            p={6}
            gap={4}
            borderRadius='2xl'
            bgColor={COLORS_BLACK_ALPHA[50]}
            data-test-id={DATA_TEST_ID.blogNotesBox}
        >
            <HStack w={SIZES.full} justifyContent='space-between'>
                <TitleWithCount title='Заметки' count={notes.length} />

                {isUserNotes && (
                    <Button
                        onClick={onOpen}
                        leftIcon={<PenIcon />}
                        variant={STYLE_VARIANTS.none}
                        size='sm'
                        border={BORDERS.solid}
                        borderColor={COLORS_BLACK_ALPHA[600]}
                        borderRadius='md'
                    >
                        Новая заметка
                    </Button>
                )}
            </HStack>

            <SimpleGrid
                w={SIZES.full}
                columns={{ base: 1, md: 3 }}
                gap={4}
                data-test-id={DATA_TEST_ID.bloggerUserNotesGrid}
            >
                {notes.map((note, index) => (
                    <NoteCard
                        {...note}
                        key={note._id}
                        display={!collapsed && index >= initialNotes ? 'none' : 'block'}
                        isUserNotes={isUserNotes}
                    />
                ))}
            </SimpleGrid>

            <Button
                onClick={onLoadMoreClick}
                variant={STYLE_VARIANTS.none}
                display={notes.length > initialNotes ? 'block' : 'none'}
                data-test-id={DATA_TEST_ID.bloggerUserNotesButton}
            >
                {collapsed ? BUTTON_TEXT.hide : BUTTON_TEXT.showMore}
            </Button>
        </VStack>
    );
};
