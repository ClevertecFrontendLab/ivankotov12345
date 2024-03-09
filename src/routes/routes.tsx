import { Route, Routes } from 'react-router-dom';

import {
  MainPage,
  AuthPage,
  RegisterPage,
  MessagePage,
  ConfirmEmail,
  FeedbacksPage,
  CalendarPage
 } from '@pages/index';
import { AppLayout } from '@components/app-layout';
import { RequireAuth } from '@components/require-auth';
import { AuthLayout } from '@components/auth-layout';
import { AuthForm } from '@components/auth-form';
import { Paths } from '@typing/enums/paths';
import { ChangePasswordPage } from '@pages/change-password-page';


export const routes = (
  <Routes>
    <Route path={Paths.HOME} element={<RequireAuth />}>
      <Route element={<AppLayout />} >
        <Route index path={Paths.MAIN} element={<MainPage />} />
        <Route index path={Paths.FEEDBACKS} element={<FeedbacksPage />} />
        <Route index path={Paths.CALENDAR} element={<CalendarPage />} />
      </Route>
    </Route>

    <Route element={<AuthLayout />}>
      <Route element={<AuthForm />}>
        <Route index path={Paths.AUTH} element={<AuthPage />} />
        <Route index path={`${Paths.AUTH}${Paths.REGISTRATION}`} element={<RegisterPage />} />
      </Route>
      <Route path={`${Paths.RESULT}/:status`} element={<MessagePage />} />
      <Route index path={`${Paths.AUTH}${Paths.CONFIRM_EMAIL}`} element={<ConfirmEmail />} />
      <Route index path={`${Paths.AUTH}${Paths.CHANGE_PASSWORD}`} element={<ChangePasswordPage />} />
    </Route>
  </Routes>
)