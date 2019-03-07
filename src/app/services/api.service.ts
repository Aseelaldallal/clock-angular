import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Subject } from 'rxjs';
import ILog from '../interfaces';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    logsRecievedSubject = new Subject<ILog[]>();
    logsCreatedSubject = new Subject<ILog>();
    errorSubject = new Subject<string>();

    constructor(private httpClient: HttpClient) {}

    public getLogs() {
        this.httpClient
            .get<ILog[]>(`getLogs`)
            .pipe(
                retry(3),
                catchError(this.handleError.bind(this))
            )
            .subscribe((response) => {

                this.logsRecievedSubject.next(response);
            });
    }

    public createLog(log: ILog) {
        console.log('Will Create', log);
        this.httpClient
            .post<ILog>('createLog', log)
            .pipe(
                retry(3),
                catchError(this.handleError.bind(this))
            )
            .subscribe((savedLog) => {
                console.log(savedLog);
                this.logsCreatedSubject.next(savedLog);
            });
    }

    private handleError(error: HttpErrorResponse) {
        console.log('error: ', error);
        this.errorSubject.next('An unexpected error has occurred. Please try again in a few minutes.');
    }
}
