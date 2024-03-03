export type FormInputValues = {
  email: string,
  password: string,
}

export type FormRecoveryInputEmail = {
  email: string,
}

export type FormRecoveryInputValues = {
  password: string,
  confirmPassword: string,
}

export type FromRecoveryConfirmEmail = {
  email: string,
  code: string,
}

export type FeedbackValues = {
  message: string,
  rating: number,
}