import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { User } from 'src/app/model/user';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;

  loadedPages: number[] = [];
  loadingPage: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const page = +params.page || 1;
      if (this.loadedPages.find((p) => p === page)) {
        this.currentPage = page;
      } else {
        this.loadUsers(page);
      }
    });
  }

  loadUsers(page: number): void {
    this.toggleLoadingPage();
    this.usersService.getUserList(page).subscribe((response) => {
      if (page > this.currentPage) {
        this.users = [...this.users, ...response.data];
      } else {
        this.users = [...response.data, ...this.users];
      }

      if (!this.loadedPages.length) {
        // Since we are using a fake backend, total items is not updated after each request
        this.totalItems = response.total;
      }

      this.itemsPerPage = response.per_page;
      this.currentPage = page;
      this.loadedPages.push(page);
      this.toggleLoadingPage();
    }, (err) => {
      this.toggleLoadingPage()
      console.log(err);
    });
  }

  navigate(item: User): void {
    this.router.navigate(['/establishment', item.id]);
  }

  handleRemoveUser(user: User): void {
    this.totalItems -= 1;
    this.users = this.users.filter((u) => u.id !== user.id);
  }

  handleEditUser(user: User): void {
    this.router.navigate(['/users', user.id]);
  }

  changePage(page: number): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  toggleLoadingPage(): void {
    this.loadingPage = !this.loadingPage;
  }
}
