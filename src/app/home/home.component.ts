import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Search, SearchModel, User } from '../formmodel';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  
  userdata:User

  fetchedusers:Array<any> = []
  error:Boolean = false
  loading:Boolean = false

  searchformModel:Search = new SearchModel('','fullname')
  

  
  constructor(private userservice:UserService,private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userdata = JSON.parse(localStorage.getItem('currentuser')!);

    // this.getUsers();
  }


  // getUsers(){
  //   this.userservice.getUsers().subscribe({
  //     next:data => {
  //       this.fetchedusers = data?.data;
  //       this.loading = false;
  //       console.log(data)
  //     },
  //     error:err => {
  //       this.error = true;
  //       this.loading = false;
  //       console.log(err)
  //     }
  //   })
  // }

  searchuser(){
    this.loading = true;
    this.userservice.searchusers(this.searchformModel).subscribe({
      next:data => {
        this.fetchedusers = data?.data;
        this.loading = false;
        console.log(data)
      },
      error:err => {
        this.error = true;
        this.loading = false;
        console.log(err)
      }
    })
  }

  logout(){
    localStorage.removeItem('currentuser')
    this.toastr.success('You have been logged out successfully','Success')
    this.router.navigate(['/login'])
  }


}
