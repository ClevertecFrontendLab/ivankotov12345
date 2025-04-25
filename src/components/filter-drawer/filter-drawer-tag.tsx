import { CloseIcon } from '@chakra-ui/icons';
import { Tag, TagLabel, TagRightIcon } from '@chakra-ui/react';

type FilterDrawerProps = {
    label: string;
};

export const FilterDrawerTag: React.FC<FilterDrawerProps> = ({ label }) => (
    <Tag border='lime' background='lime.100' color='lime.600' data-test-id='filter-tag'>
        <TagLabel>{label}</TagLabel>
        <TagRightIcon as={CloseIcon} boxSize={2.5} color='lime.700' />
    </Tag>
);
