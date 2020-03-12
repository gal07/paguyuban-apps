import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { PaguyubanServiceProvider } from './../../providers/paguyuban-service/paguyuban-service';
import { AlertProvider } from './../../providers/alert/alert';

/**
 * Generated class for the CreateEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-event',
  templateUrl: 'create-event.html',
})
export class CreateEventPage {

  /* Form Data */
  formdata = {
    "detail_acara":"",
    "dibuat_oleh":"",
    "nama_acara":"",
    "tempat_acara":"",
    "alamat_acara":"",
    "tgl_acara":""
  }
  member:any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public paguyubanservice: PaguyubanServiceProvider,
    public alertservice:AlertProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEventPage');
  }

  ionViewWillEnter(){
   this.Member()
  }

  async createEvent(){

    let userdata = JSON.parse(localStorage.getItem('data_user'))
    this.formdata.dibuat_oleh = userdata[0].nama
    if (this.formdata.alamat_acara == "" || this.formdata.detail_acara == "" || this.formdata.dibuat_oleh == "" || this.formdata.nama_acara == "" || this.formdata.tempat_acara == "" || this.formdata.tgl_acara == "") {
      this.alertservice.presentToast('Tolong Di Isi Semua Ya',3000,'bottom')     
      return false
    }

    /* Create Loader */
    const loader = this.loadingCtrl.create({
      content: "Lagi dicoba save, Tunggu ya..",
    });
    loader.present()

    this.paguyubanservice.CreateEvent(this.formdata).then(()=>{
      this.alertservice.presentToast('Acara Terbuat',3000,'bottom')
      this.navCtrl.pop()
      loader.dismiss()
    }).catch(e => {
      this.alertservice.presentToast(e,3000,'bottom')
      loader.dismiss()
    })

  }

  async Member(){

    (await this.paguyubanservice.GetAllMember()).subscribe(res=>{
      this.member = res
      console.log(this.member)
    })

  }

}
