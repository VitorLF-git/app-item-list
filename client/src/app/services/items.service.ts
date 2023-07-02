import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }
  private baseURL = `http://localhost:3000/items`

  getAllItems(): Observable<any> {
    return this.http.get(`${this.baseURL}/`)
 }
}
