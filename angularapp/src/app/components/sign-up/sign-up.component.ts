import { Component, OnInit } from '@angular/core';
import { IForm } from '../../model/signUp';
import { MsqlServiceService } from '../../service/msql-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  iForm: IForm | undefined;
  error = '';
  successSignUp = false;

  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;
  
  constructor(private signup: MsqlServiceService, private router: Router) {}

  ngOnInit(): void {
    this.myStyle = {
      position: 'fixed',
      width: '100%',
      height: '100%',
      'z-index': -1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };

    this.myParams = {
      particles: {
        number: {
          value: 200,
        },
        color: {
          value: '#ff0000',
        },
        shape: {
          type: 'triangle',
        },
      },
    };
  }

  onSignUpFormSubmit(signUpForm: any) {
    this.signup.register(signUpForm).subscribe((formData: any) => {
      if (formData === 'Email already exist') {
        this.error = formData;
        return;
      }
      this.successSignUp = true;
      setTimeout(() => {
        this.router.navigate(['/signin']);
      }, 5000);

      console.log(formData);
    });
  }
}
