import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LabelsFormPage } from './labels-form';

@NgModule({
  declarations: [
    LabelsFormPage,
  ],
  imports: [
    IonicPageModule.forChild(LabelsFormPage),
  ],
})
export class LabelsFormPageModule {}
