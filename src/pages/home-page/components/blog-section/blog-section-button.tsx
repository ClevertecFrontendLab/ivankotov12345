import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { ROUTER_PATHS } from '~/constants/router-paths';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';

export const BlogSectionButton: React.FC = () => {
    const navigate = useNavigate();
    const onBlogSectionButtonClick = () => navigate(ROUTER_PATHS.blogs);
    return (
        <Button
            variant={STYLE_VARIANTS.none}
            size={{ base: 'md', '2xl': 'lg' }}
            rightIcon={<ArrowForwardIcon />}
            onClick={onBlogSectionButtonClick}
        >
            Все авторы
        </Button>
    );
};
