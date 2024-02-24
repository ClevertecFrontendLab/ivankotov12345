export enum AuthMessages {
  authErrorHeader = 'Вход не выполнен',
  somethingGoesWrong = 'Что-то пошло не так. Попробуйте ещё раз',
  authButtontext = 'Повторить'
}

export enum RegistrationMessages {
  registrationErrorHeader = 'Данные не сохранились',
  registrationSuccessHeader = 'Регистрация успешна',
  registrationSuccess = 'Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.',
  registrationSuccessButton = 'Войти',
  registrationErrorEmailExists = 'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.',
  registrationSomethingGoesWrong = 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.',
  registrationErrorButton = 'Назад к регистрации',
  registrationErrorButtonTryAgain = 'Повторить',
}

export enum ChangePasswordEmailExist {
  title = 'Такой e-mail не зарегистрирован',
  text = 'Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.',
  buttonText = 'Попробовать снова'
}

export enum ChangePasswordSomethingGoesWrong {
  title = 'Что-то пошло не так',
  text = 'Произошла ошибка, попробуйте отправить форму ещё раз.',
  buttonText = 'Назад'
}

export enum ChangePasswordSuccessMessage {
  title = 'Пароль успешно изменен',
  text = 'Теперь можно войти в аккаунт, используя свой логин и новый пароль',
  buttonText = 'Вход',
}