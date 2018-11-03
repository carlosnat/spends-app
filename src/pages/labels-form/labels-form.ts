import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LabelProvider } from '../../providers/label/label';
@IonicPage()
@Component({
  selector: 'page-labels-form',
  templateUrl: 'labels-form.html',
})
export class LabelsFormPage {

  public labelForm : FormGroup;
  public account;
  public label = null;

  constructor(private labelProvider: LabelProvider, private fb: FormBuilder, private storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    this.label = this.navParams.get('label');
    this.storage.get('account').then( val => {
      this.account = val;
    });
    this.createLabelForm();
  }

  createLabelForm() {
    console.log('editar label', this.label);
    this.labelForm = this.fb.group({
      name: [ this.label ? this.label.name : ''],
      icono: [ this.label ? this.label.icono : ''],
      belongsToGroup: [ this.label ? this.label.belongsToGroup : ''],
    });
  }

  createLabel() {
    const data = this.labelForm.value;
    data.belongsToFamily = this.account._id;
    this.labelProvider.createLabel(data).subscribe( res => {
      this.storage.set('account', res);
      this.navCtrl.pop();
    });
  }

  async editLabel() {
    const account = await this.storage.get('account');
    const data = this.labelForm.value;
    data.belongsToFamily = account._id;
    data._id = this.label._id;
    this.labelProvider.editLabel(data).subscribe( (res:any) => {
      console.log('label editada', res);
      this.storage.set('account', res);
      this.navCtrl.pop();
    });
  }

  deleteLabel() {
    this.labelProvider.deleteLabel(this.label).subscribe( (res:any) => {
      this.storage.set('account', res);
      this.navCtrl.pop();
    });
  }

}
