import { Button, Card, CardBody, CardFooter, Flex, Spacer, Text, VStack } from '@chakra-ui/react';

import { BLOG_CARD_TYPE } from '~/constants/blog-card-data';
import { COLORS_LIME } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { useToggleSubscriptionMutation } from '~/query/services/blogs';
import { useAppSelector } from '~/store/hooks';
import { selectUserId } from '~/store/slices/app-slice';
import { BloggerType } from '~/types/blogger';

import { LikeIcon, PeopleIcon } from '../icons';
import { StatButton } from '../stat-button';
import { User } from '../user';

type BlogCardProps = BloggerType & { cardType: keyof typeof BLOG_CARD_TYPE };

export const BlogCard: React.FC<BlogCardProps> = (props) => {
    const [toggleSubscription] = useToggleSubscriptionMutation();
    const userId = useAppSelector(selectUserId);

    const onSubscribeBusttonClick = async () => {
        if (!userId || !props._id) return;

        await toggleSubscription({ fromUserId: userId, toUserId: props._id });
    };

    return (
        <Card>
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
                        <Button size='xs' bg={COLORS_LIME[400]} onClick={onSubscribeBusttonClick}>
                            Рецепты
                        </Button>
                    )}

                    {props.cardType === BLOG_CARD_TYPE.anyBlogger && (
                        <Button
                            variant={STYLE_VARIANTS.black}
                            size='xs'
                            onClick={onSubscribeBusttonClick}
                        >
                            Подписаться
                        </Button>
                    )}

                    <Button variant={STYLE_VARIANTS.limeButton} size='xs'>
                        Читать
                    </Button>

                    <Spacer />

                    <StatButton icon={<LikeIcon />} quantity={props.bookmarksCount} size='xs' />
                    <StatButton icon={<PeopleIcon />} quantity={props.subscribersCount} size='xs' />
                </Flex>
            </CardFooter>
        </Card>
    );
};
