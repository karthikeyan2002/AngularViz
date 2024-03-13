import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  getData() {
    return this.http.get<any[]>('https://bizconnect-11500-default-rtdb.asia-southeast1.firebasedatabase.app/sample.json');
  }
}
