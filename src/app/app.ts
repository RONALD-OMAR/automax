import { Component, signal } from '@angular/core';
import { Automax } from './components/automax/automax';

@Component({
  imports: [Automax],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('automax');
}