export type MessageType = {
  resultLabel: string,
  title: string,
  message: string,
  buttonLink: string,
  buttonText: string,
}

export type MessageResponse = {
  error: string,
  message: string,
  statusCode: number
}