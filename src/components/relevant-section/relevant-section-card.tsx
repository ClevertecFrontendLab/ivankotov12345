import { Box, Card, CardBody, CardFooter, Flex, Heading, Spacer, Text } from '@chakra-ui/react';

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
        <CardBody p={0}>
            <Box>
                <Heading as='h3' variant='card'>
                    {title}
                </Heading>
                <Text noOfLines={3} fontSize='sm'>
                    {description}
                </Text>
            </Box>
        </CardBody>

        <CardFooter p={0}>
            <Flex alignItems='center'>
                <CardBadge backgroundColor='lime.50' category={category} />

                <Spacer />

                {likes && <StatButton size='xs' quantity={likes} icon={<LikeIcon />} />}
                {favorites && <StatButton size='xs' quantity={favorites} icon={<FavoriteIcon />} />}
            </Flex>
        </CardFooter>
    </Card>
);
