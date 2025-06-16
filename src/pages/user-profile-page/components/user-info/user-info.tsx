import { Avatar, Flex, Heading, Text } from '@chakra-ui/react';

import { getFullName } from '~/helpers/get-full-name';
import { UserData } from '~/types/user';

export const UserInfo: React.FC<UserData> = ({ firstName, lastName, login }) => {
    const fullName = getFullName(firstName, lastName);
    return (
        <Flex>
            <Avatar name={fullName} size={{ base: 'xl', lg: '2xl' }} />

            <Flex flexDir='column'>
                <Heading>{fullName}</Heading>
                <Text>{`@${login}`}</Text>
            </Flex>
        </Flex>
    );
};
