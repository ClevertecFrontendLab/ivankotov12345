import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

import { UserData } from '~/types/card-data';

export const User: React.FC<UserData> = ({ avatar, name, email }) => (
    <Flex gap={3}>
        <Avatar src={avatar} name={name} />

        <Box>
            <Text fontSize='lg' fontWeight='medium'>
                {name}
            </Text>
            <Text fontSize='sm' color='blackAlpha.700'>
                {email}
            </Text>
        </Box>
    </Flex>
);
