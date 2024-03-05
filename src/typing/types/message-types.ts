import { ResultStatusType } from 'antd/lib/result';

export type MessageType = {
  status: ResultStatusType,
  title: string,
  subTitle?: string,
  buttonLink: string,
  buttonText: string,
  retry?: boolean,
}

export type MessageFeedbackType = {
  status: ResultStatusType,
  title: string,
  subTitle: string,
  buttonTextWriteMessage: string,
  buttonTextClose: string,
}

export type MessageResponse = {
  error: string,
  message: string,
  statusCode: number
}