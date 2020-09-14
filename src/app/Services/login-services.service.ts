import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServicesService {
  
  constructor(private http:HttpClient) { }
  //public url = "http://localhost:4000";
 public url = window.location.origin +":4000";

  userLogin(userName,password){
    return this.http.post(this.url+"/login/",{
      "username":userName,
      "password":password
    })
  }

  getAllCampains(){
    return this.http.get(this.url+"/campaigns");
  }
}
