import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-field',
  templateUrl: './view-field.component.html',
  styleUrls: ['./view-field.component.scss']
})
export class ViewFieldComponent {
  @Input() label: string = "Label";
  @Input() value: string = "Value";
  @Input() type: string = "text";
  @Input() width: string = "100%";

  constructor() { }

}
