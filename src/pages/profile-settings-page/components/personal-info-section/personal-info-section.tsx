import { Box, Heading } from '@chakra-ui/react';

import { LoadAvatar } from '../load-avatar';
import { UserDataForm } from '../user-data-form';

export const PersonalInfoSection: React.FC = () => (
    <Box as='section'>
        <Heading>Авторизация и персонализация</Heading>

        <LoadAvatar />
        <UserDataForm />
    </Box>
);
