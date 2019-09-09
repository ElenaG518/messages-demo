import { Injectable } from '@angular/core';
import { Message } from 'src/app/shared/models/message';
import { HttpClient } from '@angular/common/http';

import { combineLatest, throwError, of, BehaviorSubject, Observable, Subject, merge } from 'rxjs';
import { catchError, map, shareReplay, tap, concatMap, mergeMap, switchMap, scan } from 'rxjs/operators';
import { Contact } from 'src/app/shared/models/contact';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageUrl = 'api/messages';
  private contactUrl = 'api/contacts';
  private selectedMessageSubject = new BehaviorSubject<number>(1);

  public selectedMessageChanges$ = this.selectedMessageSubject.asObservable();

  public messages$ = this.http.get<Message[]>(this.messageUrl)
    .pipe(
      tap(console.table),
      catchError(this.handleError)
    );

  public messageContacts$: Observable<Contact[]> = this.http.get<Contact[]>(this.contactUrl)
    .pipe(
      tap(console.table),
      catchError(this.handleError)
    );

  public messagesIncliudingContacts$ = combineLatest(
    this.messages$,
    this.messageContacts$
  ).pipe(
    map(([messages, messageContacts]) =>
      messages.map(
        message =>
          ({
            ...message,
            to: messageContacts.filter(c => message.toId.includes(c.id))
          } as Message)
      )
    ),
    shareReplay()
  );

  public selectedMessage$ = combineLatest(
    this.selectedMessageChanges$,
    this.messagesIncliudingContacts$
  ).pipe(
    map(([selectedMessageId, messages]) =>
      messages.find(m => m.id === selectedMessageId)
    ),
    tap(message => console.log('changeSelectedMessage', message)),
    shareReplay({ bufferSize: 1, refCount: false })
  );

  public higherOrderConcatMap$ = of(2, 10, 8, 5).pipe(
    tap(id => console.log('id:', id)),
    concatMap(id => this.http.get<Message[]>(`${this.messageUrl}/${id}`))
  );

  public higherOrderMergetMap$ = of(2, 10, 8, 5).pipe(
    tap(id => console.log('id:', id)),
    mergeMap(id => this.http.get<Message[]>(`${this.messageUrl}/${id}`))
  );

  public switchMap$ = of(2, 10, 8, 5).pipe(
    tap(id => console.log('id:', id)),
    switchMap(id => this.http.get<Message[]>(`${this.messageUrl}/${id}`))
  );

  private messageInsertedSubject = new Subject<Message>();
  private mewssageInsertedAction$ = this.messageInsertedSubject.asObservable();

  public messageAdd$ = merge(
    this.messagesIncliudingContacts$,
    this.mewssageInsertedAction$
  )
    .pipe(
      scan((acc: Message[], value: Message) => [...acc, value]),
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );

  constructor(private http: HttpClient) { }

  public changeSelectedMessage(selectedMessageId: number | null): void {
    this.selectedMessageSubject.next(selectedMessageId);
  }

  public addMessage(newMessage?: Message) {
    newMessage = newMessage || this.fakeMEssage();
    this.messageInsertedSubject.next(newMessage);
  }

  private fakeMEssage(): Message {
    return  {
      'id': 42,
      'subject': 'New one here!',
      'body': 'Let ssss do this....',
      'toId': [9, 10, 5]
    };
  }

  private handleError(errorObject): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;

    if (typeof (errorObject) === 'string') {
      errorMessage = errorObject;
    } else {
      if (errorObject.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${errorObject.error.message}`;
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `Backend returned code ${errorObject.status}: ${errorObject.body.error}`;
      }
    }
    console.error(errorObject);
    return throwError(errorMessage);
  }
}