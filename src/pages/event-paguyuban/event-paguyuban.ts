import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public paguyubanservice: PaguyubanServiceProvider,
    public loadingCtrl: LoadingController,
    public alertservice: AlertProvider
    ) {
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

    this.paguyubanservice.DeleteEvent(k).then(res=>{
      this.alertservice.presentToast('Acara Telah Terhapus',3000,'bottom')
    }).catch(e => {
      this.alertservice.presentToast(e,3000,'bottom')
    })

  }


}
