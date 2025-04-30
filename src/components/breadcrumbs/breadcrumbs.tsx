import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { NavLink } from 'react-router';

import { COLORS, COLORS_BLACK_ALPHA } from '~/constants/colors';
import { ROUTER_PATHS } from '~/constants/router-paths';
import { DATA_TEST_ID } from '~/constants/test-id';
import { usePathItems } from '~/hooks/use-path-items';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { closeBurgerMenu } from '~/store/slices/burger-slice';
import { selectCategory } from '~/store/slices/category-slice';
import { selectSelectedRecipe } from '~/store/slices/selected-recipe-slice';

export const Breadcrumbs: React.FC = () => {
    const dispatch = useAppDispatch();
    const { selectedRecipe } = useAppSelector(selectSelectedRecipe);
    const { categories } = useAppSelector(selectCategory);

    const { secondItemPath, thirdItemPath } = usePathItems();

    const firstSubcategoryPath = categories.find(({ category }) => category === secondItemPath)
        ?.subCategories[0].category;

    const secondItemName =
        secondItemPath && secondItemPath === 'the-juiciest'
            ? 'Самое сочное'
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
                        to={`/${secondItemPath}/${firstSubcategoryPath}`}
                        color={thirdItemPath ? COLORS_BLACK_ALPHA[700] : COLORS.inherit}
                    >
                        {secondItemName}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {thirdItemPath && (
                <BreadcrumbItem color={selectedRecipe ? COLORS_BLACK_ALPHA[700] : COLORS.inherit}>
                    <BreadcrumbLink as={NavLink} to={`/${secondItemPath}/${thirdItemPath}`}>
                        {thirdItemName}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
            {selectedRecipe && (
                <BreadcrumbItem>
                    <BreadcrumbLink>{selectedRecipe.title}</BreadcrumbLink>
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    );
};
