import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { NavLink } from 'react-router';

import { ROUTER_PATHS } from '~/constants/router-paths';
import { COLORS_LIME } from '~/constants/styles/colors';

type JuiciestButtonProps = {
    testId: string;
};

export const JuiciestButton: React.FC<JuiciestButtonProps> = ({ testId }) => (
    <Button
        as={NavLink}
        to={ROUTER_PATHS.juiciestPage}
        rightIcon={<ArrowForwardIcon />}
        bg={COLORS_LIME[400]}
        size={{ base: 'md', '2xl': 'lg' }}
        data-test-id={testId}
        px={5}
    >
        Вся подборка
    </Button>
);
