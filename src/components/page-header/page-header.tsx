import { Heading, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { SPINNER_SIZE } from '~/constants/styles/sizes';
import { DATA_TEST_ID } from '~/constants/test-id';
import { useAppSelector } from '~/store/hooks';
import { selectAllergensFilter } from '~/store/slices/filters-slice';
import { selectSearchInput } from '~/store/slices/search-input-slice';

import { LoaderSpinner } from '../loader-spinner';
import { SearchPanel } from '../search-panel';

type PageHeaderProps = {
    title: string;
    subtitle?: string;
    isFetching: boolean;
};

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const selectedAllergens = useAppSelector(selectAllergensFilter);
    const { isSearching } = useAppSelector(selectSearchInput);

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

            {!isSearching ? (
                <SearchPanel
                    setIsSearchFocused={setIsSearchFocused}
                    isSearchFocused={isSearchFocused}
                />
            ) : (
                <LoaderSpinner
                    wrapperSpinnerSize={SPINNER_SIZE.wrapperSm}
                    spinnerSize={SPINNER_SIZE.sizeSm}
                    testId={DATA_TEST_ID.loaderSearchBlock}
                />
            )}
        </VStack>
    );
};
