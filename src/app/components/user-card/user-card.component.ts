import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UsersService } from 'src/app/services/users/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: User;
  @Output() onRemove = new EventEmitter<User>();
  @Output() onEdit = new EventEmitter<User>();

  constructor(private userService: UsersService) {}

  ngOnInit(): void {}

  editUser(): void {
    this.onEdit.emit(this.user);
  }

  removeUser(): void {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure you want to remove this user?',
      showCancelButton: true,
      confirmButtonText: 'Continue',
    }).then(result => {
      if(result.value) {
        Swal.fire({ title: 'Removing user...', allowOutsideClick: false});
        Swal.showLoading();
        this.userService.removeUser(this.user.id).subscribe((response) => {
          this.onRemove.emit(this.user);
          Swal.close();
        }, err => {
          console.log(err);
          Swal.close();
        });
      }
    });
  }
}
