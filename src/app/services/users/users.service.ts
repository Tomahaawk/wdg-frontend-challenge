import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _baseUrl: string = 'https://reqres.in/api/';

  constructor(private authService: AuthService, private http: HttpClient) { }

  getUserList(page: number = 1): Observable<UserList> {
    return this.http.get<UserList>(`${this._baseUrl}users?delay=2&page=${page}`, { headers: this.authService.headers });
  }

  removeUser(id: number): Observable<any> {
    return this.http.delete(`${this._baseUrl}users/${id}?delay=2`, { headers: this.authService.headers });
  }

  getUserById(id: number): Observable<UserById> {
    return this.http.get<UserById>(`${this._baseUrl}users/${id}?delay=2`, { headers: this.authService.headers });
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this._baseUrl}users/${user.id}?delay=2`, user, { headers: this.authService.headers });
  }

}

interface UserList {
  data: User[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

interface UserById {
  data: User;
}
