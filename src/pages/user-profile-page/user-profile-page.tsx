import { Box } from '@chakra-ui/react';

import { useAppSelector } from '~/store/hooks';
import { selectCurrentUser } from '~/store/slices/user-slice';

import { UserInfo } from './components/user-info';

export const UserProfilePage: React.FC = () => {
    const currentUser = useAppSelector(selectCurrentUser);
    return <Box>{currentUser && <UserInfo {...currentUser} />}</Box>;
};
