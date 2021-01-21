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
    return this.http.get<UserList>(`${this._baseUrl}users?page=${page}`, { headers: this.authService.headers });
  }

}

interface UserList {
  data: User[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}
