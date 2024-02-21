import { Route, Routes } from "react-router-dom";

import { AppLayout } from "@components/app-layout";
import { MainPage } from "@pages/main-page";
import { RequireAuth } from "@components/require-auth";
import { AuthLayout } from "@components/auth-layout";
import { AuthForm } from "@components/auth-form";
import { AuthPage } from "@pages/auth-page";
import { RegisterPage } from "@pages/register-page";
import { MessagePage } from "@pages/message-page";
import { Paths } from "@typing/enums/paths";

export const routes = (
  <Routes>
    <Route path={Paths.HOME} element={<RequireAuth />}>
      <Route element={<AppLayout />}>
        <Route index path={Paths.MAIN} element={<MainPage />} />
      </Route>
    </Route>

    <Route element={<AuthLayout />}>
      <Route element={<AuthForm />}>
        <Route index path={Paths.AUTH} element={<AuthPage />} />
        <Route index path={`${Paths.AUTH}${Paths.REGISTRATION}`} element={<RegisterPage />} />
      </Route>
      <Route path={`${Paths.RESULT}/:status`} element={<MessagePage />} />
    </Route>
  </Routes>
)