import { Card, CardBody, CardFooter, Flex, Heading, Spacer, Text } from '@chakra-ui/react';

import { COLORS_LIME } from '~/constants/colors';
import { CardData } from '~/types/card-data';

import { CardBadge } from '../card-badge';
import { FavoriteIcon, LikeIcon } from '../icons';
import { StatButton } from '../stat-button';

type RelevantSectionCardProps = Omit<CardData, 'image' | 'recommendedBy' | 'time' | 'subcategory'>;

export const RelevantSectionCard: React.FC<RelevantSectionCardProps> = ({
    title,
    description,
    category,
    bookmarks,
    likes,
}) => (
    <Card p={{ base: 2, '2xl': 6 }}>
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
                {category.map((item) => (
                    <CardBadge backgroundColor={COLORS_LIME[50]} key={item} category={item} />
                ))}

                <Spacer />

                {bookmarks && (
                    <StatButton
                        size={{ base: 'xs', lg: 'sm' }}
                        quantity={bookmarks}
                        icon={<LikeIcon />}
                    />
                )}
                {likes && (
                    <StatButton
                        size={{ base: 'xs', lg: 'sm' }}
                        quantity={likes}
                        icon={<FavoriteIcon />}
                    />
                )}
            </Flex>
        </CardFooter>
    </Card>
);
