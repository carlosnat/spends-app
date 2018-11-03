import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryFormPage } from '../category-form/category-form';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  public account: any = {};

  constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    this.storage.get('account').then( val => {
      this.account = val;
    })
  }

  async ionViewDidEnter() {
    this.account = await this.storage.get('account');
  }

  createCategory() {
    this.navCtrl.push(CategoryFormPage);
  }

  editCategory(category) {
    console.log(category);
    this.navCtrl.push(CategoryFormPage, {category});
  }

}
