import { Route, Routes } from 'react-router-dom';
import { AppLayout } from '@components/app-layout';
import { AuthForm } from '@components/auth-form';
import { AuthLayout } from '@components/auth-layout';
import { RequireAuth } from '@components/require-auth';
import { ChangePasswordPage } from '@pages/change-password-page';
import {
  AuthPage,
  CalendarPage,
  ConfirmEmail,
  FeedbacksPage,
  MainPage,
  MessagePage,
  PageNotFound,
  ProfilePage,
  RegisterPage, 
  SettingsPage } from '@pages/index';
import { Paths } from '@typing/enums/paths';


export const routes = (
  <Routes>
    <Route path={Paths.HOME} element={<RequireAuth />}>
      <Route element={<AppLayout />} >
        <Route index={true} path={Paths.MAIN} element={<MainPage />} />
        <Route index={true} path={Paths.FEEDBACKS} element={<FeedbacksPage />} />
        <Route index={true} path={Paths.CALENDAR} element={<CalendarPage />} />
        <Route index={true} path={Paths.PROFILE} element={<ProfilePage />} />
        <Route index={true} path={Paths.SETTINGS} element={<SettingsPage />} />
        <Route index={true} path='*' element={<PageNotFound />} />
      </Route>
    </Route>

    <Route element={<AuthLayout />}>
      <Route element={<AuthForm />}>
        <Route index={true} path={Paths.AUTH} element={<AuthPage />} />
        <Route index={true} path={`${Paths.AUTH}${Paths.REGISTRATION}`} element={<RegisterPage />} />
      </Route>
      <Route path={`${Paths.RESULT}/:status`} element={<MessagePage />} />
      <Route index={true} path={`${Paths.AUTH}${Paths.CONFIRM_EMAIL}`} element={<ConfirmEmail />} />
      <Route index={true} path={`${Paths.AUTH}${Paths.CHANGE_PASSWORD}`} element={<ChangePasswordPage />} />
    </Route>
  </Routes>
)