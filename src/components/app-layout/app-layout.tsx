import { lazy, Suspense } from 'react';

import { Loader } from '../loader';

const Layout = lazy(() =>
    import('~/components/layout/layout.tsx').then((module) => ({
        default: module.Layout,
    })),
);

export const AppLayout = () => (
    <Suspense fallback={<Loader isLoading={true} />}>
        <Layout />
    </Suspense>
);
