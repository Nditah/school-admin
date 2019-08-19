import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as printJS from 'print-js';

export interface ReceiptObject {
  receiptType: ReceiptType;
  dateIssued: Date;
  passengerName: string;
  passengerGender: string;
  route: string;
  seatQuantity: number;
  seatPosition?: string;
  vehicleNumber: string;
  receiptRefNumber: string;
  transportFee?: number;
  totalPayout?: number;
  tax?: number;
}

export enum ReceiptType {
  INVOICE = 'Invoice',
  SLIP = 'Slip',
}

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.scss']
})

export class ReceiptsComponent implements OnInit {

  @ViewChild('invoicePrintArea')  printArea: ElementRef;
   show = false;
   data: ReceiptObject = {
    dateIssued: new Date(),
    passengerGender: '',
    passengerName: '',
    receiptRefNumber: '',
    receiptType: ReceiptType.SLIP,
    route: 'From => To',
    seatQuantity: 0,
    vehicleNumber: 'xxxxxx',
  };

  constructor() { }

  ngOnInit() {
  }

  getRoute(route: string, dir: string = 'from'): string {
    const routes = route.split('=>').map((r: string) => r.trim());
    if (dir === 'from') {
      return routes[0];
    } else if (dir === 'to') {
      return routes[1];
    }
    return (`From: ${routes[0]}, To: ${routes[1]}`);
  }

  print(data: ReceiptObject): void {
    this.data = data;
    this.show = true;
    setTimeout(
      () => {
        printJS({printable: this.printArea.nativeElement.outerHTML, type: 'raw-html'});
        this.show = false;
      }, 0
    );
  }

}
