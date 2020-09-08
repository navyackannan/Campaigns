import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SESSION_STORAGE,WebStorageService} from 'angular-webstorage-service';
import { LoginServicesService } from '../Services/login-services.service';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;submitted = false;
  constructor( private formBuilder:FormBuilder, 
    @Inject(SESSION_STORAGE) private storage: WebStorageService,private route:Router,
    private loginService:LoginServicesService
    ) { 
    
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
    })
    const email = localStorage.getItem('email');
    if(email){
      const password =localStorage.getItem('password');
      $("input[type='checkbox']").attr('checked','checked');
        this.loginForm = this.formBuilder.group({
          email:[email,[Validators.required,Validators.email]],
          password:[password,[Validators.required,Validators.minLength(6)]]
        })
    }
    else{
      this.loginForm = this.formBuilder.group({
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(6)]]
      })
    }
  
  }

  get f() { return this.loginForm.controls; }
  onSubmit(){
    this.submitted = true;
    if($("input[type='checkbox']").is(":checked")){
      localStorage.setItem('email',this.loginForm.value.email);
      localStorage.setItem('password',this.loginForm.value.password);
    }
    else{
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    }
    if (this.loginForm.invalid) {
      return;
    }
    else{
      const userEmail = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      console.log(userEmail);
      this.loginService.userLogin(userEmail,password).subscribe((response)=>{
        console.log(response);
        if(response){
          this.route.navigate(['/home']);
        }
        
      },
      error=>{
        console.log(error);
        alert(error.error.text);
      })
    
    
  }

}
}