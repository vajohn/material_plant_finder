import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {BuyModel} from '../../models/buy';
import BuyResponseBody = BuyModel.BuyResponseBody;
import {LoginService} from '../../services/login.service';
import {UsersListResponseBody} from '../../models/users';
import { toFourFromCents} from '../../utilities/reusables';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {
  public agent: UsersListResponseBody;

  constructor(
    public dialogRef: MatDialogRef<ReceiptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BuyResponseBody,
    private loginService: LoginService
  ) {
  }

  ngOnInit(): void {
    this.loginService.currentInfoUser.subscribe(d => this.agent = d.userInfo);
  }

  convert(fcaAmount: number) {
    return toFourFromCents(fcaAmount);
  }
}
