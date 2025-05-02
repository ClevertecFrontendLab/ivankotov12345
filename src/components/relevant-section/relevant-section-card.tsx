import { Card, CardBody, CardFooter, Flex, Heading, Spacer, Text } from '@chakra-ui/react';

import { COLORS_LIME } from '~/constants/colors';
import { getCardCategories } from '~/helpers/get-card-categories';
import { useAppSelector } from '~/store/hooks';
import { selectCategory } from '~/store/slices/category-slice';
import { CardData } from '~/types/card-data';

import { CardBadge } from '../card-badge';
import { FavoriteIcon, LikeIcon } from '../icons';
import { StatButton } from '../stat-button';

type RelevantSectionCardProps = Pick<
    CardData,
    'title' | 'description' | 'bookmarks' | 'likes' | 'categoriesIds'
>;

export const RelevantSectionCard: React.FC<RelevantSectionCardProps> = ({
    title,
    description,
    bookmarks,
    categoriesIds,
    likes,
}) => {
    const { categories, subCategories } = useAppSelector(selectCategory);
    const cardCategories = getCardCategories(categories, subCategories, categoriesIds);
    return (
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
                    {cardCategories.map(({ _id, title, icon }) => (
                        <CardBadge
                            backgroundColor={COLORS_LIME[50]}
                            key={_id}
                            title={title}
                            icon={icon}
                        />
                    ))}

                    <Spacer />

                    {bookmarks > 0 && (
                        <StatButton
                            size={{ base: 'xs', lg: 'sm' }}
                            quantity={bookmarks}
                            icon={<LikeIcon />}
                        />
                    )}
                    {likes > 0 && (
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
};
