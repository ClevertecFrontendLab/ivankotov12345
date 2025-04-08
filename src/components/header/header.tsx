import { Flex, Image, Spacer, Stack, Text } from '@chakra-ui/react';

import { User } from '../user';
import avatar from './assets/img/Avatar.jpg';
import pan from './assets/svg/pan.svg';
import yeeDaa from './assets/svg/yee-daa.svg';

export const Header: React.FC = () => (
    <Flex maxW='1920px' w='full' h='full' alignItems='center' py={4} pl={4} pr={24} gap={32}>
        <Stack direction='row' alignItems='flex-end'>
            <Image src={pan} alt='pan' />
            <Image src={yeeDaa} alt='yee daa' />
        </Stack>

        <Text>Главная</Text>

        <Spacer />

        <User avatar={avatar} name='Екатерина Константинопольская' email='@bake_and_pie' />
    </Flex>
);
