import { Component, OnInit } from '@angular/core';
import { IForm } from '../../model/signUp';
import { MsqlServiceService } from '../../service/msql-service.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  error = '';
  constructor(private router: Router, private signin: MsqlServiceService) {}

  ngOnInit(): void {}

  onLoginUpFormSubmit(signInForm: IForm) {
    this.signin.signin(signInForm).subscribe((formData: any) => {
      // console.log(formData.msg);
      if (
        formData.msg === 'Wrong credentials' ||
        formData.msg === "Credentials don't match"
      ) {
        this.error = formData.msg;
        return;
      }
      this.signin.isLoggedIn();
      this.router.navigate(['/home']);
    });
  }
}
