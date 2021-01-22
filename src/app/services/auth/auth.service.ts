import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from './types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = 'https://reqres.in/api/';
  private _headers: HttpHeaders = null;

  constructor(private http: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if(currentUser) {
      this._headers = this._headers.append('Authorization', `Bearer ${currentUser.token}`);
    }
  }

  authUser(json): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this._baseUrl}login?delay=2`, json, { headers: this._headers });
  }

  saveToken(bearer): void {
    this._headers = this._headers.append('Authorization', `Bearer ${bearer}`);
    localStorage.setItem('currentUser', JSON.stringify({ token: bearer }));
  }

  get headers(): HttpHeaders {
    return this._headers;
  }
}
