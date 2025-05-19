import { Button } from '@chakra-ui/react';

import { COLORS_LIME } from '~/constants/styles/colors';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';

type StatButtonProps = {
    quantity: number;
    icon: React.ReactElement;
    size: string | Record<string, string>;
};

export const StatButton: React.FC<StatButtonProps> = ({ quantity, icon, size }) => (
    <Button
        leftIcon={icon}
        color={COLORS_LIME[600]}
        size={size}
        px={1}
        variant={STYLE_VARIANTS.none}
        _hover={{
            borderColor: 'white',
        }}
        iconSpacing={1.5}
    >
        {quantity}
    </Button>
);
