import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { GuruserviceProvider } from './../../providers/guruservice/guruservice';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  /* Email Forgot */
  forgotEmail = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,public guruservice: GuruserviceProvider,public loadingCtrl: LoadingController,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }
  sendForgot(){

    if (this.forgotEmail == '' || this.forgotEmail == null) {
      this.guruservice.presentToast('Field Email Tidak Boleh Kosong')
      return false
    }

    /* Create Loader */
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      // duration: 4000
    });
    loader.present()
    this.guruservice.forgotPassword(this.forgotEmail)
    loader.dismiss()
    this.navCtrl.pop()
  }

}
