import { Heading, VStack } from '@chakra-ui/react';

import { PAGE_HEADER_MAX_WIDTH } from '~/constants/sizes';

import { SearchPanel } from '../search-panel';

type PageHeaderProps = {
    title: string;
};

export const PageHeader: React.FC<PageHeaderProps> = ({ title }) => (
    <VStack as='section' maxW={PAGE_HEADER_MAX_WIDTH} mx='auto' py={8} gap={8}>
        <Heading as='h1'>{title}</Heading>
        <SearchPanel />
    </VStack>
);
