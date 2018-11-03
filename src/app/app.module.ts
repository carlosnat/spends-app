import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ReactiveFormsModule } from '@angular/forms';

import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';

import { LoginPageModule } from '../pages/login/login.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { AccountsPageModule } from '../pages/accounts/accounts.module';
import { FriendsPageModule } from '../pages/friends/friends.module';
import { AccountPageModule } from '../pages/account/account.module';
import { OperationFormPageModule } from '../pages/operation-form/operation-form.module';
import { IonicStorageModule } from '@ionic/storage';

import { HttpClientModule } from '@angular/common/http';
import { UserProvider } from '../providers/user/user';
import { OperationProvider } from '../providers/operation/operation';
import { CategoryProvider } from '../providers/category/category';
import { LabelProvider } from '../providers/label/label';
import { FamilyProvider } from '../providers/family/family';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ReactiveFormsModule,
    LoginPageModule,
    SignupPageModule,
    AccountsPageModule,
    FriendsPageModule,
    AccountPageModule,
    OperationFormPageModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    OperationProvider,
    CategoryProvider,
    LabelProvider,
    Camera,
    FamilyProvider
  ]
})
export class AppModule {}
