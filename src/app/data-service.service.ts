import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  constructor(private http: HttpClient) {}

  getUsersData() {
    return this.http.get(environment.server_url + '/users');
  }
  getUsersFriendsData() {
    return this.http.get(environment.server_url + '/usersfriends');
  }
  getUsersFriendsOFfriendsData() {
    // return this.http.get(environment.server_url + '/usersfriendsOFfriends');
  }
}
