import { ChakraProvider } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import { store } from '~/store/configure-store.ts';

import { AppRouter } from './app-router';
import { theme } from './theme/theme';

createRoot(document.getElementById('root')!).render(
    <ChakraProvider theme={theme}>
        <Provider store={store}>
            <RouterProvider router={AppRouter} />
        </Provider>
    </ChakraProvider>,
);
