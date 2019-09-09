import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared-module';
import { MessageShellComponent } from './message-shell/message-shell.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageDetailComponent } from './message-detail/message-detail.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
         path: '',
        component: MessageShellComponent
      },
      {
        path: ':id',
       component: MessageShellComponent
      }
    ])
  ],
  declarations: [
    MessageShellComponent,
    MessageListComponent,
    MessageDetailComponent
  ]
})
export class MessageModule { }
