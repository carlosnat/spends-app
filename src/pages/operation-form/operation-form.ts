import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OperationProvider } from '../../providers/operation/operation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

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
  public imageFileName: any;

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private camera: Camera,
    private transfer: FileTransfer,
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
      group: [ (this.operationToEdit && this.operationToEdit.group) ? this.operationToEdit.group._id : ''],
      category: [(this.operationToEdit && this.operationToEdit.group) ? this.operationToEdit.category.name : ''],
      amount: [(this.operationToEdit && this.operationToEdit.group) ? this.operationToEdit.amount : ''],
      description: [(this.operationToEdit && this.operationToEdit.group) ? this.operationToEdit.description : ''],
      occurrenceDate: [(this.operationToEdit && this.operationToEdit.group) ? this.operationToEdit.occurrenceDate : ''],
      type: [(this.operationToEdit && this.operationToEdit.group) ? this.operationToEdit.type : '']
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

  async saveOperation() {
    const data = this.operationForm.value;
    data.type = this.operationType === true ? 'inflow' : 'outflow'
    data.family = this.account._id;
    if (this.base64Image) {
      console.log('voy a subir archivo');
      await this.uploadFile();
      data.image = this.imageFileName;
    }

    let loader = this.loadingCtrl.create({
      content: "Saving operation..."
    });
    loader.present();
    this.operationProvider.createOperation(data).subscribe( res => {
      console.log('operation created', res);
      loader.dismiss();
      this.navCtrl.pop();
    });
  }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'image',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }

    return fileTransfer.upload(this.base64Image, 'http://192.168.0.3:5000/api/operation/upload', options)
      .then((data) => {
        console.log('image uploaded', data);
        this.imageFileName = JSON.parse(data.response);
        loader.dismiss();
        this.presentToast("Image uploaded successfully");
    }, (err) => {
        console.log(err);
        loader.dismiss();
        this.presentToast(err);
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 6000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      console.log('foto taked', imageData);
      this.base64Image = imageData;
    }, (err) => {
      console.log('error taking image', err);
    });
  }

}
