import { ChartPage } from './../pages/chart/chart';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { IndexGuruPage } from './../pages/index-guru/index-guru';
import { IndexOrangtuaPage } from './../pages/index-orangtua/index-orangtua';
import { IndexSiswaPage } from './../pages/index-siswa/index-siswa';
import { ViewNilaiSiswaPage } from './../pages/view-nilai-siswa/view-nilai-siswa';
import { TabsPage } from './../pages/tabs/tabs';
import { ForgotPasswordPage } from './../pages/forgot-password/forgot-password'
import { InfoDetailPage } from './../pages/info-detail/info-detail';
import { ListStudentPage } from './../pages/list-student/list-student';
import { InputGradeStudentPage } from './../pages/input-grade-student/input-grade-student';
import { UsersPage } from './../pages/users/users';
import { AlertProvider } from '../providers/alert/alert';
import { GuruserviceProvider } from '../providers/guruservice/guruservice';
import { SiswaserviceProvider } from '../providers/siswaservice/siswaservice';

export const firebaseConfig = {
  apiKey: "AIzaSyC7Hi9Ft_K0MmOdbP6tsg5YksP4F6nORHE",
  authDomain: "fir-crud-7f287.firebaseapp.com",
  databaseURL: "https://fir-crud-7f287.firebaseio.com",
  projectId: "fir-crud-7f287",
  storageBucket: "fir-crud-7f287.appspot.com",
  messagingSenderId: "148921659125"
};
@NgModule({
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    IndexGuruPage,
    TabsPage,
    ListStudentPage,
    InputGradeStudentPage,
    UsersPage,
    IndexOrangtuaPage,
    IndexSiswaPage,
    ViewNilaiSiswaPage,
    InfoDetailPage,
    ForgotPasswordPage,
    ChartPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
    HttpModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    IndexGuruPage,
    TabsPage,
    ListStudentPage,
    InputGradeStudentPage,
    UsersPage,
    IndexOrangtuaPage,
    IndexSiswaPage,
    ViewNilaiSiswaPage,
    InfoDetailPage,
    ForgotPasswordPage,
    ChartPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AlertProvider,
    GuruserviceProvider,
    SiswaserviceProvider
  ]
})
export class AppModule {}
