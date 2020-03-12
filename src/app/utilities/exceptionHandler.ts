import {ToastrService} from 'ngx-toastr';
import {DefaultResponse} from '../models/default';

export class ExceptionHandler {
  constructor(private ts: ToastrService) {
  }

  public checkResult(response: DefaultResponse): object {


    switch (response.statusCode) {
      case 200:
        this.ts.success(response.message, response.message);
        break;
      case 201:
        this.ts.success(response.message, response.responseBody.toString());
        break;
      default:
        this.ts.error(response.message, response.statusCode.toString());
    }

    return response.responseBody;
  }

}
