import { Component, OnDestroy } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AccountPage } from "../account/account";
import { AccountFormPage } from "../account-form/account-form";
import { FamilyProvider } from "../../providers/family/family";
import { Storage } from "@ionic/storage";
import { Observable } from "rxjs/Observable";

interface familia {
  _id: string;
  name: string;
}

@IonicPage()
@Component({
  selector: "page-accounts",
  templateUrl: "accounts.html"
})
export class AccountsPage implements OnDestroy {
  public accounts;

  private $account;
  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    private familyProvider: FamilyProvider
  ) {
    this.accounts = [];
  }

  ngOnDestroy() {
    this.$account.unsubscribe();
  }

  async getAllFamilies() {
    const userId = await this.storage.get("userId");
    this.$account = this.familyProvider
      .getFamiliesByUserId(userId)
      .subscribe(res => {
        this.accounts = res;
      });
  }

  ionViewDidLoad() {}

  ionViewDidEnter() {
    this.getAllFamilies();
  }

  viewdetail(account) {
    this.storage.set("account", account);
    this.navCtrl.push(AccountPage);
  }

  createAccount() {
    this.navCtrl.push(AccountFormPage);
  }
}
