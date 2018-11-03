import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { StatsPage } from '../stats/stats';
import { CategoriesPage } from '../categories/categories';
import { LabelsPage } from '../labels/labels';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  tab1: any;
  tab2: any;
  tab3: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tab1 = CategoriesPage;
    this.tab2 = LabelsPage;
    this.tab3 = StatsPage;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

}
