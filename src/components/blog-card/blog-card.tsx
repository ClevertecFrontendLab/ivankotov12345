import { Button, Card, CardBody, CardFooter, Flex, Spacer, Text, VStack } from '@chakra-ui/react';
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

                    {props.notes.length > 0 && <Text noOfLines={3}>{props.notes[0].text}</Text>}
                </VStack>
            </CardBody>

            <CardFooter>
                <Flex w={SIZES.full} gap={2}>
                    {props.cardType === BLOG_CARD_TYPE.favoritesBlogger && (
                        <Button size='xs' bg={COLORS_LIME[400]} onClick={handleBloggerClick}>
                            Рецепты
                        </Button>
                    )}

                    {props.cardType === BLOG_CARD_TYPE.anyBlogger && (
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

                    <Spacer />

                    <StatButton icon={<LikeIcon />} quantity={props.bookmarksCount} size='xs' />
                    <StatButton icon={<PeopleIcon />} quantity={props.subscribersCount} size='xs' />
                </Flex>
            </CardFooter>

            {isLoading && <BlogCardLoader />}
        </Card>
    );
};
