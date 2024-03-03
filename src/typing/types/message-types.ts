import { ResultStatusType } from 'antd/lib/result';

export type MessageType = {
  status: ResultStatusType,
  title: string,
  subTitle?: string,
  buttonLink?: string,
  buttonText: string,
  retry?: boolean,
}

export type MessageResponse = {
  error: string,
  message: string,
  statusCode: number
}