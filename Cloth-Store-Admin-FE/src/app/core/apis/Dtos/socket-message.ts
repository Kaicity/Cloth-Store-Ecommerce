export interface SocketMessage<T> {
  message: string;
  idSocket: string;
  data: T;
}
