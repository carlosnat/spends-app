import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OperationFormPage } from './operation-form';

@NgModule({
  declarations: [
    OperationFormPage,
  ],
  imports: [
    IonicPageModule.forChild(OperationFormPage),
  ],
})
export class OperationFormPageModule {}
