import { SimpleGrid } from '@chakra-ui/react';

type CardsWrapperProps = {
    children: React.ReactNode;
};

export const CardsWrapper: React.FC<CardsWrapperProps> = ({ children }) => (
    <SimpleGrid
        columns={{ md: 2, lg: 1, '2xl': 2 }}
        spacingX={{ base: 3, lg: 4, '2xl': 6 }}
        spacingY={{ base: 3, lg: 4, '2xl': 4 }}
    >
        {children}
    </SimpleGrid>
);
