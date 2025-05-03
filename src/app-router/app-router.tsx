import { createBrowserRouter } from 'react-router';

import { anyRoute } from './routes/any-route';
import { rootPage } from './routes/root';

export const AppRouter = createBrowserRouter([rootPage, anyRoute]);
