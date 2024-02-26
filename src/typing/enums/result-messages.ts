export enum AuthMessage {
  status = 'warning',
  title = 'Вход не выполнен',
  subTitle = 'Что-то пошло не так. Попробуйте ещё раз',
  buttonText = 'Повторить'
}

export enum RegistrationMessageSuccess {
  status = 'success',
  title = 'Регистрация успешна',
  subTitle = 'Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.',
  buttonText = 'Войти',
}

export enum RegistrationMessageEmailExists {
  status = 'error',
  title = 'Данные не сохранились',
  subTitle = 'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.',
  buttonText = 'Назад к регистрации',
}

export enum RegistrationMessageError {
  status = 'error',
  title = 'Данные не сохранились',
  subTitle = 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.',
  buttonText = 'Повторить',
}

export enum ChangePasswordEmailExist {
  status = 'error',
  title = 'Такой e-mail не зарегистрирован',
  subTitle = 'Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.',
  buttonText = 'Попробовать снова'
}

export enum ChangePasswordSomethingGoesWrong {
  status = '500',
  title = 'Что-то пошло не так',
  subTitle = 'Произошла ошибка, попробуйте отправить форму ещё раз.',
  buttonText = 'Назад'
}

export enum ChangePasswordSuccessMessage {
  status = 'success',
  title = 'Пароль успешно изменен',
  subTitle = 'Теперь можно войти в аккаунт, используя свой логин и новый пароль',
  buttonText = 'Вход',
}

export enum ChangePasswordErrorMessage {
  status = 'error',
  title = 'Данные не сохранились',
  subTitle = 'Что-то пошло не так. Попробуйте ещё раз',
  buttonText = 'Повторить',
}