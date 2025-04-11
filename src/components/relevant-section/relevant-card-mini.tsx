import { Button, Card, CardBody, Flex, Heading, Image, Spacer } from '@chakra-ui/react';

import { CardData } from '~/types/card-data';

type RelevantCardMiniType = Pick<CardData, 'imgSrc' | 'title'>;

export const RelevantCardMini: React.FC<RelevantCardMiniType> = ({ imgSrc, title }) => (
    <Card w='full'>
        <CardBody py={{ base: 3, xl: 3.5 }} pl={{ base: 5, xl: 9 }} pr={{ base: 2, xl: 6 }}>
            <Flex alignItems='center'>
                <Image src={imgSrc} alt={title} />
                <Heading
                    as='h3'
                    fontSize={{ base: 'md', lg: 'xl' }}
                    fontWeight='medium'
                    noOfLines={1}
                    ml={2}
                >
                    {title}
                </Heading>

                <Spacer />

                <Button
                    fontSize={{ base: 'xs', lg: 'sm' }}
                    size='sm'
                    variant='outline'
                    color='lime.600'
                    borderColor='lime.600'
                >
                    Готовить
                </Button>
            </Flex>
        </CardBody>
    </Card>
);
