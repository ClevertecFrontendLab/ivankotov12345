import { Flex, Spinner } from '@chakra-ui/react';

import { COLORS } from '~/constants/colors';

type LoaderSpinner = {
    wrapperSpinnerSize: string;
    spinnerSize: number;
};

export const LoaderSpinner: React.FC<LoaderSpinner> = ({ wrapperSpinnerSize, spinnerSize }) => (
    <Flex
        w={wrapperSpinnerSize}
        h={wrapperSpinnerSize}
        alignItems='center'
        justifyContent='center'
        bg='bgRadialGraident'
    >
        <Spinner w={spinnerSize} h={spinnerSize} color={COLORS.black} />
    </Flex>
);
