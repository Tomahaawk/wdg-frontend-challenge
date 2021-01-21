import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: User;
  @Output() select = new EventEmitter<User>();

  constructor() {}

  ngOnInit(): void {}

  handleItemClick() {
    this.select.emit(this.user);
  }
}
