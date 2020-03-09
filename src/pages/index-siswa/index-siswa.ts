import { ViewNilaiSiswaPage } from './../view-nilai-siswa/view-nilai-siswa';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { SiswaserviceProvider } from './../../providers/siswaservice/siswaservice';

/**
 * Generated class for the IndexSiswaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-index-siswa',
  templateUrl: 'index-siswa.html',
})
export class IndexSiswaPage {

  email;
  getNisn;
  mapel;
  setMapel;
  arrays = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afauth: AngularFireAuth,
    public afs: AngularFirestore,
    private siswaservice: SiswaserviceProvider,
    public loadingCtrl: LoadingController,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexSiswaPage');
     /* Create Loader */
     const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2000
    });
    loader.present()
  }

  ionViewWillEnter(){
    console.log('ionViewwillenter IndexSiswaPage');
   
    this.afauth.auth.onAuthStateChanged(data=>{
      this.email = data.email
      this.siswaservice.getNisnByEmail(this.email).subscribe(data=>{
        this.getNisn = data
        if (!localStorage.getItem('nisn')) {
          localStorage.setItem('nisn',JSON.stringify(this.getNisn))
        }
      })

      /** Set localstorage karena mencegah delay yang akan jadi error */
      let nisns = JSON.parse(localStorage.getItem('nisn'))
      let getRunningSemester = localStorage.getItem('semester')
        
      this.siswaservice.getMapelByNisn(nisns[0].key,getRunningSemester).subscribe(data=>{
        console.log(data)
        this.setMapel = data[0].mapel;
        for (const key in this.setMapel) {
          this.arrays.push(key)
        }
        if (!localStorage.getItem('mapel_siswa')) {
          localStorage.setItem('mapel_siswa',JSON.stringify(this.arrays))
        }
        this.mapel = JSON.parse(localStorage.getItem('mapel_siswa'))

      })
    })

        

  }

  ionViewWillLeave(){

  }

  goTo(kode){
    
      this.navCtrl.push(ViewNilaiSiswaPage,{data:kode})

  }

  refreshPage(){
    setTimeout(() => {
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }, 1000);
  }


}
