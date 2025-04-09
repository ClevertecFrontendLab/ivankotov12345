import { Card, CardBody, CardFooter, Flex, Heading, Spacer, Text } from '@chakra-ui/react';

import { CardData } from '~/types/card-data';

import { CardBadge } from '../card-badge';
import { FavoriteIcon, LikeIcon } from '../icons';
import { StatButton } from '../stat-button';

type RelevantSectionCardProps = Omit<CardData, 'imgSrc' | 'recommendedBy'>;

export const RelevantSectionCard: React.FC<RelevantSectionCardProps> = ({
    title,
    description,
    category,
    likes,
    favorites,
}) => (
    <Card p={6}>
        <CardBody p={0} gap={2}>
            <Heading as='h3' variant='card' mb={2}>
                {title}
            </Heading>

            <Text noOfLines={3} fontSize='sm'>
                {description}
            </Text>
        </CardBody>

        <CardFooter p={0} w='full'>
            <Flex alignItems='center' w='full'>
                <CardBadge backgroundColor='lime.50' category={category} />

                <Spacer />

                {likes && <StatButton size='xs' quantity={likes} icon={<LikeIcon />} />}
                {favorites && <StatButton size='xs' quantity={favorites} icon={<FavoriteIcon />} />}
            </Flex>
        </CardFooter>
    </Card>
);
