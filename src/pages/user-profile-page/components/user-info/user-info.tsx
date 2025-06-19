import { SettingsIcon } from '@chakra-ui/icons';
import { Avatar, Box, Flex, Heading, IconButton, Text, VStack } from '@chakra-ui/react';
import { NavLink } from 'react-router';

import { LikeIcon, PeopleIcon } from '~/components/icons';
import { StatButton } from '~/components/stat-button';
import { ROUTER_PATHS } from '~/constants/router-paths';
import { COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
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
        <Flex mb={6} py={4} gap={6} position='relative'>
            <Avatar name={fullName} size={{ base: 'xl', lg: '2xl' }} />

            <VStack alignItems='start' justifyContent='space-between'>
                <Heading fontSize={{ base: '2xl', lg: '5xl' }}>{fullName}</Heading>
                <Text fontSize='sm' color={COLORS_BLACK_ALPHA[700]}>{`@${login}`}</Text>

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

                <IconButton
                    as={NavLink}
                    to={ROUTER_PATHS.profileSetings}
                    aria-label='settings'
                    icon={<SettingsIcon fontSize='2xl' />}
                    variant={STYLE_VARIANTS.none}
                    position='absolute'
                    right={0}
                    size='lg'
                />
            </VStack>
        </Flex>
    );
};
