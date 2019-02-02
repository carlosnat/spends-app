import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
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
  public canCreateOperation = false;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    private operationProvider: OperationProvider,
    private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.storage.get('account').then( val => {
      this.account = val;
    })
  }

  verifyCanCreateOperation() {
    console.log(this.account);
    if (this.account.spendsGroups.length > 0 && this.account.categories.length > 0){
      this.canCreateOperation = true;
    }
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Crear nueva operación',
      buttons: [
        {
          text: 'Nuevo Egreso',
          handler: () => this.createOperation(true)
        },{
          text: 'Nuevo Ingreso',
          handler: () => this.createOperation(false)
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  async ionViewDidLoad(){
    console.log('Hola carlos load');
    await this.updateStats();
  }

  async ionViewDidEnter() {
    console.log('Hola carlos enter');
    await this.updateStats();
  }

  async updateStats() {
    this.account = await this.storage.get('account');
    await this.operationProvider.getAllByFamilyId(this.account._id).subscribe( res => {
      this.account.operations = res;
      this.storage.set('account', this.account);
      this.verifyCanCreateOperation();
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
