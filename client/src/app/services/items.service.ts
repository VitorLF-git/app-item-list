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

  getItemById(id: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${id}`)
  }

  createItem(item: any): Observable<any> {
    return this.http.post(`${this.baseURL}/`, item)
  }

  updateItem(id: string, item: any): Observable<any> {
    return this.http.put(`${this.baseURL}/${id}`, item)
  }

  deleteItem(id: string): Observable<any> {
    console.log('delete item');
    
    return this.http.delete(`${this.baseURL}/${id}`)
  }

  searchItemByDescription(description: string): Observable<any> {
    return this.http.get(`${this.baseURL}/search/${description}`)
  }
}
