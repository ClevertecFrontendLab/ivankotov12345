import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate,Route, Routes } from 'react-router-dom';

import { Contract } from './components/contract/contract';
import { Layout } from './components/layout/layout';
import { LayoutMainPage } from './components/layout-main-page/layout-main-page';
import { Terms } from './components/terms/terms';
import { BookPage } from './pages/book';
import { MainPage } from './pages/main';
import { store } from './store';

import './index.css';




const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route element={<LayoutMainPage />}>
            <Route path='/' element={<Navigate to='/books/all'/>} />
            <Route path='/books/:category' element={<MainPage/>} />
            <Route path='/contract' element={<Contract />} />
            <Route path='/terms' element={<Terms />} />
          </Route>
          <Route path='/books/:category/:bookId' element={<BookPage />} />
        </Route>
      </Routes>
    </HashRouter>
    </Provider>
);
