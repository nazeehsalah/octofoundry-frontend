import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '@core/models/employee';
import { Observable, BehaviorSubject } from 'rxjs';
import { FilterItem } from '../@core/models/filter-item';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  filtersOpen = new BehaviorSubject<boolean>(true);
  private url: string = './assets/json/';
  constructor(private http: HttpClient) {}
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.url}/employees.json`);
  }
  getFiltersList(): Observable<FilterItem[]> {
    return this.http.get<FilterItem[]>(`${this.url}/filters.json`);
  }
  getCustomDropdown(url: string): Observable<any[]> {
    return this.http.get<any[]>(`${url}`);
  }
}
