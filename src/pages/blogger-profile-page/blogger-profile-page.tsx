import { useState } from 'react';
import { useParams } from 'react-router';

import { CardsWrapper } from '~/components/cards-wrapper';
import { FoodCard } from '~/components/food-card';
import { LoadMoreButton } from '~/components/load-more-button';
import { useGetBloggerActivityQuery, useGetBloggerByIdQuery } from '~/query/services/blogs';
import { useAppSelector } from '~/store/hooks';
import { selectUserId } from '~/store/slices/app-slice';

import { BloggerCard } from './components/blogger-card';

export const BloggerProfilePage: React.FC = () => {
    const { bloggerId } = useParams();
    const userId = useAppSelector(selectUserId);

    const [collapsed, setCollapsed] = useState(false);

    const { data: bloggerInfo } = useGetBloggerByIdQuery({
        bloggerId: bloggerId,
        currentUserId: userId,
    });

    const { data: bloggerActivity, isFetching } = useGetBloggerActivityQuery(bloggerId);

    const displayedRecipes = collapsed
        ? bloggerActivity?.recipes || []
        : (bloggerActivity?.recipes || []).slice(0, 8);

    const onLoadMoreClick = () => setCollapsed(!collapsed);

    console.log(bloggerActivity?.recipes);

    return (
        <>
            {bloggerInfo && <BloggerCard {...bloggerInfo} />}
            <CardsWrapper>
                {displayedRecipes.length > 0 &&
                    displayedRecipes.map((recipe) => <FoodCard {...recipe} />)}
            </CardsWrapper>

            {!collapsed && (
                <LoadMoreButton onLoadMoreClick={onLoadMoreClick} isLoading={isFetching} />
            )}
        </>
    );
};
