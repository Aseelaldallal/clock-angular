import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from '../../../services/api.service';
import ILog from '../../../interfaces';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-clock-page',
  templateUrl: './clock-page.component.html',
  styleUrls: ['./clock-page.component.css']
})
export class ClockPageComponent implements OnInit, OnDestroy {

  model: ILog = {
      name: '',
      type: '',
      date: ''
  };

  types = ['Clock In', 'Clock Out'];

  loading = false;

  logCreated = false;
  logCreatedMessage = '';
  logCreatedSubscription: Subscription;

  constructor(private apiService: ApiService) {
    this.logCreatedSubscription = this.apiService.logsCreatedSubject.subscribe((log) => {
        this.loading = false;
        this.logCreated = true;
        if (log.type === 'Clock In') {
            this.logCreatedMessage = 'Clocked you in';
        } else {
            this.logCreatedMessage = 'Clocked you out';
        }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
      this.logCreatedSubscription.unsubscribe();
  }

  public onSubmit(form: NgForm) {
      this.loading = true;
      this.model.date = moment().format('MMMM Do YYYY, h:mm:ss a');
      this.apiService.createLog(this.model);
      this.resetForm(form);
  }

  public closeAlert() {
    this.logCreated = false;
    this.logCreatedMessage = '';
  }

  private resetForm(form: NgForm) {
    form.reset();
    this.model.date = '';
  }

}
