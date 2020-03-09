import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App} from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { GuruserviceProvider } from '../../providers/guruservice/guruservice';

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  edit = 0;

  /* Attribut */
  name = '';
  email;
  alamat;
  tempat_pendidikan;
  pendidikan;
  role;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afauth:AngularFireAuth,
    public app:App,
    private guruService: GuruserviceProvider
    ) {

      let roles = JSON.parse(localStorage.getItem('role'))
      if (roles == 1) {
        /* Guru */
        this.role = 1
        let bio = JSON.parse(localStorage.getItem('nip'))
        this.name = bio[0].name
        this.email = bio[0].email
        this.alamat = bio[0].alamat
        this.pendidikan = bio[0].pendidikan.pendidikan_terakhir
        this.tempat_pendidikan = bio[0].pendidikan.pendidikan_tempat
        console.log(this.name)
      }else if(roles == 2){
        /* Siswa */
        this.role = 2
        let bio = JSON.parse(localStorage.getItem('nisn'))
        this.name = bio[0].name
        this.email = bio[0].email
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

  ionViewWillEnter(){
  
  }

  logout(){
    this.afauth.auth.signOut();
    localStorage.removeItem('semester');
    localStorage.removeItem('nip');
    localStorage.removeItem('nisn');
    localStorage.removeItem('role');
    localStorage.removeItem('mapel_siswa');
    localStorage.removeItem('totAbsen');
    localStorage.removeItem('TodayAbsen');
    localStorage.removeItem('numberoftypechoose');
    localStorage.removeItem('numberoftypechoose2');
    localStorage.removeItem('recordabsentoday');

    setTimeout(() => this.app.getRootNav().setRoot(LoginPage), 1000);

  }

  onChange(role){
    if (this.edit == 0) {

      if (role == 1) {
        let key = JSON.parse(localStorage.getItem('nip'))
        let data = {
          "alamat":this.alamat,
          "pendidikan":{
            "pendidikan_tempat":this.tempat_pendidikan,
            "pendidikan_terakhir":this.pendidikan.toUpperCase()
          }
        }
        console.log(data)
        this.guruService.updateDataGuru(data,key[0].key);
      }
     

    }else if(this.edit == 1){

    }
  }

}
