import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

import { COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { BloggerType } from '~/types/blogger';

type UserProps = Pick<BloggerType, 'firstName' | 'lastName' | 'avatar' | 'login'>;

export const User: React.FC<UserProps> = ({ firstName, lastName, avatar, login }) => {
    const fullName = [firstName, lastName].join(' ');
    return (
        <Flex gap={3} alignItems='center'>
            <Avatar size={{ base: 'sm', lg: 'md' }} src={avatar} name={fullName} />

            <Box>
                <Text size={{ base: 'md', lg: 'lg' }} fontWeight='medium' noOfLines={1}>
                    {fullName}
                </Text>
                <Text fontSize={{ base: 'xs', lg: 'sm' }} color={COLORS_BLACK_ALPHA[700]}>
                    {`@${login}`}
                </Text>
            </Box>
        </Flex>
    );
};
