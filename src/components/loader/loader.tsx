import { Center, useMediaQuery } from '@chakra-ui/react';

import { BACKDROP_FILTER, SIZES, SPINNER_SIZE } from '~/constants/styles/sizes';
import { Z_INDEX } from '~/constants/styles/z-index';
import { DATA_TEST_ID } from '~/constants/test-id';

import { LoaderSpinner } from '../loader-spinner';

export const Loader: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
    const [isTablet] = useMediaQuery('(max-width: 74rem)');
    return isLoading ? (
        <Center
            w={SIZES.fullWieportWidth}
            h={SIZES.fullWieportHeight}
            position='fixed'
            top={0}
            left={0}
            bg='shadowed'
            backdropFilter={BACKDROP_FILTER}
            zIndex={Z_INDEX.burger}
        >
            <LoaderSpinner
                spinnerSize={isTablet ? SPINNER_SIZE.sizeSm : SPINNER_SIZE.sizeLg}
                wrapperSpinnerSize={isTablet ? SPINNER_SIZE.wrapperSm : SPINNER_SIZE.wrapperlg}
                testId={DATA_TEST_ID.appLoader}
            />
        </Center>
    ) : null;
};
