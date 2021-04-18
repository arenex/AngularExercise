import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';

export const USER_DATA_ENDPOINT = 'https://jsonplaceholder.typicode.com/users';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  getUserData(): Observable<User[]> {
    return this.http.get<User[]>(USER_DATA_ENDPOINT, {});
  }

}
