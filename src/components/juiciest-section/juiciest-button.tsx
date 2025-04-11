import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

export const JuiciestButton: React.FC = () => (
    <Button rightIcon={<ArrowForwardIcon />} bg='lime.400' size={{ base: 'md', '2xl': 'lg' }}>
        Вся подборка
    </Button>
);
