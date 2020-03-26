import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ListTypes} from '../../utilities/constants';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  @Input() caption: string;
  @Input() displayedColumns = ['key'];
  @Input() displayedHeaders = ['key'];
  @Input() dataForTable = [];
  @Input() currentList = ListTypes.Org;
  sortOrder = false;
  @Input() hasButtons = false;
  @Output() fieldIdFound: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {


  }

  ngAfterViewInit(): void {
    if (this.dataForTable[0] !== undefined) {
      this.displayedColumns = Object.keys(this.dataForTable[0]);
    }
  }


  buildOther(data: any, col: string[]) {
    if (col.length > 2) {
      return data[col[0]][0][col[2]];
    }
    return data[col[0]][col[1]];
  }

  showHeader(col: string) {
    // we split the string, join it with space then capitalize the first letter of each word
    return col.split(/(?=[A-Z])/).join(' ').replace(/\b\w/g, v => v.toUpperCase());
  }


  fieldId(data) {
    this.fieldIdFound.emit(data);
  }
}
