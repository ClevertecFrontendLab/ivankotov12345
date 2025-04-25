import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router';

import { NAV_MENU_ITEMS } from '~/constants/nav-menu';
import { ROUTER_PATHS } from '~/constants/router-paths';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { closeBurgerMenu } from '~/store/slices/burger-slice';
import { selectSelectedRecipe } from '~/store/slices/selected-recipe-slice';

export const Breadcrumbs: React.FC = () => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const { selectedRecipe } = useAppSelector(selectSelectedRecipe);

    const [secondItemPath, thirdItemPath] = pathname.split('/').filter(Boolean);

    const firstSubcategoryPath = NAV_MENU_ITEMS.find(({ path }) => path === secondItemPath)
        ?.subcategories[0].path;

    const secondItemName =
        secondItemPath && secondItemPath === 'the-juiciest'
            ? 'Самое сочное'
            : NAV_MENU_ITEMS.find(({ path }) => path === secondItemPath)?.category;

    const thirdItemName =
        thirdItemPath &&
        NAV_MENU_ITEMS.find(({ path }) => path === secondItemPath)?.subcategories.find(
            ({ path }) => path === thirdItemPath,
        )?.category;

    return (
        <Breadcrumb
            separator={<ChevronRightIcon />}
            px={{ base: 5, lg: 32 }}
            pt={{ base: 4, lg: 0 }}
            listProps={{
                flexWrap: 'wrap',
            }}
            onClick={() => dispatch(closeBurgerMenu())}
            data-test-id='breadcrumbs'
        >
            <BreadcrumbItem color={secondItemPath ? 'blackAlpha.700' : 'inherit'}>
                <BreadcrumbLink as={NavLink} to={ROUTER_PATHS.homePage}>
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>

            {secondItemPath && (
                <BreadcrumbItem>
                    <BreadcrumbLink
                        as={NavLink}
                        to={`/${secondItemPath}/${firstSubcategoryPath}`}
                        color={thirdItemPath ? 'blackAlpha.700' : 'inherit'}
                    >
                        {secondItemName}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {thirdItemPath && (
                <BreadcrumbItem>
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
