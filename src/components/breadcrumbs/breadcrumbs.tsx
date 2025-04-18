import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router';

import { NAV_MENU_ITEMS } from '~/constants/nav-menu';
import { ROUTER_PATHS } from '~/constants/router-paths';

type BreadcrumbProps = {
    off?: () => void;
};

export const Breadcrumbs: React.FC<BreadcrumbProps> = ({ off }) => {
    const { pathname } = useLocation();

    const [secondItemPath, thirdItemPath] = pathname.split('/').filter(Boolean);

    const secondItemName =
        secondItemPath && secondItemPath === 'juiciest'
            ? 'Самое сочное'
            : NAV_MENU_ITEMS.find(({ path }) => path === `/${secondItemPath}`)?.category;

    const thirdItemName =
        thirdItemPath &&
        NAV_MENU_ITEMS.find(({ path }) => path === `/${secondItemPath}`)?.subcategories.find(
            ({ path }) => path === `/${thirdItemPath}`,
        )?.category;
    return (
        <Breadcrumb
            separator={<ChevronRightIcon />}
            px={{ base: 5, lg: 0 }}
            pt={{ base: 4, lg: 0 }}
            listProps={{
                flexWrap: 'wrap',
            }}
            onClick={off}
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
