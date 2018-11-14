import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { UserProvider } from "../../providers/user/user";
import { FormGroup, FormBuilder } from "@angular/forms";
import { LoadingController } from "ionic-angular";
import { ToastController } from "ionic-angular";
@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  public userForm: FormGroup;
  private loading: any;

  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public userProvider: UserProvider,
    public fb: FormBuilder,
    private toastCtrl: ToastController
  ) {
    this.createUserForm();
  }

  createUserForm() {
    this.userForm = this.fb.group({
      name: [""],
      email: [""],
      lastName: [""],
      avatar: [""],
      birthdate: [""],
      password: [""]
    });
  }

  createUser() {
    this.presentLoading();
    this.userProvider.createUser(this.userForm.value).subscribe(
      res => {
        this.userForm.reset();
        this.navCtrl.pop();
        this.presentToast("Usuario creado satisfactoriamente");
      },
      err => {
        this.loading.dismiss();
        this.presentToast(
          "Error al crear la cuenta: \n " + err.error.error_msg
        );
      },
      () => {
        this.loading.dismiss();
      }
    );
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Creando nuevo usuario"
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
