import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class Employees {
  
   private baseUrl = 'http://task.soft-zone.net/api/Employees'; 

  constructor(private http: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/getAllEmployees`);
  }

  getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/getEmpByID/${id}`);
  }

  add(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/addEmployee`, employee);
  }

  update(id: number, employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/editEmployee`, employee);
  }

  delete(id: number): Observable<void> {
    return this.http.get<void>(`${this.baseUrl}/deleteEmpByID/${id}`);
  }
}
