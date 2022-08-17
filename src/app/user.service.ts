import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:5000/api/user/';

  constructor(private http:HttpClient) { }

  getUsers(){
     return this.http.get<any>(`${this.url}getallusers`).pipe(
      catchError(this.handleError)
     )
  }

  loginUser(data:any){
    return this.http.post<any>(`${this.url}loginuser`,data).pipe(
      catchError(this.handleError)
    )
  }

  searchusers(data:any){
    return this.http.get<any>(`${this.url}searchuser?search=${data.query}&filtertype=${data.filtertype}`).pipe(
      catchError(this.handleError)
    )
  }

  handleError(error:HttpErrorResponse){
     
    return throwError(() => new Error(error.message));
  }

}

