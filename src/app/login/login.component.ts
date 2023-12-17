import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { Users } from '../../models/Users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm : any
  message : string
  constructor(private router: Router,private fb : FormBuilder, private service : UsersService){}
  
  ngOnInit() : void {
      this.loginForm = this.fb.group({
          email : ['',Validators.required],
          password : ['', Validators.required]
      });
  }

  submit() : void {
      if(this.loginForm.valid){
        const u = new Users();
        u.email = this.loginForm.value.email;
        u.password = this.loginForm.value.password;
        this.service.login({ user: u }).subscribe( (res: any) => {
          this.message = res['message'];
          if(this.message == "") {
             sessionStorage.setItem('id',res['id']);
             sessionStorage.setItem('role_id',res['role_id']);
             sessionStorage.setItem('name', res['name']);
             sessionStorage.setItem('email', res['email']);
            this.router.navigateByUrl('dashboard');

          }
          }, (err: any) => {
            console.log("There is an error"+err.message)
          })
      }
  }
}
