import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  errorSubscription: Subscription;
  errorMessage = '';

  constructor(private router: Router, private apiService: ApiService) {
      this.router.navigate(['/clock']);
      this.errorSubscription = this.apiService.errorSubject.subscribe(error => {
        this.errorMessage = error;
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.errorSubscription) {
        this.errorSubscription.unsubscribe();
    }
  }

  closeAlert() {
      this.errorMessage = '';
  }
}
