import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    Flex,
    HStack,
    Spacer,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

import { BLOG_CARD_TYPE } from '~/constants/blog-card-data';
import { ANCHOR_NOTES } from '~/constants/router-paths';
import { COLORS_LIME } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { BloggerType } from '~/types/blogger';

import { BlogCardLoader } from '../blog-card-loader/blog-card-loader';
import { LikeIcon, PeopleIcon } from '../icons';
import { StatButton } from '../stat-button';
import { SubscribeButton } from '../subscribe-button';
import { User } from '../user';
import { makeNewRecipeCountString } from './helpers';
import { useBloggerNavigation } from './hooks';

type BlogCardProps = BloggerType & { cardType: keyof typeof BLOG_CARD_TYPE };

export const BlogCard: React.FC<BlogCardProps> = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigateToBlogger = useBloggerNavigation();

    const handleBloggerClick = () => navigateToBlogger(props._id);
    const handleReadBloggerClick = () => navigateToBlogger(props._id, ANCHOR_NOTES);
    return (
        <Card position='relative'>
            <CardBody
                pt={{ base: 4, '2xl': 6 }}
                px={{ base: 4, '2xl': 6 }}
                pb={{ base: 4, '2xl': 5 }}
                borderRadius='lg'
            >
                <VStack spacing={{ base: 3, '2xl': 5 }} align='start'>
                    <User {...props} />
                    {props.cardType === BLOG_CARD_TYPE.favoritesBlogger &&
                        props.newRecipesCount > 0 && (
                            <Badge
                                position='absolute'
                                right={{ base: 1, lg: 2 }}
                                top={{ base: 1, lg: 2 }}
                                py={0.5}
                                px={2}
                                fontWeight='normal'
                                fontSize='sm'
                                textTransform='lowercase'
                            >
                                {makeNewRecipeCountString(props.newRecipesCount)}
                            </Badge>
                        )}
                    {props.notes.length > 0 && <Text noOfLines={3}>{props.notes[0].text}</Text>}
                </VStack>
            </CardBody>

            <CardFooter pt={0} px={4} pb={4}>
                <Flex
                    direction={
                        props.cardType === BLOG_CARD_TYPE.otherBlogger
                            ? { base: 'column-reverse', lg: 'row' }
                            : { base: 'column-reverse', xl: 'row' }
                    }
                    alignItems='flex-end'
                    w={SIZES.full}
                    gap={2}
                >
                    <HStack>
                        {props.cardType === BLOG_CARD_TYPE.favoritesBlogger && (
                            <Button size='xs' bg={COLORS_LIME[400]} onClick={handleBloggerClick}>
                                Рецепты
                            </Button>
                        )}

                        {(props.cardType === BLOG_CARD_TYPE.anyBlogger ||
                            props.cardType === BLOG_CARD_TYPE.otherBlogger) && (
                            <SubscribeButton
                                bloggerId={props._id}
                                isFavorite={props.isFavorite}
                                setIsLoading={setIsLoading}
                            />
                        )}

                        <Button
                            variant={STYLE_VARIANTS.limeButton}
                            size='xs'
                            onClick={handleReadBloggerClick}
                        >
                            Читать
                        </Button>
                    </HStack>

                    <Spacer />

                    <HStack>
                        {props.bookmarksCount > 0 && (
                            <StatButton
                                icon={<LikeIcon />}
                                quantity={props.bookmarksCount}
                                size='xs'
                            />
                        )}
                        {props.subscribersCount > 0 && (
                            <StatButton
                                icon={<PeopleIcon />}
                                quantity={props.subscribersCount}
                                size='xs'
                            />
                        )}
                    </HStack>
                </Flex>
            </CardFooter>

            {isLoading && <BlogCardLoader />}
        </Card>
    );
};
