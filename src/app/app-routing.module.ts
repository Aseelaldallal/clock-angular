import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ClockPageComponent } from './components/main/clock-page/clock-page.component';
import { LogsPageComponent } from './components/main/logs-page/logs-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


const appRoutes: Routes = [
    { path: '', component: MainComponent, children: [
        { path: 'clock', component: ClockPageComponent },
        { path: 'logs', component: LogsPageComponent },
    ]},
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: '/not-found' },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}