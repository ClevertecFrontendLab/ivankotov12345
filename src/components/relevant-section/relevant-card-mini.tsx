import { Button, Card, CardBody, Flex, Heading, Image, Spacer } from '@chakra-ui/react';

import { CardData } from '~/types/card-data';

type RelevantCardMiniType = Pick<CardData, 'imgSrc' | 'title'>;

export const RelevantCardMini: React.FC<RelevantCardMiniType> = ({ imgSrc, title }) => (
    <Card w='full'>
        <CardBody py={3.5} pl={9} pr={6}>
            <Flex alignItems='center' gap={3}>
                <Image src={imgSrc} alt={title} />
                <Heading as='h3' variant='card'>
                    {title}
                </Heading>

                <Spacer />

                <Button size='sm' variant='outline' color='lime.600' borderColor='lime.600'>
                    Готовить
                </Button>
            </Flex>
        </CardBody>
    </Card>
);
