
import {AlertService} from "../modals/alert/alert.service";

export class ExceptionHandler {
  constructor(private ts: AlertService) {
  }

  public checkResult(response): object {

    switch (response.statusCode) {
      case 200:
        this.ts.show({title: `Success`, description: response.message, style: 'success'});
        break;
      case 201:
        this.ts.show({title: `Success`, description: response.message + ' ' +
            response.responseBody.toString(), style: 'success'});
        break;
      default:
        this.ts.show({title: `Error ${response.statusCode}`, description: response.message, style: 'error'});
    }

    return response.responseBody;
  }



}
