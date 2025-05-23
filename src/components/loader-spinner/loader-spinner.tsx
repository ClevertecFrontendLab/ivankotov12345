import { Flex, Spinner } from '@chakra-ui/react';

import { COLORS } from '~/constants/styles/colors';

type LoaderSpinner = {
    wrapperSpinnerSize: string;
    spinnerSize: number;
    testId: string;
};

export const LoaderSpinner: React.FC<LoaderSpinner> = ({
    wrapperSpinnerSize,
    spinnerSize,
    testId,
}) => (
    <Flex
        w={wrapperSpinnerSize}
        h={wrapperSpinnerSize}
        alignItems='center'
        justifyContent='center'
        bg='bgRadialGraident'
    >
        <Spinner w={spinnerSize} h={spinnerSize} color={COLORS.black} data-test-id={testId} />
    </Flex>
);
