import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loading } from '@core/components/loading/loading';

@Component({
  imports: [RouterOutlet, Loading],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('secbase-views');
}
