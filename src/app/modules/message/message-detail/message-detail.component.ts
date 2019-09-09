import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Subject, combineLatest, EMPTY } from 'rxjs';
import { Message } from '../../../shared/models/message'
import { MessageService } from '../message.service';
import { catchError, map, filter } from 'rxjs/operators';

@Component({
  selector: 'md-message-detail',
  templateUrl: './message-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageDetailComponent {
  private message$ = this.messageService.selectedMessage$.pipe(
    catchError(error => {
      this.errorMessage = error;
      return EMPTY;
    })
  );

  public error$ = new Subject<string>();
  public errorMessage: string;
  public selectedMessageId$ = this.messageService.selectedMessageChanges$;
  public pageTitle$ = this.message$
  .pipe(
    map((m: Message) =>
      m ? `Message Detail for: ${m.subject}` : null)
  );

  public vm$ = combineLatest(
    [this.message$,
    this.selectedMessageId$,
    this.pageTitle$])
    .pipe(
      filter(([message]) => !!message),
      map(([message, selectedMessageId, pageTitle]) =>
        ({ message, selectedMessageId, pageTitle }))
    );

  constructor(private messageService: MessageService) { }
}
