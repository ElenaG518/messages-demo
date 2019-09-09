import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Subject, Observable, EMPTY, of, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from './../message.service';
import { Message } from './../../../shared/models/message';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'md-message-list',
  templateUrl: './message-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageListComponent implements OnInit {
  private errorSubject$ = new Subject<string>();
  public pageTitle = 'Messages';
  public errorMessage$ = this.errorSubject$.asObservable()

  private messages$: Observable<Message[]> = this.messageService.messagesIncliudingContacts$
    .pipe(
      catchError(error => {
        this.errorSubject$.next(error);
        return EMPTY;
      }));

  private selectedMessageId$ = this.messageService.selectedMessageChanges$;

  public vm$ = combineLatest(
    [this.messages$, this.selectedMessageId$]
  ).pipe(
    map(([messages, selectedMessageId]: [Message[], number]) =>
      ({
        messages, selectedMessageId
      }))
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    // this.messageService.higherOrderConcatMap$.subscribe(d =>
    //   console.log('ConcatMap', d)
    // );
    // this.messageService.higherOrderMergetMap$.subscribe(d =>
    //   console.log('MergetMap', d)
    // );
    // this.messageService.switchMap$.subscribe(d =>
    //   console.log('switchMap', d)
    // );
  }

  public onNewMessage(): void {
    this.messageService.addMessage(null);
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.messageService.changeSelectedMessage(id);
    });
  }

  public onSelected(messageId: number): void {
    this.router.navigate(['/messages', messageId]);
  }
}
