import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { PaguyubanServiceProvider } from './../../providers/paguyuban-service/paguyuban-service';
import { AlertProvider } from './../../providers/alert/alert';

/**
 * Generated class for the AddMemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-member',
  templateUrl: 'add-member.html',
})
export class AddMemberPage {

  /* Property for result */
  resultNewMember:any;

  /* Data Member */
  datamember = {
    "nama":"",
    "email":"",
    "alamat":"",
    "kelamin":"",
    "role":0,
    "tgl_lahir":"",
    "tgl_bergabung":"",
    "parent":"",
    "uid":""
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public paguyubanservice:PaguyubanServiceProvider,
    public alertservice:AlertProvider,
    public loadingCtrl: LoadingController,

    ) {



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMemberPage');
  }

  AddMember(){

    /* Create Loader */
    const loader = this.loadingCtrl.create({
      content: "Lagi dicoba save, Tunggu ya..",
    });
    loader.present()

    this.paguyubanservice.APIconnectionpost("",this.datamember,1).then(res=>{

      this.resultNewMember = res // Memberi nilai resultNewMember
      this.datamember.email.toLowerCase() // Ubah ke huruf kecil semua
      this.datamember.role = Number(this.datamember.role) // Ubah ke tipe data number
      this.datamember.uid = this.resultNewMember.uid // Get UID setelah akun terbuat
      this.alertservice.presentToast('Akun '+this.datamember.nama+' Telah Terbuat',3000,'top') // Flek stelah akun terbuat

      /* 
      ** Menyimpan data ke database
      */
      this.paguyubanservice.CreateNewMember(this.datamember).then(res=>{
        
        loader.dismiss()
        this.alertservice.presentToast('Data Telah Tersimpan',3000,'top') // Flek stelah data tersimpan
        this.navCtrl.pop()

      }).catch(e=>{
        loader.dismiss()
        this.alertservice.presentToast(e,3000,'top')
      })

    }).catch(e=>{
      loader.dismiss()
      this.alertservice.presentToast(e,2000,'bottom')
    });

  }

}
