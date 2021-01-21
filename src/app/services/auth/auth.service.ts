import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = 'https://reqres.in/';
  private _bearer: string = null;
  private _headers: HttpHeaders = null;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('currentUser');
    this._headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if(token) {
      this._headers.append('Authorization', `Bearer ${token}`)
    }
  }

  authUser(json): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this._baseUrl}api/login?delay=2`, json, { headers: this._headers });
  }

  saveToken(bearer) {
    this._bearer = bearer;
    this._headers.append('Authorization', `Bearer ${bearer}`)
    localStorage.setItem('currentUser', JSON.stringify({ token: bearer }));
  }
}
