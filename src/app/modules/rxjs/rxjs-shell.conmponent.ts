import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs-shell.conmponent.html',
  styleUrls: ['./rxjs-shell.component.css']
})
export class RxjsShellComponent  {
  @Input() name: string;
}