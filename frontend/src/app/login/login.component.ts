import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule,FormControl, Validators } from '@angular/forms';
import { ActivatedRoute,CanDeactivateFn } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  role: string = '';
  path:string='';
  submitted=false;
  private destroyRef=inject(DestroyRef);
  form=new FormGroup({
    email:new FormControl('',{
      validators:[Validators.required,Validators.email]
    }),
    password:new FormControl('',{
      validators:[Validators.required],
    })
  });
 constructor(private route:ActivatedRoute, private authService:AuthenticationService, private router:Router){}
ngOnInit(): void {
   this.path = this.route.snapshot.routeConfig?.path ?? '';
 }
  onSubmit(){
    if(this.form.invalid){
      console.log('Invalid form');
      return;
    }
    if(this.path==="dealer-login"){
      this.role="dealer";
    }
    else if(this.path==="customer-login"){
      this.role="customer";
    }
    else{
      this.role="admin";
    }
    this.submitted=true;
    const enteredMail=this.form.value.email ?? '';
    const enteredPass=this.form.value.password ?? '';
    // const authStatus:boolean=this.authService.login(this.role,enteredMail,enteredPass);
    // if(authStatus){
    //   console.log("Successfully matched the credentials");
    // }
    // else{
    //   console.log("Credentials not matched");
    // }
    const subscription=this.authService.login$(this.role,enteredMail,enteredPass).subscribe({
      next:(ok)=>{
        if(ok){
          console.log("Credentials matched");
          this.router.navigate(['/',this.role]);
        }
        else{
          console.log("Data not matched");
        }
      },
      error:(err)=>{
        console.log("Error occurred:",err);
      }
    })
    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe();
    });
  }
}

export const canLeaveLoginpage:CanDeactivateFn<LoginComponent>=(component)=>{
  const isTouched=component.form.dirty;
  console.log(isTouched);
  // const isDirty=component.form.dirty;
  if(isTouched ===false){
    window.confirm("Do you really want to leave? You have unsubmitted data");
    console.log(`Is the form touched ${isTouched}`);
    // console.log(`Is the form dirty ${isDirty}`);
    return true;
  }

  // if(isTouched==false){
  //   return true;
  // }
  // window.alert("Do you really want to leave? You have unsubmitted data");
  return true;
}

