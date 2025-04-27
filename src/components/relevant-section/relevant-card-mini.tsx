import { Button, Card, Heading, HStack, Image } from '@chakra-ui/react';

import { COLORS_LIME } from '~/constants/colors';
import { CardData } from '~/types/card-data';

type RelevantCardMiniType = Pick<CardData, 'image' | 'title'>;

export const RelevantCardMini: React.FC<RelevantCardMiniType> = ({ image, title }) => (
    <Card w='full' p={0}>
        <HStack py={{ base: 2, lg: 3 }} px={{ base: 3, lg: 6 }}>
            <Image src={image} />
            <Heading
                as='h3'
                fontSize={{ base: 'md', md: 'xl' }}
                noOfLines={1}
                fontWeight='medium'
                w='full'
            >
                {title}
            </Heading>

            <Button
                variant='outline'
                color={COLORS_LIME[600]}
                borderColor={COLORS_LIME[600]}
                size='sm'
                p={2}
                flexShrink={0}
            >
                Готовить
            </Button>
        </HStack>
    </Card>
);
