import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

export const BlogSectionButton: React.FC = () => (
    <Button variant='none' size={{ base: 'md', '2xl': 'lg' }} rightIcon={<ArrowForwardIcon />}>
        Все авторы
    </Button>
);
