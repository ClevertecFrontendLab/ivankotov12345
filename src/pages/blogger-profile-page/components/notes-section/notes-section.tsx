import { Button, Card, Flex, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { COLORS_BLACK_ALPHA, COLORS_LIME } from '~/constants/styles/colors';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { BORDERS } from '~/constants/styles/styles';
import { formatDate } from '~/helpers/format-date';
import { BloggerNotes } from '~/types/blogger';

const INITIAL_NOTES = 3;

const BUTTON_TEXT = {
    showMore: 'Показать больше',
    hide: 'Свернуть',
};

export const NotesSection: React.FC<{ bloggerNotes: BloggerNotes[] }> = ({ bloggerNotes }) => {
    const [collapsed, setCollapsed] = useState(false);

    const displayedNotes = collapsed ? bloggerNotes : bloggerNotes.slice(0, INITIAL_NOTES);

    const onLoadMoreClick = () => setCollapsed(!collapsed);

    return (
        <VStack p={6} bgColor={COLORS_BLACK_ALPHA[50]}>
            <Heading alignSelf='start'>
                Заметки <Text as='span'>{`(${bloggerNotes.length})`}</Text>
            </Heading>

            <SimpleGrid columns={3} gap={4}>
                {displayedNotes.map(({ date, text }) => (
                    <Card
                        p={6}
                        border={BORDERS.solid}
                        borderColor={COLORS_BLACK_ALPHA[200]}
                        borderRadius='lg'
                        key={text}
                    >
                        <Flex direction='column' gap={4}>
                            <Text color={COLORS_LIME[600]}>{formatDate(date)}</Text>
                            <Text>{text}</Text>
                        </Flex>
                    </Card>
                ))}
            </SimpleGrid>

            <Button onClick={onLoadMoreClick} variant={STYLE_VARIANTS.none}>
                {collapsed ? BUTTON_TEXT.hide : BUTTON_TEXT.showMore}
            </Button>
        </VStack>
    );
};
