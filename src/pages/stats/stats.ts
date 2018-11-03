import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OperationFormPage } from '../operation-form/operation-form';
import { Storage } from '@ionic/storage';
import { OperationProvider } from '../../providers/operation/operation';

/**
 * Generated class for the StatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {

  public account: any = {};

  constructor(
    private operationProvider: OperationProvider,
    private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.storage.get('account').then( val => {
      this.account = val;
    })
  }

  async ionicViewDidLoad(){
    await this.updateStats();
  }

  async ionViewDidEnter() {
    await this.updateStats();
  }

  async updateStats() {
    this.account = await this.storage.get('account');
    await this.operationProvider.getAllByFamilyId(this.account._id).subscribe( res => {
      this.account.operations = res;
      this.storage.set('account', this.account);
    });
  }

  createOperation(operationType) {
    this.navCtrl.push(OperationFormPage, {operationType});
  }

  editOperation(operation) {
    console.log('edit operation', operation);
    this.navCtrl.push(OperationFormPage, {operation});
  }

}
