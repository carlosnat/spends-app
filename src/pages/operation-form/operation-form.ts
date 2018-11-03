import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { OperationProvider } from '../../providers/operation/operation';

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
    this.createOperationForm();
    this.operationType = this.navParams.get('operationType');
  }

  createOperationForm() {
    this.operationForm = this.fb.group({
      group: [''],
      category: [''],
      amount: [''],
      description: [''],
      occurrenceDate: [''],
      type: ['']
    });
  }

  async ionViewDidEnter() {
    console.log('ionViewDidEnter OperationFormPage', this.operationType, this.account);
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
