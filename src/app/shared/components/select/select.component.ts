import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less']
})
export class SelectComponent implements OnInit {
  @Input() data;
  @Input() selectedData;
  @Output() selectedDataChange = new EventEmitter();

  placeholder$;
  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.placeholder$ = this.translateService.stream('listPlaceHolder');
  }

  onChange(event) {
    this.selectedDataChange.emit(event);
  }
}
