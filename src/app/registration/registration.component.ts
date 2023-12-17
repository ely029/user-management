import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Users } from '../../models/Users';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  
  registrationForm : any
  message : string
  constructor(private fb : FormBuilder, private service: UsersService){}
  ngOnInit() : void {
    this.registrationForm = this.fb.group({
      name : ['', Validators.required],
      password : ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  submit() : any {
    try{
      if(this.registrationForm.valid) {
        const u = new Users();
        u.email = this.registrationForm.value.email;
        u.name = this.registrationForm.value.name;
        u.password = this.registrationForm.value.password;
        this.service.register({ user: u }).subscribe( (res: any) => {
        this.message = res['message'];

        if(this.message == "") {
          console.log(res);
        }
        }, (err: any) => {
          console.log("There is an error "+err.message)
        })
      }
    }catch(exception){
      console.log("there is an error "+ exception);
    }
    
  }

}
