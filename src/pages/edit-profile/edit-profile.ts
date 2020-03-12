import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaguyubanServiceProvider } from './../../providers/paguyuban-service/paguyuban-service';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  /* Data Profile */
  data = {
    "nama":"",
    "phone":"",
    "alamat":""
  }
  key:any;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private paguyubanservice:PaguyubanServiceProvider
    ) {
    let data = this.navParams.get('data')
    this.data.nama = data[0].nama
    this.data.phone = data[0].phone
    this.data.alamat = data[0].alamat
    this.key = data[0].key
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  editProfile(){
    this.paguyubanservice.UpdateProfile(this.key,this.data).then(()=>{
      this.navCtrl.pop()
    }).catch(e => {

    })
  }

}
