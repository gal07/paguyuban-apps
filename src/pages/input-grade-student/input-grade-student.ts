import { SiswaRunning } from './../../model/siswa_running';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { GuruserviceProvider } from './../../providers/guruservice/guruservice';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

/**
 * Generated class for the InputGradeStudentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-input-grade-student',
  templateUrl: 'input-grade-student.html',
})
export class InputGradeStudentPage {

  /* Segment params */
  param_segment_nilai = 'nilai';

  /* Param */
  getParam;
  getData:any;
  getDatas;

  /* Attribut */
  name = '';
  kelas= '';
  absn=0;
  h1=0;
  h2=0;
  h3=0;
  uas=0;
  uts=0;
  logabsen;
  arrayslog = [];
  /* Keseluruhan */
  absens:any;
  absenHadir= [];
  harians:any;
  utsEnd:any;
  uasEnd:any;
  TotalEnd:any;
  TypeAbsen = {"hadir":[],"sakit":[],"izin":[],"alfa":[]};


  /* Document */
  private siswadetail: AngularFirestoreDocument<SiswaRunning>;
  items_siswadetail: Observable<SiswaRunning>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private GuruServ:GuruserviceProvider,
    private afs:AngularFirestore
    ) {
    this.getParam = this.navParams.get('data');
    console.log(this.getParam)
  }

  ionViewDidLoad() {
    this.GuruServ.checkRunning().subscribe(data=>{
      
      this.siswadetail = this.afs.doc<SiswaRunning>('data_semester/'+data[0].key+'/'+'siswa'+'/'+this.getParam.key_siswa);
      this.items_siswadetail = this.siswadetail.valueChanges();
      
      this.items_siswadetail.subscribe(data=>{
        this.getData = data
        this.h1 = this.getData.mapel[this.getParam.kode_mapel].h1;
        this.h2 = this.getData.mapel[this.getParam.kode_mapel].h2;
        this.h3 = this.getData.mapel[this.getParam.kode_mapel].h3;
        this.absn = this.getData.mapel[this.getParam.kode_mapel].absensi;
        this.uts = this.getData.mapel[this.getParam.kode_mapel].uts;
        this.uas = this.getData.mapel[this.getParam.kode_mapel].uas;
        this.logabsen = this.getData.mapel[this.getParam.kode_mapel].log_absen;
        for (const key in this.logabsen) {
          this.arrayslog.push({tgl:key,absen:this.logabsen[key].toUpperCase()})
          if (this.logabsen[key] == 'hadir') {
            this.absenHadir.push(this.logabsen[key])
            this.TypeAbsen.hadir.push(this.logabsen[key])
          }
          if (this.logabsen[key] == 'izin') {
            this.TypeAbsen.izin.push(this.logabsen[key])
          }
          if (this.logabsen[key] == 'sakit') {
            this.TypeAbsen.sakit.push(this.logabsen[key])
          }
          if (this.logabsen[key] == 'alfa') {
            this.TypeAbsen.alfa.push(this.logabsen[key])
          }
        }
        console.log(this.TypeAbsen)

        /* Presentase Nilai Keseluruhan */

         // Absen
         let TotalAbsen = this.absenHadir.length
         console.log(TotalAbsen)
         this.absens = Math.round(TotalAbsen/14*10)
        //  console.log(this.TypeAbsen.hadir)
        //  console.log(this.TypeAbsen.sakit)
        //  console.log(this.TypeAbsen.izin)
        //  console.log(this.TypeAbsen.alfa)
         // Harian
         let totalharian = this.h1+this.h2+this.h3
         let finalTotalHarian = Math.round(totalharian/3)
         this.harians = Math.round(finalTotalHarian/100*20)

         // UTS
         this.utsEnd = Math.round(this.uts/100*30)

         // UAS
         this.uasEnd = Math.round(this.uas/100*40)

         // Total
         this.TotalEnd = this.absens + this.harians + this.utsEnd + this.uasEnd

      })

    })
  }

  ionViewWillLeave(){
    console.log(typeof this.h2)
    let gh = [this.h1,this.h2,this.h3,this.uts,this.uas]
    for (let index = 0; index < 4; index++) {
      if (gh[index] > 100) {
        this.GuruServ.presentToast('Nilai Tidak Boleh Lebih Dari 100, Tidak Tersimpan')
        return false;
      }

      if (gh[index] < 0) {
        this.GuruServ.presentToast('Nilai Tidak Boleh Kurang Dari 0, Tidak Tersimpan')
        return false;
      }
      
    }

    let finalTouch = {
      h1:Number(this.h1),
      h2:Number(this.h2),
      h3:Number(this.h3),
      absensi:this.absn,
      uts:Number(this.uts),
      uas:Number(this.uas)
    }

    this.GuruServ.ChangeNilaiSiswa(this.getParam.key_siswa,this.getParam.kode_mapel,finalTouch);

  }

  ionViewCanEnter(){
    
  }

  ionViewWillUnload(){
    
  }

  ionViewDidEnter(){
    this.items_siswadetail.subscribe(data=>{
      console.log(data)
    })
  }

  detil(){
    alert('sd')
  }


}
