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
      // Joberto, after you asked me about the pagination I noticed that the logic below is wrong.
      // It will only work if the user uses a sequential navigation (1, 2, 3 or 3, 2, 1).
      // If the user started on page 1 then jumped to page 3 and came back to 2,
      // page 2 items would be added before page 1, causing wron pagination.

      // if (page > this.currentPage) {
      //   debugger;
      //   if(response.total > insertIndex) {
      //   }
      // } else {
      //   this.users = [...response.data, ...this.users];
      // }
      // wrong code that was being used above.

      // This is correct, because now I am inserting the items at the start of the index they belong.
      if (!this.loadedPages.length) {
        // Since we are using a fake backend, total items is not updated after each request
        this.totalItems = response.total;
      }
      const insertIndex = (page - 1) * response.per_page;

      if(response.total >= insertIndex) {
        this.users.splice(insertIndex, 0, ...response.data);
        this.currentPage = page;
        this.loadedPages.push(page);
      }

      this.itemsPerPage = response.per_page;
      this.toggleLoadingPage();

    }, (err) => {
      this.toggleLoadingPage();
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
