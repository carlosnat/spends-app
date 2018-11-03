import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { OperationProvider } from '../../providers/operation/operation';
import { DISABLED } from '@angular/forms/src/model';

@IonicPage()
@Component({
  selector: 'page-operation-form',
  templateUrl: 'operation-form.html',
})
export class OperationFormPage {

  public operationType: any;
  public account: any = {};
  public operationForm: FormGroup;
  public labelsOptions: any;
  public base64Image: any;
  public operationToEdit: any;

  constructor(
    private camera: Camera,
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private fb: FormBuilder,
    private operationProvider: OperationProvider) {
    this.storage.get('account').then( val => {
      this.account = val;
    });
    this.operationType = this.navParams.get('operationType');
    this.operationToEdit = this.navParams.get('operation');
    this.createOperationForm();
  }

  createOperationForm() {
    this.operationForm = this.fb.group({
      group: this.operationToEdit.group ? this.operationToEdit.group._id : '',
      category: [this.operationToEdit.category ? this.operationToEdit.category.name : ''],
      amount: [this.operationToEdit.amount ? this.operationToEdit.amount : ''],
      description: [this.operationToEdit.description ? this.operationToEdit.description : ''],
      occurrenceDate: [this.operationToEdit.occurrenceDate ? this.operationToEdit.occurrenceDate : ''],
      type: [this.operationToEdit.type ? this.operationToEdit.type : '']
    });

  }


  async ionViewDidEnter() {
    console.log('ionViewDidEnter OperationFormPage', this.operationToEdit);
  }

  selectCategory() {
    console.log(this.operationForm.value);
    this.labelsOptions = this.account.categories.filter( item => {
      const category = this.operationForm.get('group').value;
      console.log('item', item.belongsToGroup, category);
      return item.belongsToGroup === category;
    });
  }

  saveOperation() {
    const data = this.operationForm.value;
    data.type = this.operationType === true ? 'inflow' : 'outflow'
    data.family = this.account._id;
    console.log(data);
    this.operationProvider.createOperation(data).subscribe( res => {
      console.log('operation created', res);
    });
    this.navCtrl.pop();
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    });
  }

}
