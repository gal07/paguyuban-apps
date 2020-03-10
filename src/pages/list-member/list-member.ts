import { AddMemberPage } from './../add-member/add-member';
import { DetailMemberPage } from './../detail-member/detail-member';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { PaguyubanServiceProvider } from './../../providers/paguyuban-service/paguyuban-service';
import { AlertProvider } from './../../providers/alert/alert';

/**
 * Generated class for the ListMemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-member',
  templateUrl: 'list-member.html',
})
export class ListMemberPage {

  /* Property Get result member */
  resultMember:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public paguyubanservice: PaguyubanServiceProvider,
    public alertservice: AlertProvider,
    public loadingCtrl: LoadingController,
    ) {

    
  }

  ionViewWillEnter(){
    /* Get Member */
    this.getMember()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListMemberPage');
  }

  async getMember(){

     /* Create Loader */
     const loader = this.loadingCtrl.create({
      content: "Sebentar ya, Lagi ambil data",
    });
    loader.present()

    this.paguyubanservice.GetAllMember().then(res => {
      this.resultMember = res
      console.log(res);
      loader.dismiss()
    }).catch(e=>{
      console.log(e)
      loader.dismiss()
    });
  }

  toDetail(data){
    this.navCtrl.push(DetailMemberPage,{data:data});
  }

  toAddMember(){
    this.navCtrl.push(AddMemberPage)
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
