import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {

  loginform:FormGroup;

  constructor(private fb: FormBuilder,private toastr: ToastrService,private userservice:UserService,private router:Router)  { 
    this.loginform = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
    // this.showError()
  }

  ngOnInit(): void {
  }

  Login(){
    if(this.loginform.invalid){
      return this.loginform.markAllAsTouched();
   }
    this.userservice.loginUser(this.loginform.value).subscribe({
      next:data => {
        this.loginform.reset()
        this.toastr.success('Login Successful',data.status)
        localStorage.setItem('currentuser',JSON.stringify(data.data))
        this.router.navigate(['/home'])
      },
      error:err => {
        this.showError('Login Failed',err.message)
      }
    })
    
  }

  showError(title:string,message:string){
    this.toastr.error(message,title)
  }

  navigatetoSignup(){
    this.router.navigate(['/reactivesignupform'])
  }

 

}
