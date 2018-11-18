import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FamilyProvider } from "../../providers/family/family";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Storage } from "@ionic/storage";
import { LoadingController } from "ionic-angular";
import { ToastController } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-account-form",
  templateUrl: "account-form.html"
})
export class AccountFormPage {
  public accountForm: FormGroup;
  private loading: any;

  constructor(
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private fb: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    private accuntProvider: FamilyProvider
  ) {
    this.createAccountForm();
  }

  createAccountForm() {
    this.accountForm = this.fb.group({
      name: [""],
      userId: [""]
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AccountFormPage");
  }

  async createAccount() {
    this.presentLoading();
    const userId = await this.storage.get("userId");
    this.accountForm.patchValue({ userId: userId });
    this.accuntProvider
      .createFamily(this.accountForm.value)
      .subscribe((res: any) => {
        this.loading.dismiss();
        this.presentToast("Cuenta creada éxitosamente");
        this.navCtrl.pop();
      });
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Creando nueva cuenta"
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
