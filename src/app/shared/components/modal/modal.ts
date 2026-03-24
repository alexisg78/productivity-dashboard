import { Component, output } from '@angular/core';

@Component({
  selector: 'modal',
  imports: [],
  templateUrl: './modal.html',
})
export class Modal {
  close = output<void>();
}
