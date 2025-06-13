import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router';

import { ROUTER_PATHS } from '~/constants/router-paths';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { DATA_TEST_ID } from '~/constants/test-id';

export const BlogSectionButton: React.FC = () => {
    const { pathname } = useLocation();

    return (
        <Button
            as={NavLink}
            to={ROUTER_PATHS.blogs}
            state={{ from: pathname }}
            variant={STYLE_VARIANTS.none}
            size={{ base: 'md', '2xl': 'lg' }}
            rightIcon={<ArrowForwardIcon />}
            data-test-id={DATA_TEST_ID.mainPageBlogsButton}
        >
            Все авторы
        </Button>
    );
};
