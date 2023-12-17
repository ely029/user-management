import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../models/Users';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http : HttpClient) { }

  register({ user }: { user: Users; }): any {

    return this.http.post<any>('http://localhost:3000/api/register', user).pipe(
    
    tap((res:  any) => {
          return res;
      })
    
    );
  }

  login({ user }: { user: Users; }): any {
    return this.http.post<any>('http://localhost:3000/api/login', user).pipe(
    
    tap((res:  any) => {
          return res;
      })
    
    );
  }

  listOfUsers(): any {
    return this.http.get<any>('http://localhost:3000/api/list').pipe(
    
    tap((res:  any) => {
          return res;
      })
    
    );
  }



  updateProfile({ user }: { user: Users; }): any {
    return this.http.post<any>('http://localhost:3000/api/update-profile', user).pipe(
    
    tap((res:  any) => {
          return res;
      })
    
    );
  }
}
