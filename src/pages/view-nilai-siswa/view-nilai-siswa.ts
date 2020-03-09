import { ChartPage } from './../chart/chart';
import { SiswaserviceProvider } from './../../providers/siswaservice/siswaservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore';
import { SiswaRunning } from './../../model/siswa_running';
import { Observable } from 'rxjs';

/**
 * Generated class for the ViewNilaiSiswaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-nilai-siswa',
  templateUrl: 'view-nilai-siswa.html',
})
export class ViewNilaiSiswaPage {

   /* Segment params */
   param_segment_nilai = 'nilai';

  /* Document */
  private siswadetail: AngularFirestoreDocument<SiswaRunning>;
  items_siswadetail: Observable<SiswaRunning>;

  /* Attribut */
  nama;
  allData;
  allData2;
  h1=0;
  h2=0;
  h3=0;
  absn=0;
  uts=0;
  uas=0;
  kodekelas='';
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private siswaservice: SiswaserviceProvider,
    private afs:AngularFirestore
    ) {
   
  }

  ionViewDidLoad() {
    let kode = this.navParams.get('data')
    this.siswaservice.checkRunning().subscribe(datas=>{
         /** Set localstorage karena mencegah delay yang akan jadi error */
      let nisns = JSON.parse(localStorage.getItem('nisn'))
      let getRunningSemester = localStorage.getItem('semester')

      this.siswaservice.getMapelByNisn(nisns[0].key,getRunningSemester).subscribe(data=>{
        this.allData2 = data

        this.siswadetail = this.afs.doc<SiswaRunning>('data_semester/'+datas[0].key+'/'+'siswa'+'/'+this.allData2[0].key);
        this.items_siswadetail = this.siswadetail.valueChanges();
        
        this.items_siswadetail.subscribe(data=>{
         this.nama = nisns[0].name
         this.kodekelas = kode
         this.allData = data
         this.h1 = this.allData.mapel[kode].h1
         this.h2 = this.allData.mapel[kode].h2
         this.h3 = this.allData.mapel[kode].h3
         this.uts = this.allData.mapel[kode].uts
         this.uas = this.allData.mapel[kode].uas
         this.absn = this.allData.mapel[kode].absensi
         this.logabsen = this.allData.mapel[kode].log_absen;


         /* Set For Absen */
         for (const key in this.logabsen) {
            this.arrayslog.push({tgl:key,absen:this.logabsen[key].toUpperCase()})
            if (this.logabsen[key] == 'hadir') {
              this.absenHadir.push(this.logabsen[key])
              this.TypeAbsen.hadir.push(this.logabsen[key])
            }

            if (this.logabsen[key] == 'sakit') {
              this.TypeAbsen.sakit.push(this.logabsen[key])
            }

            if (this.logabsen[key] == 'izin') {
              this.TypeAbsen.izin.push(this.logabsen[key])
            }

            if (this.logabsen[key] == 'alfa') {
              this.TypeAbsen.alfa.push(this.logabsen[key])
            }

          }
        

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


        /* Presentase Nilai Keseluruhan */


         

        })

      })
  

    })
  }

  ionViewWillEnter(){
  }

  ionViewWillLeave(){
   
  }

  chart(){
    this.navCtrl.push(ChartPage)
  }


}
