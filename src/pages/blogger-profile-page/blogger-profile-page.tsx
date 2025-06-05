import React from 'react';
import { useParams } from 'react-router';

import { useGetBloggerByIdQuery } from '~/query/services/blogs';
import { useAppSelector } from '~/store/hooks';
import { selectUserId } from '~/store/slices/app-slice';

import { BloggerCard } from './components/blogger-card';

export const BloggerProfilePage: React.FC = () => {
    const { bloggerId } = useParams();
    const userId = useAppSelector(selectUserId);

    const { data: bloggerInfo } = useGetBloggerByIdQuery({
        bloggerId: bloggerId || '',
        currentUserId: userId || '',
    });

    return <>{bloggerInfo && <BloggerCard {...bloggerInfo} />}</>;
};
