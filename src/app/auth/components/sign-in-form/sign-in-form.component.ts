/* eslint-disable @typescript-eslint/comma-dangle */
import { Component } from '@angular/core';
import { TestService } from 'src/app/core/services/test.service';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent {
  public form: any = {
    login: null,
    username: null,
    password: null,
  };

  public isSuccessful: boolean = false;

  public isSignUpFailed: boolean = false;

  public errorMessage: string = '';

  public constructor(public testService: TestService) {}

  public onSubmit(): void {
    const { login, username, password }: any = this.form;
    this.testService.signUp(login, username, password).subscribe(
      (data: any) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      (err: any) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
