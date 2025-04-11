import { Button, Card, Heading, HStack, Image } from '@chakra-ui/react';

import { CardData } from '~/types/card-data';

type RelevantCardMiniType = Pick<CardData, 'imgSrc' | 'title'>;

export const RelevantCardMini: React.FC<RelevantCardMiniType> = ({ imgSrc, title }) => (
    <Card w='full' p={0}>
        <HStack py={{ base: 2, lg: 3 }} px={{ base: 3, lg: 6 }}>
            <Image src={imgSrc} />
            <Heading
                as='h3'
                fontSize={{ base: 'md', md: 'xl' }}
                noOfLines={1}
                fontWeight='medium'
                w='full'
            >
                {title}
            </Heading>

            <Button variant='outline' color='lime.600' borderColor='lime.600' size='sm'>
                Готовить
            </Button>
        </HStack>
    </Card>
);
