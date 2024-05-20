import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {JwtAuthenticationService} from "../../core/Services/warehouse/JwtAuthenticationService";
import {JwtAuthenticationResponseModel} from "../../core/apis/dtos/Jwt-Authentication-Response.model";
import {SignInRequestModel} from "../../core/apis/dtos/SignIn-request.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  jwtAuthencationResponse = new JwtAuthenticationResponseModel();
  signIn = new SignInRequestModel();
  isShowLoading = false;
  isKeepSigin = false;

  constructor(private jwtAuthencationService: JwtAuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    this.jwtAuthencationResponse = new JwtAuthenticationResponseModel();
    this.signIn = new SignInRequestModel();
    if (localStorage.getItem("previousSigninName") !== null && localStorage.getItem("previousSigninPassword") !== null)
      this.signIn.email = JSON.parse(localStorage.getItem("previousSigninName")!) as string;
    this.signIn.password = JSON.parse(localStorage.getItem("previousSigninPassword")!) as string;
    this.isKeepSigin = true;
  }

  btnLogin() {
    this.isShowLoading = true;
    this.jwtAuthencationService.signIn(this.signIn).subscribe(res => {
      //Nếu đăng nhập thất bại thì báo lỗi cho người dùng
      if (res.status !== 200) {
        if (res.message) {
          res.message.forEach((value: any) => {
            alert("Đăng nhập không thành công !");
          });
          return;
        }
      }
      localStorage.setItem("authentication", JSON.stringify(res.result));
      this.isShowLoading = false;
      if (this.isKeepSigin) {
        localStorage.setItem("previousSigninName", JSON.stringify(this.signIn.email));
        localStorage.setItem("previousSigninPassword", JSON.stringify(this.signIn.password));
      }
      this.router.navigate(['dashboard']);
    })
  }

  onSubmit() {
  }
}
