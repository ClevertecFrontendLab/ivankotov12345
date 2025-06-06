import { Avatar, Flex, Heading, HStack, Spacer, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { BlogCardLoader } from '~/components/blog-card-loader/blog-card-loader';
import { LikeIcon, PeopleIcon } from '~/components/icons';
import { StatButton } from '~/components/stat-button';
import { SubscribeButton } from '~/components/subscribe-button';
import { getFullName } from '~/helpers/get-full-name';
import { BloggerInfoResponse } from '~/types/blogger';

export const BloggerCard: React.FC<BloggerInfoResponse> = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const { firstName, lastName, login, avatar, _id } = props.bloggerInfo;
    const { isFavorite, totalBookmarks, totalSubscribers } = props;

    const fullName = getFullName(firstName, lastName);
    return (
        <HStack justifyContent='center' gap={6} position='relative'>
            <Avatar src={avatar} name={fullName} size='2xl' />

            <Flex flexDir='column' gap={4}>
                <Heading>{fullName}</Heading>
                <Text>{`@${login}`}</Text>

                <Flex>
                    <SubscribeButton
                        bloggerId={_id}
                        isFavorite={isFavorite}
                        setIsLoading={setIsLoading}
                    />

                    <Spacer />

                    <StatButton icon={<LikeIcon />} quantity={totalBookmarks} size='xs' />
                    <StatButton icon={<PeopleIcon />} quantity={totalSubscribers} size='xs' />
                </Flex>
            </Flex>

            {isLoading && <BlogCardLoader />}
        </HStack>
    );
};
