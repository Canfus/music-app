import {
  ExceptionConstructor,
  ExceptionStatus,
  ExceptionDetails,
} from './error.interface';

export class Exception<Data extends object>
  implements ExceptionConstructor<Data>
{
  status: ExceptionStatus = 0;
  details: ExceptionDetails<Data> = {};

  constructor(data: ExceptionConstructor<Data>) {
    this.status = data.status as ExceptionStatus;
    this.details = data.details as ExceptionDetails<Data>;
  }
}
