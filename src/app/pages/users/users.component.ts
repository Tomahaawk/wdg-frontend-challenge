import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {User} from 'src/app/model/user';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];
  currentPage: number = 1;
  totalItems: number;
  itemsPerPage: number;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {
    // this.establishmetsService.updateEstablishmentsList();
  }

  ngOnInit(): void {
    this.usersService.getUserList().subscribe(response => {
      this.users = response.data;
      this.totalItems = response.total;
      this.itemsPerPage = response.per_page;
    });
  }

  navigate(item: User): void {
    this.router.navigate(['/establishment', item.id]);
  }
}
