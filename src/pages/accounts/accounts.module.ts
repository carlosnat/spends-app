import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountsPage } from './accounts';

import { AccountFormPageModule } from '../account-form/account-form.module';


@NgModule({
  declarations: [
    AccountsPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountsPage),
    AccountFormPageModule,
  ],
})
export class AccountsPageModule {}
