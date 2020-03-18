import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }
  httpOptions = {
    headers:new HttpHeaders({
      'Content-Type': 'aplication/json',
      'Authorization': 'Basic' + btoa('hard:hard')
    })
  }
  //returns movies
  public getMovies(){
    var username = 'hard';
    var password = 'hard';
   // const credentials = username+':'+password;
    let headers = new HttpHeaders();
   // headers = headers.append("Authorization", "Basic " + btoa(credentials));
    //headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    return this.httpClient.get('https://reactnative.dev/movies.json',{headers: headers});
  }

}
