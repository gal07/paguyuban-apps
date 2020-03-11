import { ForgotPasswordPage } from './../forgot-password/forgot-password';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TabsPage } from './../tabs/tabs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { GuruserviceProvider } from './../../providers/guruservice/guruservice';
import { PaguyubanServiceProvider } from './../../providers/paguyuban-service/paguyuban-service';

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

  /* Result Check Email */
  resultCheckEmail:any;

  email='';
  password='';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afauth: AngularFireAuth,
    public alertprov: AlertProvider,
    private guruservice: GuruserviceProvider,
    public loadingCtrl: LoadingController,
    public paguyubanservice:PaguyubanServiceProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewWillEnter(){
    /* Create Loader */
    const loader = this.loadingCtrl.create({
      content: "Check Session...",
      // duration: 4000
    });

    loader.present();
    this.afauth.auth.onAuthStateChanged((user)=>{
      if(user){
        console.log('ada')
        this.navCtrl.setRoot(TabsPage,{data:{role:JSON.parse(localStorage.getItem('role'))}})
        loader.dismiss();
      }else{
        console.log('tidak ada')
        loader.dismiss();
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

    this.paguyubanservice.CheckEmail(this.email).then(res=>{
     
      this.resultCheckEmail = res
      if (this.resultCheckEmail.length == 1) {

        /* Login Firebase auth */
        this.afauth.auth.signInWithEmailAndPassword(this.email,this.password).then(res => {
          localStorage.setItem('datalogin',JSON.stringify(res))
          localStorage.setItem('data_user',JSON.stringify(this.resultCheckEmail))
          this.navCtrl.push(TabsPage,{data:{role:this.resultCheckEmail.role}})
        }).catch(e => {
          this.alertprov.showAlert('Error Login',e,'Tutup')
        })

        loader.dismiss();
      }else{
        this.alertprov.showAlert('Error Login','Data nya gada di kami nih','Tutup')
        loader.dismiss();
      }

    }).catch(e=>{
      console.log(e)
      loader.dismiss();
    })

    // // /* Check Email apakah email terdapat pada guru_uid */
    // // this.guruservice.check_guru_uid(this.email).subscribe(data=>{
    // //   if (data.length == 1) {
    // //    /* Jika email yang diberikan , ditemukan di dalam database akan dilanjutkan */
    // //    this.afauth.auth.signInWithEmailAndPassword(this.email,this.password).then((res)=>{
    // //     loader.dismiss();
    // //     this.navCtrl.push(TabsPage,{data:{role:1}})
    // //     let roles = 1;
    // //     localStorage.setItem('role',JSON.stringify(roles))
    // //   }).catch(error=>{
    // //     loader.dismiss();
    // //     this.alertprov.showAlert('Failed',error.message,'Close')
    // //   })
    // //   }
    // //   else {

    // //     /* Check Email apakah email terdapat pada siswa_uid */
    // //     this.guruservice.check_siswa_uid(this.email).subscribe(data=>{

    // //       if (data.length == 1) {

    // //           /* Jika email yang diberikan , ditemukan di dalam database akan dilanjutkan */
    // //           this.afauth.auth.signInWithEmailAndPassword(this.email,this.password).then((res)=>{
    // //             loader.dismiss();
    // //             this.navCtrl.push(TabsPage,{data:{role:2}})
    // //             let roles = 2;
    // //             localStorage.setItem('role',JSON.stringify(roles))
    // //           }).catch(error=>{
    // //             loader.dismiss();
    // //             this.alertprov.showAlert('Failed',error.message,'Close')
    // //           })
            
    // //       }else{

    // //         /* Check Email apakah email terdapat pada orangtua_uid */
    // //         this.guruservice.check_orangtua_uid(this.email).subscribe(data=>{

    // //           if (data.length == 1) {

    // //                /* Jika email yang diberikan , ditemukan di dalam database akan dilanjutkan */
    // //               this.afauth.auth.signInWithEmailAndPassword(this.email,this.password).then((res)=>{
    // //                 loader.dismiss();
    // //                 this.navCtrl.push(TabsPage,{data:{role:3}})
    // //                 let roles = 3;
    // //                 localStorage.setItem('role',JSON.stringify(roles))
    // //               }).catch(error=>{
    // //                 loader.dismiss();
    // //                 this.alertprov.showAlert('Failed',error.message,'Close')
    // //               })
                
    // //           }else{

    // //               /* Jika email yang diberikan tidak ditemukan */
    // //               loader.dismiss();
    // //               this.alertprov.showAlert('Failed','Email Tidak Ditemukan','Close')

    // //           }

    // //         })

    // //       }

    // //     })

    //   }
    // })

  }

  forgot(){
    this.navCtrl.push(ForgotPasswordPage)
  }



}
