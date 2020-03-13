import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaguyubanServiceProvider } from './../../providers/paguyuban-service/paguyuban-service';

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
  parent:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public paguyubanservice: PaguyubanServiceProvider
    ) {
    this.dataMember = this.navParams.get('data')
    this.GetParent(this.dataMember.parent,this.dataMember.uid)
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

  async Call(number){
    this.paguyubanservice.CallNumber(number)
  }

  async GetParent(parent,uid){
    console.log('uid : '+uid)
    console.log('parent : '+parent)
    if (parent == 0) {
      console.log('ini parent');
      (await this.paguyubanservice.GetParent(parent,uid)).subscribe(res=>{
        this.parent = res
      })
    }else{
      console.log('ini bukan parent');
      (await this.paguyubanservice.GetParent(parent)).subscribe(res => {
       this.parent = res
      })
    }
  }

 async toDetail(data){
    this.navCtrl.push(DetailMemberPage,{data:data});
  }

}
