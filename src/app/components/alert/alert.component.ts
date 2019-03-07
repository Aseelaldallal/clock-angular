import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() type: 'SUCCESS' | 'FAIL' = 'SUCCESS';

  @Output() closed = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.closed.emit(true);
  }

}
