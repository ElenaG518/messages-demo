import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MainComponent } from './modules/main/main.component';
import { RxjsShellComponent } from './modules/rxjs/rxjs-shell.conmponent';
import { NavBarComponent } from './modules/nav-bar/nav-bar.component';
import { NonRxjsShellComponent } from './modules/non-rxjs/non-rxjs-shell.component';
import { AppData } from './app-data';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

const appRoutes: Routes = [
  { path: 'rxjs-way', component: RxjsShellComponent },
  { path: 'non-rxjs-way', component: NonRxjsShellComponent },
  {
    path: 'messages',
    loadChildren: () => import('./modules/message/message.module').then(m => m.MessageModule)
  },
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(AppData, { delay: 1000 }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  declarations: [
    MainComponent,
    NavBarComponent,
    RxjsShellComponent,
    NonRxjsShellComponent],
  bootstrap: [MainComponent]
})
export class AppModule { }
