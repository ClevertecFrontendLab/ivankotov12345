import { Box, useDisclosure } from '@chakra-ui/react';

import { NotesSection } from '~/components/notes-section';
import { useGetBloggerActivityQuery } from '~/query/services/blogs';
import { useAppSelector } from '~/store/hooks';
import { selectCurrentUser } from '~/store/slices/user-slice';

import { UserInfo } from './components/user-info';
import { UserNotesDrawer } from './components/user-notes-drawer';
import { UserRecipes } from './components/user-recipes';

export const UserProfilePage: React.FC = () => {
    const currentUser = useAppSelector(selectCurrentUser);
    const { data: currentUserActivitiesData } = useGetBloggerActivityQuery(currentUser?._id);

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box>
            {currentUser && <UserInfo {...currentUser} />}

            <UserRecipes
                drafts={currentUser?.drafts ?? []}
                recipes={currentUserActivitiesData?.recipes ?? []}
            />

            <NotesSection notes={currentUser?.notes ?? []} isUserNotes={true} onOpen={onOpen} />
            <UserNotesDrawer isOpen={isOpen} onClose={onClose} />
        </Box>
    );
};
