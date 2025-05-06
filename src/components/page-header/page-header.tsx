import { Heading, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { COLORS_BLACK_ALPHA } from '~/constants/colors';
import { SPINNER_SIZE } from '~/constants/sizes';
import { useAppSelector } from '~/store/hooks';
import { selectAllergensFilter } from '~/store/slices/filters-slice';

import { LoaderSpinner } from '../loader-spinner';
import { SearchPanel } from '../search-panel';

type PageHeaderProps = {
    title: string;
    subtitle?: string;
    isFetching: boolean;
};

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, isFetching }) => {
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
                    <Text
                        textAlign='center'
                        color={COLORS_BLACK_ALPHA[600]}
                        px={{ base: 0, lg: 24 }}
                    >
                        {subtitle}
                    </Text>
                )}
            </VStack>

            {!isFetching ? (
                <SearchPanel
                    setIsSearchFocused={setIsSearchFocused}
                    isSearchFocused={isSearchFocused}
                />
            ) : (
                <LoaderSpinner
                    wrapperSpinnerSize={SPINNER_SIZE.wrapperSm}
                    spinnerSize={SPINNER_SIZE.sizeSm}
                />
            )}
        </VStack>
    );
};
