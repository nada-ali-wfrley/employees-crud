import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AllEmployees } from './components/all-employees/all-employees';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AllEmployees],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'employees-crud';
}
