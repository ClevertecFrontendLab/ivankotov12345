import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { NavLink } from 'react-router';

import { ROUTER_PATHS } from '~/constants/router-paths';
import { COLORS, COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { DATA_TEST_ID } from '~/constants/test-id';
import { usePathItems } from '~/hooks/use-path-items';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { closeBurgerMenu } from '~/store/slices/burger-slice';
import { selectCategories } from '~/store/slices/category-slice';
import { selectSelectedRecipe } from '~/store/slices/selected-recipe-slice';

const THE_JUICIEST = 'the-juiciest';
const THE_JUICIEST_TITLE = 'Самое сочное';

export const Breadcrumbs: React.FC = () => {
    const dispatch = useAppDispatch();
    const { selectedRecipeTitle } = useAppSelector(selectSelectedRecipe);
    const categories = useAppSelector(selectCategories);

    const { secondItemPath, thirdItemPath } = usePathItems();

    const isJuiciest = secondItemPath === THE_JUICIEST;

    const firstSubcategoryPath = categories.find(({ category }) => category === secondItemPath)
        ?.subCategories[0].category;

    const secondItemName =
        secondItemPath && secondItemPath === THE_JUICIEST
            ? THE_JUICIEST_TITLE
            : categories.find(({ category }) => category === secondItemPath)?.title;

    const thirdItemName =
        thirdItemPath &&
        categories
            .find(({ category }) => category === secondItemPath)
            ?.subCategories.find(({ category }) => category === thirdItemPath)?.title;

    return (
        <Breadcrumb
            separator={<ChevronRightIcon />}
            px={{ base: 5, lg: 32 }}
            pt={{ base: 4, lg: 0 }}
            listProps={{
                flexWrap: 'wrap',
            }}
            onClick={() => dispatch(closeBurgerMenu())}
            data-test-id={DATA_TEST_ID.breadcrumbs}
        >
            <BreadcrumbItem color={secondItemPath ? COLORS_BLACK_ALPHA[700] : COLORS.inherit}>
                <BreadcrumbLink as={NavLink} to={ROUTER_PATHS.homePage}>
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>

            {secondItemPath && (
                <BreadcrumbItem>
                    <BreadcrumbLink
                        as={NavLink}
                        to={
                            isJuiciest
                                ? ROUTER_PATHS.juiciestPage
                                : `/${secondItemPath}/${firstSubcategoryPath}`
                        }
                        color={thirdItemPath ? COLORS_BLACK_ALPHA[700] : COLORS.inherit}
                    >
                        {secondItemName}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {thirdItemPath && (
                <BreadcrumbItem
                    color={selectedRecipeTitle ? COLORS_BLACK_ALPHA[700] : COLORS.inherit}
                >
                    <BreadcrumbLink as={NavLink} to={`/${secondItemPath}/${thirdItemPath}`}>
                        {thirdItemName}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
            {selectedRecipeTitle && (
                <BreadcrumbItem>
                    <BreadcrumbLink>{selectedRecipeTitle}</BreadcrumbLink>
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    );
};
