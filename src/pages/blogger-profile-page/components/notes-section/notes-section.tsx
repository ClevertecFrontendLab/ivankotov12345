import {
    Button,
    Card,
    Flex,
    Heading,
    SimpleGrid,
    Text,
    useBreakpointValue,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

import { COLORS_BLACK_ALPHA, COLORS_LIME } from '~/constants/styles/colors';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { BORDERS } from '~/constants/styles/styles';
import { formatDate } from '~/helpers/format-date';
import { BloggerNotes } from '~/types/blogger';

const BUTTON_TEXT = {
    showMore: 'Показать больше',
    hide: 'Свернуть',
};

export const NotesSection: React.FC<{ bloggerNotes: BloggerNotes[] }> = ({ bloggerNotes }) => {
    const [collapsed, setCollapsed] = useState(false);

    const isMobile = useBreakpointValue({ base: true, md: false });

    const initialNotes = isMobile ? 2 : 3;

    const onLoadMoreClick = () => setCollapsed(!collapsed);

    return (
        <VStack p={6} gap={4} borderRadius='2xl' bgColor={COLORS_BLACK_ALPHA[50]}>
            <Heading fontSize={{ base: 'xl', lg: '4xl' }} fontWeight='normal' alignSelf='start'>
                Заметки{' '}
                <Text as='span' color={COLORS_BLACK_ALPHA[600]}>{`(${bloggerNotes.length})`}</Text>
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
                {bloggerNotes.map(({ date, text }, index) => (
                    <Card
                        p={6}
                        border={BORDERS.solid}
                        borderColor={COLORS_BLACK_ALPHA[200]}
                        borderRadius='lg'
                        key={text}
                        display={!collapsed && index >= initialNotes ? 'none' : 'block'}
                    >
                        <Flex direction='column' gap={4}>
                            <Text color={COLORS_LIME[600]} fontSize='sm'>
                                {formatDate(date)}
                            </Text>
                            <Text fontSize='sm'>{text}</Text>
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
