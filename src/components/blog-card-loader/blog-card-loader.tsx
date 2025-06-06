import { Center } from '@chakra-ui/react';
import React from 'react';

import { SIZES, SPINNER_SIZE } from '~/constants/styles/sizes';

import { LoaderSpinner } from '../loader-spinner';

export const BlogCardLoader: React.FC = () => (
    <Center position='absolute' width={SIZES.full} height={SIZES.full} top={0} left={0}>
        <LoaderSpinner
            spinnerSize={SPINNER_SIZE.sizeSm}
            wrapperSpinnerSize={SPINNER_SIZE.wrapperSm}
            testId=''
        />
    </Center>
);
