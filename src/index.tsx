import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter } from "redux-first-history/rr6";

import { routes } from './routes';
import { history, store } from '@redux/configure-store';
import { MainPage } from './pages';
import { AppLayout } from '@components/app-layout';

import { store } from '@redux/configure-store';

import 'antd/dist/antd.css';
import 'normalize.css';
import './index.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={history}>
        { routes }
      </HistoryRouter>
      <HashRouter>
        <Routes>
          <Route path='/' element={<AppLayout />}>
          <Route path='/' element={<MainPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
);
