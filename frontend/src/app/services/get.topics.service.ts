import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetTopicsService {
  constructor(private http: HttpClient) {}

  getTopics(url: string): Observable<any[]> {
    return this.http.get<any[]>(url);
  }

  submitAction(url: string, data: any): Observable<any> {
    return this.http.put(url, data);
  }

  getTopicOptions(url: string) {
    return this.http.get(url);
  }
}
