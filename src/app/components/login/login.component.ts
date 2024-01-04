import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ILoginRequest } from '../../interfaces/ILoginRequest';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //#region declerations
  public form: FormGroup = {} as FormGroup;
  public hide = true;
  public hasError: boolean = false;
  //#endregion

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private storageService: StorageService,
    private router: Router,
    private authService: AuthService
    ) { }

  public ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.form.valueChanges.subscribe(() => this.hasError = false);
  }

  // send username and password to server for authentication
  public onSubmit(): void {
    if (this.form.valid) {

      this.hasError = false;

      let obj: ILoginRequest = {} as ILoginRequest;
      obj.UserName = this.form.controls["username"].value;
      obj.Password = this.form.controls["password"].value;

      this.loginService.Authenticate(obj).subscribe({
        next: (res) => {
          let token = res["loginResponse"]["token"];
          this.storageService.setToken(token);
          this.authService.setLoggedIn(true);
          this.router.navigate(['/search']);
        },
        error: () => {
          this.hasError = true;
        },
        complete: () => { }
      })
    }
  }

  public navigate() {
    this.router.navigate(['/search']);
  }
}