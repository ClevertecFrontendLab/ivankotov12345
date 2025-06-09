import { SimpleGrid } from '@chakra-ui/react';

type cardsWrapperProps = {
    children: React.ReactNode;
    testId?: string;
};

export const CardsWrapper: React.FC<cardsWrapperProps> = ({ children, testId }) => (
    <SimpleGrid
        columns={{ md: 2, lg: 1, '2xl': 2 }}
        spacingX={{ base: 3, lg: 4, '2xl': 6 }}
        spacingY={{ base: 3, lg: 4, '2xl': 4 }}
        data-test-id={testId}
    >
        {children}
    </SimpleGrid>
);
