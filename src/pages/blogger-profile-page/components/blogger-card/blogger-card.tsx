import { Avatar, Flex, Heading, HStack, Spacer, Text } from '@chakra-ui/react';

import { LikeIcon, PeopleIcon } from '~/components/icons';
import { StatButton } from '~/components/stat-button';
import { SubscribeButton } from '~/components/subscribe-button';
import { getFullName } from '~/helpers/get-full-name';
import { BloggerInfoResponse } from '~/types/blogger';

export const BloggerCard: React.FC<BloggerInfoResponse> = (props) => {
    const { firstName, lastName, login, avatar, _id } = props.bloggerInfo;
    const { isFavorite, totalBookmarks, totalSubscribers } = props;

    const fullName = getFullName(firstName, lastName);
    return (
        <HStack justifyContent='center' gap={6}>
            <Avatar src={avatar} name={fullName} size='2xl' />

            <Flex flexDir='column' gap={4}>
                <Heading>{fullName}</Heading>
                <Text>{`@${login}`}</Text>

                <Flex>
                    <SubscribeButton bloggerId={_id} isFavorite={isFavorite} />

                    <Spacer />

                    <StatButton icon={<LikeIcon />} quantity={totalBookmarks} size='xs' />
                    <StatButton icon={<PeopleIcon />} quantity={totalSubscribers} size='xs' />
                </Flex>
            </Flex>
        </HStack>
    );
};
