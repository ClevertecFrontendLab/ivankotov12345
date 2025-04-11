import { Button } from '@chakra-ui/react';

type StatButtonProps = {
    quantity: number;
    icon: React.ReactElement;
    size: string | Record<string, string>;
};

export const StatButton: React.FC<StatButtonProps> = ({ quantity, icon, size }) => (
    <Button
        leftIcon={icon}
        color='lime.600'
        size={size}
        px={1}
        variant='ghost'
        _hover={{
            borderColor: 'white',
        }}
    >
        {quantity}
    </Button>
);
