import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder,Validators, ValidatorFn } from '@angular/forms';
import { FormsubmitService } from '../formsubmit.service';
import { agegreaterthan18, forbiddenusernames, passwordvalidator } from '../validators/reactive-form.vaidator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reactivesignup',
  templateUrl: './reactivesignup.component.html',
  styleUrls: ['./reactivesignup.component.css']
})
export class ReactivesignupComponent implements OnInit {

  // registerationform = new FormGroup({
  //   fullname: new FormControl(''),
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  //   confirmpassword: new FormControl(''),
  //   address:new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalcode: new FormControl('')
  //   })
  // })

  registerationform!: FormGroup;
  draftdata:object | null = null;
  

  constructor(private fb:FormBuilder,private _formsubmit:FormsubmitService,private router:Router,private toastr: ToastrService) { }

  

  ngOnInit(): void {
    this.registerationform = this.fb.group({
      fullname:['',[Validators.required,Validators.minLength(6)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      age:['',[Validators.required,agegreaterthan18]],
      confirmpassword:['',Validators.required],
      photo:['',[Validators.required]],
  
    },{validator:passwordvalidator})

    localStorage.getItem('formdata') !== null && this.registerationform.patchValue(JSON.parse(localStorage.getItem('formdata')!))
    
  }

  loadapidata(){
    this.registerationform.patchValue({
      fullname:'John Doe',
      email:"default@gmail.com",
      password:"12345678",
      confirmpassword:"12345678",
      age:'18'
    })
  }


  removevalidationandaddnewvalidation(){
    // this.registerationform.clearValidators()
    // this.registerationform.updateValueAndValidity()
    this.changevalidations('fullname',[forbiddenusernames,Validators.required]);
    this.changevalidations('email',[]);
    this.changevalidations('password',[]);
    this.changevalidations('confirmpassword',[]);
    this.changevalidations('age',[]);
    this.changevalidations('photo',[]);

    if(this.registerationform.invalid){
      return this.registerationform.markAllAsTouched();
   }

   localStorage.setItem('formdata',JSON.stringify(this.registerationform.value));
   alert("Your Form has been saved")
  //  this._formsubmit.onSubmit(this.registerationform.value).subscribe({
  //    next:data => {
  //      console.log(data);
  //      alert("Form Submitted Successfully");
  //    },
  //    error:err => {
  //      console.log(err);
  //      alert("Error in submitting form");
  //    }
  //  })
    

  }


  changevalidations(name: string,validators: Array<ValidatorFn>){
     this.registerationform?.get(name)?.clearValidators();
      this.registerationform.get(name)?.setValidators(validators);
      this.registerationform?.get(name)?.updateValueAndValidity();
  }

  onSubmit(){
    if(this.registerationform.invalid){
       return this.registerationform.markAllAsTouched();
    }

    let formdata = new FormData();
    formdata.append('fullname',this.registerationform.value.fullname);
    formdata.append('email',this.registerationform.value.email);
    formdata.append('password',this.registerationform.value.password);
    formdata.append('age',this.registerationform.value.age);
    formdata.append('photo',this.registerationform.value.photo,this.registerationform.value.photo.name);
    console.log(this.registerationform.value.photo)
    console.log(this.registerationform.get('photo')!.value);
    // console.log(this.registerationform);
    this._formsubmit.onSubmit(formdata).subscribe({
      
      next:data => {
        console.log(data);
        this.registerationform.reset();
        this.toastr.success(data.status,'Form Submitted Successfully');
        localStorage.removeItem('formdata');
        localStorage.setItem('currentuser',JSON.stringify(data?.data));
        this.router.navigate(['/home']);
      },
      error:err => {
        console.log(err);
        this.toastr.error(err.status,'Error in submitting form');
      }
    })
  }

  navigatetoLogin(){
    this.router.navigate(['/login'])
  }

  getFile(e:any){
    console.log(e.target.files[0]);
    if (e.target.files[0].size / 1024 / 1024 > 20) {
      this.toastr.error("File size should be less than 20MB","Error");
      return;
    }

    const file = (e.target.files[0] as File);
  this.registerationform.get('photo')!.setValue(file);
  console.log(this.registerationform.get('photo')!.value);
   
    // this.registerationform.controls["photo"].patchValue(e.target.files[0]);
  }

}
