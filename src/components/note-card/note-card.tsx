import { Card, Flex, Text } from '@chakra-ui/react';
import React from 'react';

import { COLORS_BLACK_ALPHA, COLORS_LIME } from '~/constants/styles/colors';
import { BORDERS } from '~/constants/styles/styles';
import { formatDate } from '~/helpers/format-date';
import { BloggerNotes } from '~/types/blogger';

export const NoteCard: React.FC<BloggerNotes> = ({ date, text }) => (
    <Card
        p={6}
        border={BORDERS.solid}
        borderColor={COLORS_BLACK_ALPHA[200]}
        borderRadius='lg'
        //display={!collapsed && index >= initialNotes ? 'none' : 'block'}
    >
        <Flex direction='column' gap={4}>
            <Text color={COLORS_LIME[600]} fontSize='sm'>
                {formatDate(date)}
            </Text>
            <Text fontSize='sm'>{text}</Text>
        </Flex>
    </Card>
);
