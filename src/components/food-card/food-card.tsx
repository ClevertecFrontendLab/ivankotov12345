import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    Image,
    Tag,
    TagLabel,
    Text,
    VStack,
} from '@chakra-ui/react';

import { FOOD_CARD_IMAGE_MAX_WIDTH } from '~/constants/styles';
import { CardData } from '~/types/card-data';

import { CardBadge } from '../card-badge';
import { FavoriteIcon, LikeIcon } from '../icons';
import { StatButton } from '../stat-button';

export const FoodCard: React.FC<CardData> = ({
    imgSrc,
    title,
    description,
    likes,
    favorites,
    category,
    recommendedBy,
}) => (
    <Card direction='row' overflow='hidden' borderRadius='lg'>
        <Image src={imgSrc} alt={title} maxW={FOOD_CARD_IMAGE_MAX_WIDTH} objectFit='contain' />

        {recommendedBy && (
            <Tag pos='absolute' left={6} bottom={5} size='md' bg='lime.150' py={0.5} px={2}>
                <Avatar src={recommendedBy.avatar} name={recommendedBy.name} w={4} h={4} />
                <TagLabel ml={2} fontWeight='normal'>
                    {recommendedBy.name} рекомендует
                </TagLabel>
            </Tag>
        )}

        <VStack py={5} px={6}>
            <CardHeader p={0}>
                <Flex>
                    <CardBadge backgroundColor='lime.50' category={category} />
                    {likes && <StatButton quantity={likes} icon={<LikeIcon />} size='sm' />}
                    {favorites && (
                        <StatButton quantity={favorites} icon={<FavoriteIcon />} size='sm' />
                    )}
                </Flex>
            </CardHeader>

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

            <CardFooter p={0} display='block' w='full'>
                <ButtonGroup w='full' justifyContent='flex-end'>
                    <Button
                        variant='outline'
                        leftIcon={<LikeIcon />}
                        size='sm'
                        borderColor='blackAlpha.600'
                    >
                        Сохранить
                    </Button>
                    <Button size='sm' variant='black'>
                        Готовить
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </VStack>
    </Card>
);
