import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private apiUrl = 'http://localhost:8000/api/v1/topics';

  constructor(private http: HttpClient) { }

  createTopic(topic: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, topic);
  }
}
