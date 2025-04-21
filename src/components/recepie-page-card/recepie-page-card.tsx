import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    HStack,
    Image,
    Spacer,
    Tag,
    TagLabel,
    TagLeftIcon,
    Text,
    VStack,
} from '@chakra-ui/react';

import { RecepieType } from '~/types/recepie';

import { CardBadge } from '../card-badge';
import { FavoriteIcon, LikeIcon, TimerIcon } from '../icons';
import { StatButton } from '../stat-button';

export type RecepiePageCardProps = Pick<
    RecepieType,
    'image' | 'title' | 'description' | 'category' | 'bookmarks' | 'likes' | 'time'
>;

export const RecepiePageCard: React.FC<RecepiePageCardProps> = ({
    image,
    title,
    description,
    category,
    bookmarks,
    likes,
    time,
}) => (
    <Card
        flexDirection='row'
        w='full'
        gap={6}
        variant='none'
        _hover={{
            boxShadow: 'none',
        }}
    >
        <Image
            maxW='carouselItem.2xl'
            flexShrink={0}
            w='full'
            src={image}
            alt={title}
            borderRadius='lg'
            overflow='hidden'
            objectFit='contain'
        />

        <VStack alignItems='start'>
            <CardHeader w='full'>
                <Flex>
                    <HStack flexWrap='wrap'>
                        {category.map((item) => (
                            <CardBadge backgroundColor='lime.50' key={item} category={item} />
                        ))}
                    </HStack>

                    <Spacer />

                    {bookmarks && (
                        <StatButton
                            quantity={bookmarks}
                            icon={<LikeIcon />}
                            size={{ base: 'xs', lg: 'sm' }}
                        />
                    )}
                    {likes && (
                        <StatButton
                            quantity={likes}
                            icon={<FavoriteIcon />}
                            size={{ base: 'xs', lg: 'sm' }}
                        />
                    )}
                </Flex>
            </CardHeader>

            <CardBody p={0}>
                <Heading fontSize='5xl' fontWeight='bold' mb={6} maxW={{ base: '100%', lg: '80%' }}>
                    {title}
                </Heading>

                <Text>{description}</Text>
            </CardBody>

            <CardFooter as={Flex} w='full' alignItems='end'>
                <Tag h={5} py={0.5} px={{ base: 1, lg: 2 }} bg='blackAlpha.100'>
                    <TagLeftIcon as={TimerIcon} />
                    <TagLabel>{time}</TagLabel>
                </Tag>

                <Spacer />

                <ButtonGroup gap={3}>
                    <Button
                        size='sm'
                        leftIcon={<FavoriteIcon />}
                        variant='outline'
                        borderColor='blackAlpha.600'
                        color='blackAlpha.800'
                        fontWeight='semibold'
                    >
                        Оценить рецепт
                    </Button>
                    <Button
                        size='sm'
                        leftIcon={<LikeIcon />}
                        fontWeight='semibold'
                        background='lime.400'
                    >
                        Сохранить в закладки
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </VStack>
    </Card>
);
