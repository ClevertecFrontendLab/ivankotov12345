import { Navigate, useParams } from 'react-router';

import { ROUTER_PATHS } from '~/constants/router-paths';
import { useAppSelector } from '~/store/hooks';
import { selectCategories, selectSubCategories } from '~/store/slices/category-slice';

export const CategoriesGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { category, subcategory } = useParams();

    const categories = useAppSelector(selectCategories);
    const subCategories = useAppSelector(selectSubCategories);

    if (!category || !subcategory) return null;

    const categoryEsists = categories.map(({ category }) => category).includes(category);
    const subcategoryExists = subCategories.map(({ category }) => category).includes(subcategory);

    if (categoryEsists && subcategoryExists) return <>{children}</>;

    return <Navigate to={ROUTER_PATHS.notFound} replace={true} />;
};
