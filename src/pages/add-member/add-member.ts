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

  /* Property For Get Data */
  resultGetMember:any;


  /* Data Member */
  datamember = {
    "active":1,
    "nama":"",
    "email":"",
    "alamat":"",
    "kelamin":"",
    "role":0,
    "tgl_lahir":"",
    "tgl_bergabung":"",
    "parent":"",
    "phone":"",
    "create_by":"",
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

  async ionViewWillEnter(){
   
    ;(await this.paguyubanservice.GetAllMember()).subscribe(res=>{
      this.resultGetMember = res
      console.log(this.resultGetMember)
    })
    // this.paguyubanservice.GetAllMember().then((res)=>{
    //   this.resultGetMember = res
    // }).catch(e=>{
    //   this.alertservice.showAlert('Error',e,'Tutup')
    // })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMemberPage');
  }

  AddMember(){

    if (this.datamember.nama == "" || this.datamember.email == "" || this.datamember.kelamin == "" || this.datamember.role == 0 || this.datamember.tgl_lahir == "" || this.datamember.tgl_bergabung == "" || this.datamember.parent == "" || this.datamember.phone == "") {
      this.alertservice.presentToast('Tolong di isi yang ada tanda wajib nya ya',4000,'bottom')
      return false
    }

    /* Create Loader */
    const loader = this.loadingCtrl.create({
      content: "Lagi dicoba save, Tunggu ya..",
    });
    loader.present()

    this.paguyubanservice.APIconnectionpost("",this.datamember,1).then(res=>{

      /* Set Create By */
      let datauser = JSON.parse(localStorage.getItem('data_user'))
      this.datamember.create_by = datauser[0].email

      /* Set Phone number */
      this.datamember.phone = "+62"+this.datamember.phone.substring(1)

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
