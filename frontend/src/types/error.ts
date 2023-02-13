export interface IAPIError {
  error: {
    data: {
      msg: string;
    };
    status: number;
  };
}
