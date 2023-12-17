import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../../models/Users';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  detailForm : any
  message : string
  public sessionStorage = sessionStorage;
  name: string | null;
  email: string | null;
  list: any
  constructor(private router: Router, private fb : FormBuilder, private service : UsersService){}
  ngOnInit() : void{
     if(sessionStorage.getItem('role_id') == 'CUSTOMER') {
      this.initialForm();
      this.name = this.sessionStorage.getItem('name');
      this.email = this.sessionStorage.getItem('email');
     } 
     else if(sessionStorage.getItem('role_id') == 'ADMIN') {
      this.service.listOfUsers().subscribe( (res: any) => {
            this.list = res.result;
        }, (err: any) => {
          console.log("There is an error "+err.message)
        })
     } else {
       this.router.navigateByUrl('signin');
     }
  }

  initialForm() : void {
    this.detailForm = this.fb.group({
        name : ['', Validators.required],
        email : ['', Validators.required]
    });
  }

  updateProfile() : void {
    if(this.detailForm.valid) {
      var u = new Users();
      u.email = this.detailForm.value.email;
      u.name = this.detailForm.value.name;
      u.id = this.sessionStorage.getItem('id');
      this.service.updateProfile({ user: u }).subscribe( (res: any) => {
        this.message = res['message'];
        sessionStorage.setItem('name', res['name']);
        sessionStorage.setItem('email', res['email']);
        }, (err: any) => {
          console.log("There is an error"+err.message)
        })
    }
  }

  logout() : void {
    this.sessionStorage.clear();
    this.router.navigateByUrl('signin');
  }
}
