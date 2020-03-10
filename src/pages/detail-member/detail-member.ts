import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailMemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-member',
  templateUrl: 'detail-member.html',
})
export class DetailMemberPage {

  /* Property Data Member */
  dataMember:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dataMember = this.navParams.get('data')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailMemberPage');
  }

  rolesName(val){
    /**
     * Get Roles Name
     */
      let arr = {
        "2":"Ketua",
        "3":"Wakil Ketua",
        "4":"Sekretaris",
        "5":"Humas",
        "6":"Anggota"
      }

      return arr[val]

  }

}
