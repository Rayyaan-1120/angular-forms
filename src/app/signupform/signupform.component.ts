import { Component, OnInit } from '@angular/core';
import { Formmodel } from '../formmodel';
import { FormsubmitService } from '../formsubmit.service';

@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.css']
})
export class SignupformComponent implements OnInit {

  favframe:Array<String> = ['React','Angular','Vue','Svelte'];

  formmodel:Formmodel = new Formmodel('','','','default','');

  error:Boolean = false;

  constructor(private _formsubmit:FormsubmitService) { }

  ngOnInit(): void {
  }

  checkValue(value:String){
    if(value === "default"){
      this.error = true;
    }else{
      this.error = false;
    } 
  }

  onSubmit(){
    this._formsubmit.onSubmit(this.formmodel).subscribe({
      next:data => {
        console.log(data);
        alert("Form Submitted Successfully");
      },
      error:err => {
        console.log(err);
        alert("Error in submitting form");
      }
    })
  }

}
