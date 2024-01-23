type FieldError<Data> = Partial<Record<keyof Data, string>>;

interface ExceptionDetails<Data> {
  fieldErrors?: FieldError<Data>[];
  nonFieldErrors?: string[];
}

type ExceptionStatus = number;

export type Exception<Data> = {
  status: ExceptionStatus;
  details: ExceptionDetails<Data>;
};
