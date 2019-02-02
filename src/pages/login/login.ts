import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { UserProvider } from "../../providers/user/user";
import { Storage } from "@ionic/storage";
import { LoadingController } from "ionic-angular";
import { ToastController } from "ionic-angular";

import { AccountsPage } from "../accounts/accounts";
import { SignupPage } from "../signup/signup";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  public userForm: FormGroup;
  private loading: any;

  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private fb: FormBuilder,
    public userProvider: UserProvider,
    private storage: Storage,
    private toastCtrl: ToastController
  ) {
    this.userForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  ionViewDidEnter() {
    setTimeout( () => {
      this.login();
    }, 1000)
  }

  login() {
    this.presentLoading();
    this.userProvider.login(this.userForm.value).subscribe(
      (res: any) => {
        this.loading.dismiss();
        this.storage.set("token", res.token);
        this.storage.set("userId", res.userId);
        this.navCtrl.setRoot(AccountsPage);
      },
      err => {
        console.log(err);
        this.loading.dismiss();
        this.presentToast(err.error.message);
      }
    );
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Validando cuenta"
    });
    this.loading.present();
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }
}
