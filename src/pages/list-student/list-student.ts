import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ActionSheetController } from 'ionic-angular';
import { InputGradeStudentPage } from './../input-grade-student/input-grade-student';
import { GuruserviceProvider } from './../../providers/guruservice/guruservice';
import { InfoDetailPage } from './../info-detail/info-detail';
import { AlertProvider } from './../../providers/alert/alert';

/**
 * Generated class for the ListStudentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-student',
  templateUrl: 'list-student.html',
})
export class ListStudentPage {
  getKodeMapel;
  getsiswa;
  datas;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private GuruServ:GuruserviceProvider,
    public loadingCtrl: LoadingController,
    public alertprov: AlertProvider,
    public actionSheetCtrl: ActionSheetController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListStudentPage');
  }

  ionViewWillEnter(){
    this.getKodeMapel = this.navParams.get('data');
    console.log(this.getKodeMapel)
  }

  ionViewWillLeave(){
   localStorage.removeItem('totAbsen')
  }

  ionViewDidEnter(){
    /* Create Loader */
    const loader = this.loadingCtrl.create({
      content: "Load Data...",
    });
    loader.present()
    this.GuruServ.getSiswaByMapel(this.getKodeMapel).subscribe(data=>{
      this.getsiswa = data
      console.log(data);
    })
    loader.dismiss()
  }

  infoDetail(id){
      this.navCtrl.push(InfoDetailPage,{data:id})
  }

  Absen(nama,key,mapel){
    this.alertprov.showRadio(nama,key,mapel);
  }

  goDetail(k){
    this.navCtrl.push(InputGradeStudentPage,{data:{key_siswa:k,kode_mapel:this.getKodeMapel}});
  }

  absen(){
    alert('sd')
  }

  presentActionSheet(nama,key,mapel) {
    let dates = new Date();
    let month = dates.getMonth()+1;
    let keysLOG = dates.getDate()+'-'+month+'-'+dates.getFullYear()
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Absen Pada Tanggal '+keysLOG,
      buttons: [
        {
          text: 'Hadir',
          handler: () => {
            this.WriteAbsen(nama,key,mapel,'hadir')
          }
        },{
          text: 'Izin',
          handler: () => {
            this.WriteAbsen(nama,key,mapel,'izin')
          }
        },{
          text: 'Sakit',
          handler: () => {
            this.WriteAbsen(nama,key,mapel,'sakit')
          }
        },{
          text: 'Alfa',
          handler: () => {
            this.WriteAbsen(nama,key,mapel,'alfa')
          }
        },{
          text: 'Batal',
          handler: () => {
            console.log('batal')
          }
        }
      ]
    });
    actionSheet.present();
  }

  WriteAbsen(nama,key,mapel,data){

    let adaabsen = null;
        let dates = new Date();
        let month = dates.getMonth()+1;
        let keysLOG = dates.getDate()+'-'+month+'-'+dates.getFullYear() 
        
        let totalPrevious;
        this.GuruServ.GetSiswaDetail(key).subscribe(datass=>{
          if (datass.mapel[mapel].absensis[data] === "" || datass.mapel[mapel].absensis[data] === 0 || datass.mapel[mapel].absensis[data] === null) {
            totalPrevious = 1;
          }else{
            totalPrevious = datass.mapel[mapel].absensis[data] + 1;
          }

          if (datass.mapel[mapel].log_absen[keysLOG] != null) {
            console.log('ada absen')
            adaabsen = 'ada';
          }else{
            console.log('tidak ada absen')
            adaabsen = 'tidak'

          }

          localStorage.setItem('totAbsen',totalPrevious)
        })
        
        let datas = {
          "type":data,
          "key":key,
          "nama":nama,
          "mapel":mapel,
          "keylog":keysLOG
        };

           /* Create Loader */
          const loader = this.loadingCtrl.create({
            content: "Waiting , Update Absensi",
          });
        loader.present()
        let TIME_IN_MS = 400;
        let hideFooterTimeout = setTimeout( () => {
          if (adaabsen == 'tidak' ) {
            console.log("create")
              this.GuruServ.absensiSiswa(datas)

          } else {
            console.log("update")
              this.GuruServ.UpdateAbsen(datas)

          }
              loader.dismiss()
              localStorage.removeItem('totAbsen');
        }, TIME_IN_MS);

  }

}
