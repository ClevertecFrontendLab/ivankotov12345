import { Heading, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { useAppSelector } from '~/store/hooks';
import { selectAllergensFilter } from '~/store/slices/filters-slice';

import { SearchPanel } from '../search-panel';

type PageHeaderProps = {
    title: string;
    subtitle?: string;
};

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const selectedAllergens = useAppSelector(selectAllergensFilter);

    return (
        <VStack
            as='section'
            maxW='pageHeaderMaxWidth'
            mx='auto'
            py={8}
            gap={{ base: 6, lg: 8 }}
            borderRadius='3xl'
            boxShadow={isSearchFocused || selectedAllergens.length ? 'searchShadow' : ''}
        >
            <VStack gap={3}>
                <Heading as='h1' fontSize={{ base: '2xl', lg: '5xl' }} lineHeight='none'>
                    {title}
                </Heading>

                {subtitle && (
                    <Text textAlign='center' color='blackAlpha.600' px={{ base: 0, lg: 24 }}>
                        {subtitle}
                    </Text>
                )}
            </VStack>

            <SearchPanel setIsSearchFocused={setIsSearchFocused} />
        </VStack>
    );
};
