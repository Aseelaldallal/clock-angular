import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import ILog from 'src/app/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-logs-page',
  templateUrl: './logs-page.component.html',
  styleUrls: ['./logs-page.component.css']
})
export class LogsPageComponent implements OnInit, OnDestroy {

    loading = true;

    logs: ILog[] = [];
    logsRecievedSubscription: Subscription;

    constructor(private apiService: ApiService) {
        this.apiService.getLogs();
        this.logsRecievedSubscription = this.apiService.logsRecievedSubject.subscribe((logs) => {
            this.logs = logs;
            this.loading = false;
        });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.logsRecievedSubscription.unsubscribe();
    }

}
