import { Avatar, Box, Flex, Heading, Text } from '@chakra-ui/react';

import { LikeIcon, PeopleIcon } from '~/components/icons';
import { StatButton } from '~/components/stat-button';
import { getFullName } from '~/helpers/get-full-name';
import { getTotalStatistic } from '~/helpers/get-total-stats';
import { useAppSelector } from '~/store/hooks';
import { selectCurrentUserStatistic } from '~/store/slices/user-slice';
import { UserData } from '~/types/user';

export const UserInfo: React.FC<UserData> = ({ firstName, lastName, login }) => {
    const fullName = getFullName(firstName, lastName);

    const currentUserStatistic = useAppSelector(selectCurrentUserStatistic);

    const totalStatistic = currentUserStatistic && getTotalStatistic(currentUserStatistic);

    return (
        <Flex>
            <Avatar name={fullName} size={{ base: 'xl', lg: '2xl' }} />

            <Flex flexDir='column'>
                <Heading>{fullName}</Heading>
                <Text>{`@${login}`}</Text>

                <Box>
                    {totalStatistic && totalStatistic.likes > 0 && (
                        <StatButton icon={<LikeIcon />} quantity={totalStatistic.likes} size='xs' />
                    )}

                    {totalStatistic && totalStatistic.bookmarks > 0 && (
                        <StatButton
                            icon={<PeopleIcon />}
                            quantity={totalStatistic.bookmarks}
                            size='xs'
                        />
                    )}
                </Box>
            </Flex>
        </Flex>
    );
};
