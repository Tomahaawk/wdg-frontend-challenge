import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UsersService } from 'src/app/services/users/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  user: User;
  userForm: FormGroup;
  loading: boolean = false;
  loadingUser: boolean = false;

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(({ id }) => {
      if (id) {
        this.getUserData(id);
      }
    });
  }

  initForm(): void {
    this.userForm = this.fb.group({
      id: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      avatar: [''],
    });
  }

  toggleLoadingUser() {
    this.loadingUser = !this.loadingUser;
  }

  getUserData(id): void {
    this.toggleLoadingUser();
    this.userService.getUserById(id).subscribe((response) => {
      this.user = response.data;
      this.userForm.patchValue(this.user);
      this.toggleLoadingUser();
    }, (err) => {
      this.toggleLoadingUser();
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'There was a problem loading this user data.'
      }).then(() => {
        this.location.back();
      })
    });
  }

  saveUser(values): void {
    this.loading = true;
    Swal.fire('Saving user...');
    Swal.showLoading();
    this.userService.updateUser(values).subscribe((response) => {
      this.user = response;
      this.loading = false;
      Swal.fire({
        icon: 'success',
        title: 'User updated!',
      });
    }, (err) => {
      this.loading = false;
      Swal.fire({
        icon: 'error',
        title: 'There was a problem updating this user.',
      });
      console.log(err);
    });
  }

  removeUser() {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure you want to remove this user?',
      showCancelButton: true,
      confirmButtonText: 'Continue',
    }).then(result => {
      if(result.value) {
        Swal.fire({ title: 'Removing user...', allowOutsideClick: false});
        Swal.showLoading();
        this.userService.removeUser(this.user.id).subscribe(() => {
          Swal.close();
          this.location.back();
        }, (err) => {
          console.error(err);
          Swal.close();
        });
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
