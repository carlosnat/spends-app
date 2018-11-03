import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriesPage } from './categories';

import { CategoryFormPageModule } from '../category-form/category-form.module';

@NgModule({
  declarations: [
    CategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriesPage),
    CategoryFormPageModule,
  ],
})
export class CategoriesPageModule {}
