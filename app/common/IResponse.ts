export interface ISuccess {
  message: string;
  data: object | Array<object>;
  status: string;
}

export interface IError {
  message: string;
  status: string;
}
