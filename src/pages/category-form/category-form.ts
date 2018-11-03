import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { CategoryProvider } from '../../providers/category/category';
@IonicPage()
@Component({
  selector: 'page-category-form',
  templateUrl: 'category-form.html',
})
export class CategoryFormPage {

  public categoryForm : FormGroup;
  public category = null;

  constructor(private categoryProvider: CategoryProvider, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, private fb : FormBuilder) {
    this.category = this.navParams.get('category');
    console.log('this.category', this.category);
    this.createCategoryForm();
  }

  async ionViewDidEnter() {
    this.createCategoryForm();
  }

  createCategoryForm() {
    this.categoryForm = this.fb.group({
      name: [ this.category ? this.category.name : ''],
      color: [ this.category ? this.category.color : '']
    });
  }

  async createCategory() {
    const account = await this.storage.get('account');
    const data = this.categoryForm.value;
    data.belongsToFamily = account._id;
    this.categoryProvider.createCategory(data).subscribe( (res:any) => {
      this.storage.set('account', res.result);
      this.navCtrl.pop();
    });
  }

  async editCategory() {
    const account = await this.storage.get('account');
    const data = this.categoryForm.value;
    data.belongsToFamily = account._id;
    data._id = this.category._id;
    this.categoryProvider.editCategory(data).subscribe( (res:any) => {
      this.storage.set('account', res.familyUpdated);
      this.navCtrl.pop();
    });
  }

  deleteCategory() {
    this.categoryProvider.deleteCategory(this.category).subscribe( (res:any) => {
      this.storage.set('account', res);
      this.navCtrl.pop();
    });
  }

}
