import { Avatar, Flex, Heading, HStack, Spacer, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { BlogCardLoader } from '~/components/blog-card-loader/blog-card-loader';
import { LikeIcon, PeopleIcon } from '~/components/icons';
import { StatButton } from '~/components/stat-button';
import { SubscribeButton } from '~/components/subscribe-button';
import { COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { DATA_TEST_ID } from '~/constants/test-id';
import { getFullName } from '~/helpers/get-full-name';
import { BloggerInfoResponse } from '~/types/blogger';

export const BloggerCard: React.FC<BloggerInfoResponse> = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const { firstName, lastName, login, avatar, _id } = props.bloggerInfo;
    const { isFavorite, totalBookmarks, totalSubscribers } = props;

    const fullName = getFullName(firstName, lastName);
    return (
        <HStack
            w={{ base: SIZES.full, md: SIZES.auto }}
            mt={{ base: 8, lg: 6 }}
            mb={10}
            flexDirection={{ base: 'column', md: 'row' }}
            justifyContent='center'
            gap={6}
            position='relative'
            data-test-id={DATA_TEST_ID.bloggerUserInfoBox}
        >
            <Avatar src={avatar} name={fullName} size={{ base: 'xl', lg: '2xl' }} />

            <Flex
                w={{ base: SIZES.full, md: SIZES.auto }}
                minWidth={{ base: 0, md: 64 }}
                flexDir='column'
                gap={4}
                textAlign={{ base: 'center', md: 'start' }}
            >
                <Heading
                    fontSize={{ base: '2xl', lg: '5xl' }}
                    data-test-id={DATA_TEST_ID.bloggerUserInfoName}
                >
                    {fullName}
                </Heading>
                <Text
                    fontSize='sm'
                    color={COLORS_BLACK_ALPHA[700]}
                    data-test-id={DATA_TEST_ID.bloggerUserInfoLogin}
                >{`@${login}`}</Text>

                <Flex>
                    <SubscribeButton
                        bloggerId={_id}
                        isFavorite={isFavorite}
                        setIsLoading={setIsLoading}
                    />

                    <Spacer />

                    {totalBookmarks > 0 && (
                        <StatButton
                            icon={<LikeIcon />}
                            quantity={totalBookmarks}
                            size='xs'
                            testId={DATA_TEST_ID.bloggerFollowersBookmarks}
                        />
                    )}
                    {totalSubscribers > 0 && (
                        <StatButton
                            icon={<PeopleIcon />}
                            quantity={totalSubscribers}
                            size='xs'
                            testId={DATA_TEST_ID.bloggerFollowersCount}
                        />
                    )}
                </Flex>
            </Flex>

            {isLoading && <BlogCardLoader />}
        </HStack>
    );
};
