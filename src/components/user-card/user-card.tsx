import { Avatar, Box, Button, Card, Flex, Spacer, Text, VStack } from '@chakra-ui/react';

import authorAvatar from '~/assets/img/author-avatar.jpg';
import { COLORS_BLACK_ALPHA, COLORS_LIME } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';

import { PeopleIcon, SignUp } from '../icons';
import { StatButton } from '../stat-button';

const userData = {
    avatar: authorAvatar,
    name: 'Сергей Разумов',
    email: '@serge25',
    followers: 125,
};

const { avatar, name, email, followers } = userData;

export const UserCard: React.FC = () => (
    <Card
        bg={COLORS_LIME[300]}
        w={SIZES.full}
        flexDirection='row'
        alignItems='center'
        p={{ base: 3, md: 6 }}
        gap={4}
    >
        <Avatar src={avatar} name={name} w={24} h={24} />
        <VStack w={SIZES.full} gap={4}>
            <Text
                position='absolute'
                right={{ base: 1, md: 6 }}
                top={{ base: 1, md: 6 }}
                fontSize='sm'
            >
                Автор рецепта
            </Text>

            <Box w={SIZES.full}>
                <Text
                    fontSize={{ base: 'sm', md: '2xl' }}
                    fontWeight={{ base: 'semibold', md: 'bold' }}
                >
                    {name}
                </Text>

                <Text fontSize='sm' color={COLORS_BLACK_ALPHA[700]}>
                    {email}
                </Text>
            </Box>

            <Flex w={SIZES.full} alignItems='center'>
                <Button leftIcon={<SignUp />} variant={STYLE_VARIANTS.black} size='xs'>
                    Подписаться
                </Button>

                <Spacer />

                <StatButton quantity={followers} icon={<PeopleIcon />} size='sm' />
            </Flex>
        </VStack>
    </Card>
);
