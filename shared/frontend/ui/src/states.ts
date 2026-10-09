import { Component, input, output } from '@angular/core';

@Component({
  selector: 'cf-loading',
  template: `<p role="status">{{ message() }}</p>`,
})
export class LoadingState {
  readonly message = input.required<string>();
}

@Component({
  selector: 'cf-empty',
  template: `<p>{{ message() }}</p>`,
})
export class EmptyState {
  readonly message = input.required<string>();
}

@Component({
  selector: 'cf-error',
  template: `
    <p role="alert">讀取失敗，請再試一次</p>
    <button type="button" (click)="retry.emit()">再試一次</button>
  `,
})
export class ErrorState {
  readonly retry = output<void>();
}
