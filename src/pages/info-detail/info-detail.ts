import { SiswaserviceProvider } from './../../providers/siswaservice/siswaservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the InfoDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-detail',
  templateUrl: 'info-detail.html',
})
export class InfoDetailPage {

  Getdata;

  /* Attribute */
  nama;
  email;
  alamat;
  jenis_kelamin;
  jurusan;
  nisn;
  tempat_lahir;
  tgl_lahir;

  /* Orang Tua */
  alamat_wali;
  email_wali;
  nama_wali;
  pekerjaan_wali;
  penghasilan_wali;
  role;
  telp_wali;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private siswaService: SiswaserviceProvider,
    public loadingCtrl: LoadingController,

    ) {
  }

  ionViewDidLoad() {
     /* Create Loader */
     const loader = this.loadingCtrl.create({
      content: "Load Data...",
    });

    this.siswaService.getDetailSiswa(this.navParams.get('data')).subscribe(data=>{
      this.Getdata = data;
      console.log(data)
      this.nama = this.Getdata.name;
      this.email = this.Getdata.email;
      this.alamat = this.Getdata.alamat;
      this.jenis_kelamin = this.Getdata.jenis_kelamin;
      this.jurusan = this.Getdata.jurusan;
      this.nisn = this.Getdata.nisn;
      this.tempat_lahir = this.Getdata.tempat_lahir;
      let dates = new Date(this.Getdata.tgl_lahir.toDate());
      let month = dates.getMonth()+1;
      this.tgl_lahir = dates.getDate()+'-'+month+'-'+dates.getFullYear();
      
      this.alamat_wali = this.Getdata.orangtua.alamat_wali;
      this.email_wali = this.Getdata.orangtua.email_wali;
      this.nama_wali = this.Getdata.orangtua.nama_wali;
      this.pekerjaan_wali = this.Getdata.orangtua.pekerjaan_wali;
      this.penghasilan_wali = this.numberWithCommas(this.Getdata.orangtua.penghasilan_wali);
      this.role = this.Getdata.orangtua.role;
      this.telp_wali = this.Getdata.orangtua.telp_wali;
    })
    
    
  }

numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

}
