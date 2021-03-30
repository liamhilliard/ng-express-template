import { Component } from '@angular/core';
import { hello } from 'core/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = hello()
}
