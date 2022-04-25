import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,  ViewChild, ElementRef,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup,NgForm, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  public regexpEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  public regexpMobile = new RegExp(/^((\\+91-?)|0)?[0-9]{10}$/);
  // public registerForm !: FormGroup;
  error: any;
  resArray:any=[];
  constructor(private fromBuilder: FormBuilder, private http : HttpClient,private router:Router) { }
  // @ViewChild('registerForm',null) registerForm: NgForm;
  // register:register;
  ngOnInit(): void {
    // this.registerForm = this.fromBuilder.group({
    //   fullname:"",
    //   email:"",
    //   mobile:"",
    //   password:"",
    //   confirmPassword:"",
    // })
    // this.register ={
    //   fullname:"",
    //   mobile:"",
    //   email:"",
    //   password:"",
    //   confirmPassword:"",
    // };
  }
  submit(register:any){
    console.log(register.value)
    if(!(this.regexpEmail.test(register.value.email))){
      alert("Please enter valid email")
      register.controls['email'].reset();
    }else if(!(this.regexpMobile.test(register.value.mobile))){
       alert("Please enter valid mobile number")
       register.controls['mobile'].reset();
    }else{
     if(register.value.password===register.value.confirmPassword ){
       this.http.post<any>('http://localhost:5000/users/register',register.value) 
       .subscribe(res=>{
         if(res.success){
           alert("Registration Successfull")
           register.reset();
           this.router.navigate(['login']);
         }
         else{
           alert(res.message)
           register.controls['mobile'].reset();
           register.controls['email'].reset();
           register.controls['password'].reset();
           register.controls['confirmPassword'].reset();
         }
       },err=>{
        this.error = err.message;
        console.log(err.message);
        //  alert("Something went wrong")
        })
       }else{
         this.error = "Passwords not matching. Try once again!";
        
        //  alert("Passwords not matching. Try once again!")
         register.controls['password'].reset();
         register.controls['confirmPassword'].reset();
       }
     }
  }
  
  // get f() {
  //   return this.registerForm.controls;
  // } 
  // register(){
  //  if(!(this.regexpEmail.test(this.registerForm.value.email))){
  //    alert("Please enter valid email")
  //    this.registerForm.controls['email'].reset();
  //  }else if(!(this.regexpMobile.test(this.registerForm.value.mobile))){
  //     alert("Please enter valid mobile number")
  //     this.registerForm.controls['mobile'].reset();
  //  }else{
  //   if(this.registerForm.value.password===this.registerForm.value.confirmPassword ){
  //     this.http.post<any>('http://localhost:5000/users/register',this.registerForm.value) 
  //     .subscribe(res=>{
  //       if(res.success){
  //         alert("Registration Successfull")
  //         this.registerForm.reset();
  //         this.router.navigate(['login']);
  //       }
  //       else{
  //         alert(res.message)
  //         this.registerForm.controls['mobile'].reset();
  //         this.registerForm.controls['email'].reset();
  //         this.registerForm.controls['password'].reset();
  //         this.registerForm.controls['confirmPassword'].reset();
  //       }
  //     },err=>{
  //       alert("Something went wrong")})
  //     }else{
  //       alert("Passwords not matching. Try once again!")
  //       this.registerForm.controls['password'].reset();
  //       this.registerForm.controls['confirmPassword'].reset();
  //     }
  //   }
  // }
  
  // register(){
  //   let user: any;
  //   this.http.get<any>("http://localhost:5000/users/")
  //   .subscribe(res=>{
  //     user = res.find((a:any)=>{
  //       return a.email === this.registerForm.value.email || a.mobile === this.registerForm.value.mobile
  //     })   
  //   if(user){
  //     alert("User with this email id or mobile number already exist");
  //     this.registerForm.reset();
  //   }
  //   else{
  //     if(this.registerForm.value.password===this.registerForm.value.confirmPassword){
  //       this.http.post<any>("http://localhost:5000/users/register",this.registerForm.value) 
  //       .subscribe(res=>{
  //         alert("Registration Successfull")
  //         this.registerForm.reset();
  //         this.router.navigate(['login']);
  //       },err=>{
  //         alert("Something went wrong")})
  //   }else{
  //     alert("Passwords not matching. Try once again!")
  //     this.registerForm.controls['password'].reset();
  //     this.registerForm.controls['confirmPassword'].reset();
  //   }
  //   }},err=>{
  //     alert("Something went wrong!")
  //   })

  // }
}
// export class register{
//       fullname:string;
//       mobile:string;
//       email:string;
//       password:string;
//       confirmPassword:string;
// }