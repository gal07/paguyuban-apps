import { HomePage } from './../home/home';
import { ListMemberPage } from './../list-member/list-member';
import { Component } from '@angular/core';
import { IndexGuruPage } from './../index-guru/index-guru';
import { IndexOrangtuaPage } from './../index-orangtua/index-orangtua';
import { IndexSiswaPage } from './../index-siswa/index-siswa';
import { UsersPage } from './../users/users';
import { NavParams } from 'ionic-angular';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root;
  tab2Root;

  /**
   * Role 1 adalah Guru
   * Role 2 adalah Siswa
   * Role 3 adalah Orang tua
   */

  constructor( public params: NavParams ) {
    //let roles = this.params.get('data');
    /* Guru */
    //if (roles.role == 1) {
    this.tab1Root = HomePage
    this.tab2Root = ListMemberPage
    /* siswa */
    // }else if(roles.role == 2){
    // this.tab1Root = IndexSiswaPage
    // this.tab2Root = UsersPage
    /* Orangtua */
    // }else if(roles.role == 3){
    // this.tab1Root = IndexOrangtuaPage
    // this.tab2Root = UsersPage
    // }

  }
}
