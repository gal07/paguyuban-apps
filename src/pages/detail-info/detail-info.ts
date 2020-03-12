import { EditProfilePage } from './../edit-profile/edit-profile';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,App} from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';

/**
 * Generated class for the DetailInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-info',
  templateUrl: 'detail-info.html',
})
export class DetailInfoPage {
  
  /* Property Information user */
  nama:any;
  alamat:any;
  role:any;
  email:any;
  kelamin:any;
  phone:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afs:AngularFireAuth,
    public app:App
    ) {

    let result = JSON.parse(localStorage.getItem('data_user'))    
    this.nama = result[0].nama
    this.alamat = result[0].alamat
    this.role = this.rolesName(result[0].role)
    this.email = result[0].email
    this.kelamin = result[0].kelamin
    this.phone = result[0].phone
  }

  ionViewWillEnter(){
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailInfoPage');
  }

  async logOut(){
    this.afs.auth.signOut()
    localStorage.removeItem('datalogin')
    localStorage.removeItem('data_user')
    setTimeout(() => this.app.getRootNav().setRoot(LoginPage), 1000);
  }

  rolesName(val){
    /**
     * Get Roles Name
     */
      let arr = {
        "1":"Administrator",
        "2":"Ketua",
        "3":"Wakil Ketua",
        "4":"Sekretaris",
        "5":"Humas",
        "6":"Anggota"
      }

      return arr[val]

  }

  async editProfile(){
    let data = JSON.parse(localStorage.getItem('data_user'))
    this.navCtrl.push(EditProfilePage,{data:data})
  }

}
