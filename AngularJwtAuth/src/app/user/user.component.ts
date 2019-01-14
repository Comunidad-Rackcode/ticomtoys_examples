import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userInfo: any;
  board: string;
  errorMessage: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserBoard().subscribe(
      result => {

        console.log(result);

        this.userInfo = {
          name: result.data.name,
          email: result.data.email
        };
        this.board = result.message;
      },
      result => {
        console.log(result);
        this.errorMessage = `${result.error.message}: ${result.error.errors.message}`;
      }
    );
  }
}
