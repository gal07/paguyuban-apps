import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,AlertController } from 'ionic-angular';
import { PaguyubanServiceProvider } from './../../providers/paguyuban-service/paguyuban-service';
import { CreateEventPage } from './../create-event/create-event';
import { AlertProvider } from './../../providers/alert/alert';

/**
 * Generated class for the EventPaguyubanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-paguyuban',
  templateUrl: 'event-paguyuban.html',
})
export class EventPaguyubanPage {

  /* Result Get Jadwal */
  resultJadwal:any;
  roles:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public paguyubanservice: PaguyubanServiceProvider,
    public loadingCtrl: LoadingController,
    public alertservice: AlertProvider,
    public alertCtrl:AlertController
    ) {
      let userdata = JSON.parse(localStorage.getItem('data_user'))
      this.roles = userdata[0].role
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPaguyubanPage');
  }

  ionViewWillEnter(){
    this.GetJadwal();
  }

  async GetJadwal(){

    /* Create Loader */
    const loader = this.loadingCtrl.create({
      content: "Sebentar ya, Lagi ambil data",
    });
    loader.present();

    (await this.paguyubanservice.GetJadwalAcara()).subscribe(res=>{
      loader.dismiss();
      this.resultJadwal = res
    })

  }

  async toCreateEvent(){
    
    this.navCtrl.push(CreateEventPage)

  }

  async Delete(k){

    const confirm = this.alertCtrl.create({
      title: 'Hapus Data Acara',
      message: 'Bener mau di hapus nih ?',
      buttons: [
        {
          text: 'Batal',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Hapus',
          handler: () => {
            this.paguyubanservice.DeleteEvent(k).then(res=>{
              this.alertservice.presentToast('Acara Telah Terhapus',3000,'bottom')
            }).catch(e => {
              this.alertservice.presentToast(e,3000,'bottom')
            })
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();



  }



}
