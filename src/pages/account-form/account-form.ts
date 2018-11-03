import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FamilyProvider } from '../../providers/family/family';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-account-form',
  templateUrl: 'account-form.html',
})
export class AccountFormPage {

  public accountForm: FormGroup;

  constructor(
    private storage: Storage,
    private fb: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    private accuntProvider: FamilyProvider) {
      this.createAccountForm();
  }

  createAccountForm() {
    this.accountForm = this.fb.group({
      name: [''],
      userId: ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountFormPage');
  }

  async createAccount() {
    const userId = await this.storage.get('userId');
    this.accountForm.patchValue({userId: userId});
    this.accuntProvider.createFamily(this.accountForm.value).subscribe( (res:any) => {
      console.log(res);
    });
  }

}
