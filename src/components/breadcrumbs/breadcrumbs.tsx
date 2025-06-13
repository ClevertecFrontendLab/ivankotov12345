import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { NavLink, useLocation, useParams } from 'react-router';

import { ROUTER_PATHS } from '~/constants/router-paths';
import { COLORS, COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { DATA_TEST_ID } from '~/constants/test-id';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectSelectedBlogger } from '~/store/slices/blogs-slice';
import { closeBurgerMenu } from '~/store/slices/burger-slice';
import { selectCategories } from '~/store/slices/category-slice';
import { selectSelectedRecipe } from '~/store/slices/selected-recipe-slice';

const THE_JUICIEST = 'the-juiciest';
const NEW_RECIPE = 'new-recipe';
const BLOGS = 'blogs';

export const Breadcrumbs: React.FC = () => {
    const dispatch = useAppDispatch();
    const { selectedRecipeTitle } = useAppSelector(selectSelectedRecipe);
    const categories = useAppSelector(selectCategories);
    const selectedBlogger = useAppSelector(selectSelectedBlogger);

    const { category, subcategory } = useParams();
    const { pathname } = useLocation();

    const isJuiciest = pathname.includes(THE_JUICIEST);
    const isNewRecipe = pathname.includes(NEW_RECIPE);
    const isBlogsPage = pathname.includes(BLOGS);

    const firstSubcategoryPath = categories.find((item) => item.category === category)
        ?.subCategories[0].category;

    const categoryName = categories.find((item) => item.category === category)?.title;

    const subCategoryName = categories
        .find((item) => item.category === category)
        ?.subCategories.find((item) => item.category === subcategory)?.title;

    const selectedBloggerItemText =
        selectedBlogger &&
        `${selectedBlogger.firstName} ${selectedBlogger.lastName} (${selectedBlogger.login})`;

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
            <BreadcrumbItem
                color={category || selectedBlogger ? COLORS_BLACK_ALPHA[700] : COLORS.inherit}
            >
                <BreadcrumbLink as={NavLink} to={ROUTER_PATHS.homePage}>
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>

            {isJuiciest && (
                <BreadcrumbItem color={COLORS_BLACK_ALPHA[700]}>
                    <BreadcrumbLink as={NavLink} to={ROUTER_PATHS.juiciestPage}>
                        Самое сочное
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {isNewRecipe && (
                <BreadcrumbItem color={COLORS_BLACK_ALPHA[700]}>
                    <BreadcrumbLink as={NavLink} to={ROUTER_PATHS.newRecipe}>
                        Новый рецепт
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {isBlogsPage && (
                <BreadcrumbItem
                    color={COLORS_BLACK_ALPHA[700]}
                    data-test-id={DATA_TEST_ID.bloggerUserBreadcrumbName}
                >
                    <BreadcrumbLink as={NavLink} to={ROUTER_PATHS.blogs}>
                        Блоги
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {category && (
                <BreadcrumbItem>
                    <BreadcrumbLink
                        as={NavLink}
                        to={`/${category}/${firstSubcategoryPath}`}
                        color={subcategory ? COLORS_BLACK_ALPHA[700] : COLORS.inherit}
                    >
                        {categoryName}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {subcategory && (
                <BreadcrumbItem
                    color={selectedRecipeTitle ? COLORS_BLACK_ALPHA[700] : COLORS.inherit}
                >
                    <BreadcrumbLink as={NavLink} to={`/${category}/${subcategory}`}>
                        {subCategoryName}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {selectedRecipeTitle && (
                <BreadcrumbItem>
                    <BreadcrumbLink>{selectedRecipeTitle}</BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {selectedBlogger && (
                <BreadcrumbItem data-test-id={DATA_TEST_ID.bloggerUserBreadcrumbSection}>
                    <BreadcrumbLink>{selectedBloggerItemText}</BreadcrumbLink>
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    );
};
