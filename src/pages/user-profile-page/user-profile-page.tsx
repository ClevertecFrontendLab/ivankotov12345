import { Box } from '@chakra-ui/react';

import { useGetBloggerActivityQuery } from '~/query/services/blogs';
import { useAppSelector } from '~/store/hooks';
import { selectCurrentUser } from '~/store/slices/user-slice';

import { UserInfo } from './components/user-info';
import { UserNotes } from './components/user-notes';
import { UserRecipes } from './components/user-recipes';

export const UserProfilePage: React.FC = () => {
    const currentUser = useAppSelector(selectCurrentUser);
    const { data: currentUserActivitiesData } = useGetBloggerActivityQuery(currentUser?._id);

    return (
        <Box>
            {currentUser && <UserInfo {...currentUser} />}

            <UserRecipes
                drafts={currentUser?.drafts ?? []}
                recipes={currentUserActivitiesData?.recipes ?? []}
            />

            <UserNotes notes={currentUser?.notes ?? []} />
        </Box>
    );
};
