import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LabelsPage } from './labels';

import { LabelsFormPageModule } from '../labels-form/labels-form.module';

@NgModule({
  declarations: [
    LabelsPage,
  ],
  imports: [
    IonicPageModule.forChild(LabelsPage),
    LabelsFormPageModule,
  ],
})
export class LabelsPageModule {}
