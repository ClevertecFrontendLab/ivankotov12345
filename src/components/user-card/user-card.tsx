import { Avatar, Box, Button, Card, Flex, Spacer, Text, VStack } from '@chakra-ui/react';

import authorAvatar from '~/assets/img/author-avatar.jpg';

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
    <Card bg='lime.300' w='full' flexDirection='row' alignItems='center' p={6} gap={4}>
        <Avatar src={avatar} name={name} w={24} h={24} />
        <VStack w='full' gap={4}>
            <Box position='relative' w='full'>
                <Text fontSize='2xl' fontWeight='bold'>
                    {name}
                </Text>
                <Text fontSize='sm' color='blackAlpha.700'>
                    {email}
                </Text>

                <Text position='absolute' right={0} top={0} fontSize='sm'>
                    Автор рецепта
                </Text>
            </Box>

            <Flex w='full' alignItems='end'>
                <Button leftIcon={<SignUp />} variant='black' size='xs'>
                    Подписаться
                </Button>

                <Spacer />

                <StatButton quantity={followers} icon={<PeopleIcon />} size='sm' />
            </Flex>
        </VStack>
    </Card>
);
