import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

import { STYLE_VARIANTS } from '~/constants/styles/style-variants';

export const BlogSectionButton: React.FC = () => (
    <Button
        variant={STYLE_VARIANTS.none}
        size={{ base: 'md', '2xl': 'lg' }}
        rightIcon={<ArrowForwardIcon />}
    >
        Все авторы
    </Button>
);
