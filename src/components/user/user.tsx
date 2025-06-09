import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

import { COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { DATA_TEST_ID } from '~/constants/test-id';
import { getFullName } from '~/helpers/get-full-name';
import { BloggerType } from '~/types/blogger';

type UserProps = Pick<BloggerType, 'firstName' | 'lastName' | 'avatar' | 'login'> & {
    withoutTestId?: boolean;
};

export const User: React.FC<UserProps> = ({
    firstName,
    lastName,
    avatar,
    login,
    withoutTestId,
}) => {
    const fullName = getFullName(firstName, lastName);
    return (
        <Flex gap={3} alignItems='center'>
            <Avatar size={{ base: 'sm', lg: 'md' }} src={avatar} name={fullName} />

            <Box>
                <Text
                    size={{ base: 'md', lg: 'lg' }}
                    fontWeight='medium'
                    noOfLines={1}
                    data-test-id={!withoutTestId && DATA_TEST_ID.blogsCardName}
                >
                    {fullName}
                </Text>
                <Text
                    fontSize={{ base: 'xs', lg: 'sm' }}
                    color={COLORS_BLACK_ALPHA[700]}
                    data-test-id={!withoutTestId && DATA_TEST_ID.blogsCardLogin}
                >
                    {`@${login}`}
                </Text>
            </Box>
        </Flex>
    );
};
