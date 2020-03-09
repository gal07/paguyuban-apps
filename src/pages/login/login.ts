import { ForgotPasswordPage } from './../forgot-password/forgot-password';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TabsPage } from './../tabs/tabs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { GuruserviceProvider } from './../../providers/guruservice/guruservice';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email='';
  password='';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afauth: AngularFireAuth,
    public alertprov: AlertProvider,
    private guruservice: GuruserviceProvider,
    public loadingCtrl: LoadingController,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewWillEnter(){
    this.afauth.auth.onAuthStateChanged((user)=>{
      if(user){
        console.log('ada')
        this.navCtrl.setRoot(TabsPage,{data:{role:JSON.parse(localStorage.getItem('role'))}})
      }else{
        console.log('tidak ada')
      }
    })
  }

  login(){

    if (this.email.length == 0 || this.password.length == 0) {
      this.alertprov.showAlert('Warning','Field email dan password harus di isi','Close')
      return false;
    }

    /* Create Loader */
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      // duration: 4000
    });

    loader.present();

    /* Check Email apakah email terdapat pada guru_uid */
    this.guruservice.check_guru_uid(this.email).subscribe(data=>{
      if (data.length == 1) {
       /* Jika email yang diberikan , ditemukan di dalam database akan dilanjutkan */
       this.afauth.auth.signInWithEmailAndPassword(this.email,this.password).then((res)=>{
        loader.dismiss();
        this.navCtrl.push(TabsPage,{data:{role:1}})
        let roles = 1;
        localStorage.setItem('role',JSON.stringify(roles))
      }).catch(error=>{
        loader.dismiss();
        this.alertprov.showAlert('Failed',error.message,'Close')
      })
      }
      else {

        /* Check Email apakah email terdapat pada siswa_uid */
        this.guruservice.check_siswa_uid(this.email).subscribe(data=>{

          if (data.length == 1) {

              /* Jika email yang diberikan , ditemukan di dalam database akan dilanjutkan */
              this.afauth.auth.signInWithEmailAndPassword(this.email,this.password).then((res)=>{
                loader.dismiss();
                this.navCtrl.push(TabsPage,{data:{role:2}})
                let roles = 2;
                localStorage.setItem('role',JSON.stringify(roles))
              }).catch(error=>{
                loader.dismiss();
                this.alertprov.showAlert('Failed',error.message,'Close')
              })
            
          }else{

            /* Check Email apakah email terdapat pada orangtua_uid */
            this.guruservice.check_orangtua_uid(this.email).subscribe(data=>{

              if (data.length == 1) {

                   /* Jika email yang diberikan , ditemukan di dalam database akan dilanjutkan */
                  this.afauth.auth.signInWithEmailAndPassword(this.email,this.password).then((res)=>{
                    loader.dismiss();
                    this.navCtrl.push(TabsPage,{data:{role:3}})
                    let roles = 3;
                    localStorage.setItem('role',JSON.stringify(roles))
                  }).catch(error=>{
                    loader.dismiss();
                    this.alertprov.showAlert('Failed',error.message,'Close')
                  })
                
              }else{

                  /* Jika email yang diberikan tidak ditemukan */
                  loader.dismiss();
                  this.alertprov.showAlert('Failed','Email Tidak Ditemukan','Close')

              }

            })

          }

        })

      }
    })

  }

  forgot(){
    this.navCtrl.push(ForgotPasswordPage)
  }



}
