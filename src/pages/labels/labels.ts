import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LabelsFormPage } from '../labels-form/labels-form';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-labels',
  templateUrl: 'labels.html',
})
export class LabelsPage {

  public account: any = {};

  constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    this.storage.get('account').then( val => {
      this.account = val;
    });
  }

  async ionViewDidEnter() {
    this.account = await this.storage.get('account');
  }

  createLabel() {
    this.navCtrl.push(LabelsFormPage);
  }

  editLabel(label) {
    console.log('edit:', label);
    this.navCtrl.push(LabelsFormPage, {label});

  }

}
