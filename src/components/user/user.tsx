import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

import { COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { UserData } from '~/types/card-data';

export const User: React.FC<UserData> = ({ avatar, name, email }) => (
    <Flex gap={3} alignItems='center'>
        <Avatar size={{ base: 'sm', lg: 'md' }} src={avatar} name={name} />

        <Box>
            <Text size={{ base: 'md', lg: 'lg' }} fontWeight='medium' noOfLines={1}>
                {name}
            </Text>
            <Text fontSize={{ base: 'xs', lg: 'sm' }} color={COLORS_BLACK_ALPHA[700]}>
                {email}
            </Text>
        </Box>
    </Flex>
);
