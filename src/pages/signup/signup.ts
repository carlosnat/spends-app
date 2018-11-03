import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { FormGroup, FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public userForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public fb: FormBuilder) {
    this.createUserForm();
  }

  createUserForm() {
    this.userForm = this.fb.group({
      name: [''],
      email: [''],
      lastName: [''],
      avatar: [''],
      birthdate: [''],
      password: ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  createUser() {
    console.log('crear ususario');
    this.userProvider.createUser(this.userForm.value).subscribe( res => {
      console.log(res);
    })
  }

}
