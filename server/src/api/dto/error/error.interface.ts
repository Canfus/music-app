export type FieldError<Data> = Partial<Record<keyof Data, string>>;

export interface ExceptionDetails<Data> {
  fieldErrors?: FieldError<Data>[];
  nonFieldErrors?: string[];
}

export type ExceptionStatus = number;

export type ExceptionConstructor<Data> = {
  status: ExceptionStatus;
  details: ExceptionDetails<Data>;
};
