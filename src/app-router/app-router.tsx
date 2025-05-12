import { createBrowserRouter } from 'react-router';

import { anyRoute } from './routes/any-route';
import { authPage } from './routes/auth';
import { rootPage } from './routes/root';

export const AppRouter = createBrowserRouter([rootPage, authPage, anyRoute]);
