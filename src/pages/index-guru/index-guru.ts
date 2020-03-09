import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { ListStudentPage } from './../list-student/list-student';
import { AngularFireAuth } from '@angular/fire/auth';
import { GuruserviceProvider } from './../../providers/guruservice/guruservice';
import { loadDirective, load } from '@angular/core/src/render3/instructions';

/**
 * Generated class for the IndexGuruPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index-guru',
  templateUrl: 'index-guru.html',
})
export class IndexGuruPage {
  getEmail;
  getNIP = null;
  getmapel;
  mapel = [];

  constructor(
    private GuruServ:GuruserviceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    private afauth: AngularFireAuth,
    public loadingCtrl: LoadingController,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexGuruPage');
     /* Create Loader */
     const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2000
    });
    loader.present()
  }
  ionViewWillEnter(){

    // /* Create Loader */
    // const loader = this.loadingCtrl.create({
    //   content: "Please wait...",
    // });
    // loader.present()
    /** Check Userstate */
    this.afauth.auth.onAuthStateChanged(data=>{

      /** Get NIP */
      this.getEmail = data.email;
        this.GuruServ.getNipByEmail(this.getEmail).subscribe(datas=>{
          this.getNIP = datas
          if (!localStorage.getItem('nip')) {
            localStorage.setItem('nip',JSON.stringify(this.getNIP))
          }
        })
        
    })

    /** Set localstorage karena mencegah delay yang akan jadi error */
    let nips = JSON.parse(localStorage.getItem('nip'))
    let getRunningSemester = localStorage.getItem('semester')

    this.GuruServ.getMapelByNip(nips[0].key,getRunningSemester).subscribe(data=>{
      this.getmapel = data;
      this.mapel = this.getmapel[0].pelajaran
    })
    // loader.dismiss()

  //  console.log(this.getmapel)
  //  console.log(this.mapel)

  }

  goTo(kode){
    /* Create Loader */
    const loader = this.loadingCtrl.create({
      content: "Load Data "+kode,
      // duration: 4000
    });

    /* Launch Loader */
    loader.present();
    this.navCtrl.push(ListStudentPage,{data:kode})
    loader.dismiss();
  }

  refreshPage(){
    setTimeout(() => {
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }, 1000);
  }

}
