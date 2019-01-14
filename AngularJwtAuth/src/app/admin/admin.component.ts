import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userInfo: any;
  board: string;
  errorMessage: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAdminBoard().subscribe(
      result => {
        this.userInfo = {
          name: result.data.name,
          email: result.data.email
        };
        this.board = result.message;
      },
      result => {
        console.log(result);
        this.errorMessage = `${result.errors.message.status}: ${result.errors.message.error}`;
      }
    );
  }
}
