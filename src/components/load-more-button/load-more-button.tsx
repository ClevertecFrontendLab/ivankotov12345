import { Button, Center } from '@chakra-ui/react';
import React from 'react';

import { COLORS_LIME } from '~/constants/styles/colors';
import { DATA_TEST_ID } from '~/constants/test-id';

type LoadMoreButtonProps = {
    onLoadMoreClick: () => void;
    isLoading: boolean;
};

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onLoadMoreClick, isLoading }) => (
    <Center mt={4}>
        <Button
            bg={COLORS_LIME[400]}
            px={5}
            onClick={onLoadMoreClick}
            data-test-id={DATA_TEST_ID.loadMoreButton}
            isLoading={isLoading}
            loadingText='Загрузка'
        >
            Загрузить ещё
        </Button>
    </Center>
);
