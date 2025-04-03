import { Avatar, Box, Flex, Image, Spacer, Stack, Text } from '@chakra-ui/react';

import avatar from './assets/img/Avatar.jpg';
import pan from './assets/svg/pan.svg';
import yeeDaa from './assets/svg/yee-daa.svg';

export const Header: React.FC = () => (
    <Flex w='100%' h='100%' maxW='1920px' alignItems='center' pt={4} pb={4} pl={4} gap={32}>
        <Stack direction='row' alignItems='flex-end'>
            <Image src={pan} alt='pan' />
            <Image src={yeeDaa} alt='yee daa' />
        </Stack>

        <Text>Главная</Text>

        <Spacer />

        <Flex gap={3} pr={20}>
            <Avatar src={avatar} name='Екатерина Константинопольская' />

            <Box>
                <Text fontSize='lg' fontWeight='medium'>
                    Екатерина Константинопольская
                </Text>
                <Text fontSize='sm' color='blackAlpha.700'>
                    @bake_and_pie
                </Text>
            </Box>
        </Flex>
    </Flex>
);
