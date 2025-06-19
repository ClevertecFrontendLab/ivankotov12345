import { Box, Heading } from '@chakra-ui/react';

import { LoadAvatar } from '../load-avatar';

export const PersonalInfoSection: React.FC = () => (
    <Box as='section'>
        <Heading>Авторизация и персонализация</Heading>

        <LoadAvatar />
    </Box>
);
