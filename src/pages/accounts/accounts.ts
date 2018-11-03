import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountPage } from '../account/account';
import { AccountFormPage } from '../account-form/account-form';
import { FamilyProvider } from '../../providers/family/family';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html',
})
export class AccountsPage {

  public accounts: any;

  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    private familyProvider: FamilyProvider) {

  }

  async getAllFamilies() {
    const userId = await this.storage.get('userId');
    this.accounts = this.familyProvider.getFamiliesByUserId(userId);
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {
    this.getAllFamilies();
  }

  viewdetail(account) {
    this.storage.set('account', account);
    this.navCtrl.push(AccountPage);
  }

  createAccount() {
    this.navCtrl.push(AccountFormPage);
  }

}
