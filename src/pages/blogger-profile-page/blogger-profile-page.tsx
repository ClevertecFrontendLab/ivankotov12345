import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router';

import { CardsWrapper } from '~/components/cards-wrapper';
import { FoodCard } from '~/components/food-card';
import { LoadMoreButton } from '~/components/load-more-button';
import { Loader } from '~/components/loader';
import { ROUTER_PATHS } from '~/constants/router-paths';
import { RESPONSE_STATUS } from '~/constants/statuses';
import { DATA_TEST_ID } from '~/constants/test-id';
import { useGetBloggerActivityQuery, useGetBloggerByIdQuery } from '~/query/services/blogs';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectUserId } from '~/store/slices/app-slice';
import { setSelectedBlogger } from '~/store/slices/blogs-slice';

import { BloggerCard } from './components/blogger-card';
import { NotesSection } from './components/notes-section';
import { OtherSection } from './components/others-section';

const INITIAL_RECIPES = 8;

export const BloggerProfilePage: React.FC = () => {
    const { bloggerId } = useParams();
    const userId = useAppSelector(selectUserId);
    const dispatch = useAppDispatch();

    const [collapsed, setCollapsed] = useState(false);

    const {
        data: bloggerData,
        error: bloggerError,
        isLoading,
    } = useGetBloggerByIdQuery({
        bloggerId: bloggerId,
        currentUserId: userId,
    });

    const {
        data: bloggerActivity,
        isFetching,
        error: bloggerActivitiesError,
    } = useGetBloggerActivityQuery(bloggerId);

    const displayedRecipes = collapsed
        ? bloggerActivity?.recipes || []
        : (bloggerActivity?.recipes || []).slice(0, INITIAL_RECIPES);

    const onLoadMoreClick = () => setCollapsed(!collapsed);

    const error = bloggerActivitiesError || bloggerError;

    useEffect(
        () => () => {
            dispatch(setSelectedBlogger(null));
        },
        [dispatch],
    );

    useEffect(() => {
        if (bloggerData) {
            dispatch(setSelectedBlogger(bloggerData.bloggerInfo));
        }
    }, [bloggerData, dispatch]);

    if (error) {
        const isNotFoundError =
            'status' in error &&
            typeof error.status === 'number' &&
            error.status === RESPONSE_STATUS.NOT_FOUND;

        return <Navigate to={isNotFoundError ? ROUTER_PATHS.notFound : ROUTER_PATHS.homePage} />;
    }

    return (
        <>
            {bloggerData && <BloggerCard {...bloggerData} />}

            <Box as='section' mb={{ base: 8, lg: 10 }}>
                <CardsWrapper testId={DATA_TEST_ID.recipeCardList}>
                    {displayedRecipes.length > 0 &&
                        displayedRecipes.map((recipe) => <FoodCard key={recipe._id} {...recipe} />)}
                </CardsWrapper>
            </Box>

            {!collapsed &&
                bloggerActivity?.recipes &&
                bloggerActivity.recipes.length > INITIAL_RECIPES && (
                    <LoadMoreButton onLoadMoreClick={onLoadMoreClick} isLoading={isFetching} />
                )}

            {bloggerActivity?.notes && bloggerActivity.notes.length > 0 && (
                <NotesSection bloggerNotes={bloggerActivity.notes} />
            )}

            <OtherSection />

            {isLoading && <Loader isLoading={true} />}
        </>
    );
};
