import { Button, Card, CardBody, Flex, Heading, Image, Spacer } from '@chakra-ui/react';

import { CardData } from '~/types/card-data';

type RelevantCardMiniType = Pick<CardData, 'imgSrc' | 'title'>;

export const RelevantCardMini: React.FC<RelevantCardMiniType> = ({ imgSrc, title }) => (
    <Card w='full'>
        <CardBody px={3} py={4}>
            <Flex alignItems='center' gap={2}>
                <Image src={imgSrc} alt={title} />
                <Heading as='h3' variant='card'>
                    {title}
                </Heading>

                <Spacer />

                <Button size='sm' variant='outline' color='lime.600' borderColor='lime.600'>
                    Готово
                </Button>
            </Flex>
        </CardBody>
    </Card>
);
