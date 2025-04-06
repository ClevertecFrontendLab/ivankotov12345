import { Box } from '@chakra-ui/react';

import { Сarousel } from '~/components/carousel/carousel';
import { PageHeader } from '~/components/page-header';
import { PAGE_TITLES } from '~/constants/page-titles';

export const HomePage: React.FC = () => (
    <Box>
        <PageHeader title={PAGE_TITLES.home} />
        <Сarousel />
    </Box>
);
