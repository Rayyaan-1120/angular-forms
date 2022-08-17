import { Injectable } from '@angular/core';
import { Formmodel } from './formmodel';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormsubmitService {

  url = 'http://localhost:5000/api/user/signupuser';

  constructor(private http:HttpClient) { }

  onSubmit(data:any){
     return this.http.post<any>(this.url,data).pipe(
      catchError(this.handleError)
     )
  }

  handleError(error:HttpErrorResponse){
     
    return throwError(() => new Error(error.message));
  }

}
