import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router';

import { NAV_MENU_ITEMS } from '~/constants/nav-menu';
import { ROUTER_PATHS } from '~/constants/router-paths';

export const Breadcrumbs: React.FC = () => {
    const { pathname } = useLocation();

    const [secondItemPath, thirdItemPath] = pathname.split('/').filter(Boolean);

    const secondItemName =
        secondItemPath && secondItemPath === 'juiciest'
            ? 'Самое сочное'
            : NAV_MENU_ITEMS.find(({ path }) => path === `/${secondItemPath}`)?.category;

    const thirdItemName =
        thirdItemPath &&
        NAV_MENU_ITEMS.find(({ path }) => path === `/${secondItemPath}`)?.subCategories.find(
            ({ path }) => path === `/${thirdItemPath}`,
        )?.category;
    return (
        <Breadcrumb separator={<ChevronRightIcon />} display={{ base: 'none', lg: 'block' }}>
            <BreadcrumbItem color={secondItemPath ? 'blackAlpha.700' : 'inherit'}>
                <BreadcrumbLink as={NavLink} to={ROUTER_PATHS.homePage}>
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>

            {secondItemPath && (
                <BreadcrumbItem>
                    <BreadcrumbLink
                        as={NavLink}
                        to={`/${secondItemPath}`}
                        color={thirdItemPath ? 'blackAlpha.700' : 'inherit'}
                    >
                        {secondItemName}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {thirdItemPath && (
                <BreadcrumbItem>
                    <BreadcrumbLink as={NavLink} to={`/${thirdItemPath}`}>
                        {thirdItemName}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    );
};
