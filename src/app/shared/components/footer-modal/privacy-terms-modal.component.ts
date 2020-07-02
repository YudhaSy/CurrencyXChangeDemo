import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-privacy-modal',
  templateUrl: './privacy-terms-modal.component.html'
})
export class PrivacyTermsModalComponent implements OnInit {
  closeBtnName: string;
  title: string;
  dataType: string;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

}
