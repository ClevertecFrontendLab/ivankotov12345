import { CloseIcon } from '@chakra-ui/icons';
import { Tag, TagLabel, TagRightIcon } from '@chakra-ui/react';

import { COLORS_LIME } from '~/constants/colors';
import { DATA_TEST_ID } from '~/constants/test-id';

type FilterDrawerProps = {
    label: string;
};

export const FilterDrawerTag: React.FC<FilterDrawerProps> = ({ label }) => (
    <Tag
        border='lime'
        background={COLORS_LIME[100]}
        color={COLORS_LIME[600]}
        data-test-id={DATA_TEST_ID.filterTag}
    >
        <TagLabel>{label}</TagLabel>
        <TagRightIcon as={CloseIcon} boxSize={2.5} color={COLORS_LIME[700]} />
    </Tag>
);
