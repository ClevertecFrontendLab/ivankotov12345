import { Heading, VStack } from '@chakra-ui/react';

import { SearchPanel } from '../search-panel';

type PageHeaderProps = {
    title: string;
};

export const PageHeader: React.FC<PageHeaderProps> = ({ title }) => (
    <VStack
        as='section'
        maxW='pageHeaderMaxWidth'
        mx='auto'
        mb={{ base: 0, lg: 6 }}
        py={8}
        gap={{ base: 6, lg: 8 }}
    >
        <Heading as='h1' fontSize={{ base: '2xl', lg: '5xl' }} lineHeight='none'>
            {title}
        </Heading>
        <SearchPanel />
    </VStack>
);
