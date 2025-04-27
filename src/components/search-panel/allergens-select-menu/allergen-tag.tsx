import { Tag } from '@chakra-ui/react';

type AllergenTagProps = {
    allergen: string;
};

export const AllergenTag: React.FC<AllergenTagProps> = ({ allergen }) => (
    <Tag variant='outline' border='lime' color='lime.600' boxShadow='none'>
        {allergen.replace(/^./, (char) => char.toUpperCase())}
    </Tag>
);
