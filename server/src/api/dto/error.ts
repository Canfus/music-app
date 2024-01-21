type FieldError = Record<string, string>;

export interface Error {
  status: number;
  message: {
    fieldErrors: FieldError[];
    customError?: string;
  };
}
