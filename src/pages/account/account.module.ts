import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountPage } from './account';

import { CategoriesPageModule } from '../categories/categories.module';
import { LabelsPageModule } from '../labels/labels.module';
import { StatsPageModule } from '../stats/stats.module';

@NgModule({
  declarations: [
    AccountPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountPage),
    CategoriesPageModule,
    LabelsPageModule,
    StatsPageModule,
  ],
})
export class AccountPageModule {}
