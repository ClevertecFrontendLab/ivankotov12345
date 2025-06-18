import { Flex } from '@chakra-ui/react';

import { TitleWithCount } from '~/components/title-with-count';

type UserRecipesTitleProps = {
    recipesCount: number;
    draftsCount: number;
};

export const UserRecipesTitle: React.FC<UserRecipesTitleProps> = ({
    recipesCount = 0,
    draftsCount = 0,
}) => (
    <Flex mb={4} gap={8}>
        <TitleWithCount title='Мои рецепты' count={recipesCount} />
        {draftsCount > 0 && <TitleWithCount title='Черновики' count={draftsCount} />}
    </Flex>
);
