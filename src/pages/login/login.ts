import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';

import {AccountsPage} from '../accounts/accounts';
import {SignupPage} from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public userForm : FormGroup;

  constructor(public navCtrl: NavController, private fb: FormBuilder, public userProvider: UserProvider, private storage: Storage) {
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.userProvider.login(this.userForm.value).subscribe( (res: any) => {
      this.storage.set('token', res.token);
      this.storage.set('userId', res.userId);
      this.navCtrl.setRoot(AccountsPage);
    });
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }

}
