import { SiswaRunning } from './../../model/siswa_running';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http';

import { AlertController, ToastController, LoadingController } from 'ionic-angular';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable,Subject } from 'rxjs';
import { GuruUid } from './../../model/guruuid';
import { Guru_Running } from './../../model/guru_running';
import { Guru } from '../../model/guru';
import { Semester } from './../../model/semester';
import { map } from 'rxjs/operators';

/*
  Generated class for the PaguyubanServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PaguyubanServiceProvider {

  token:any;
  url:any;

  constructor(
    public http: HttpClient,
    public httpclient:HttpClient,
    private afs:AngularFirestore,
    public afauth:AngularFireAuth,
    ) {

    this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ._f44eKHjfG197-os_5FZVv28_lN1NwCvS5TdEpoNhcE';
    this.url = 'https://cors-anywhere.herokuapp.com/https://us-central1-paguyuban-52264.cloudfunctions.net/usermanagement/';
    console.log('Hello PaguyubanServiceProvider Provider');
  }

  /*>>>>>>>>>>>>>>>>>>>>>>>>>>>> Untuk koneksi ke cloud functions  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */

   /* Get Api with Httpclient Angular (Method POST)*/
   async APIconnectionpost(endpoint,data,type){
    return new Promise((resolve, reject) =>{
      let headers = new HttpHeaders({
        // 'Authorization': 'Bearer '+this.token,
      });
      this.httpclient.post(this.url+endpoint,{data:data,type:type},{headers:headers}).
      subscribe(res =>{ 
        resolve(res);
      }, (err) =>{
        reject(err);
      });
    }); 
  }

  /* Get Api with Httpclient Angular (Method GET) */
  async APIconnectionget(endpoint,data){
    return new Promise((resolve, reject) =>{
      let headers = new HttpHeaders({
        'Authorization': 'Bearer '+this.token,
      });
      this.httpclient.get(this.url+endpoint,{headers:headers}).
      subscribe(res =>{ 
        resolve(res);
      }, (err) =>{
        reject(err);
      });
    });
    
  }

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>> Untuk koneksi ke cloud functions  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */



                    // DIVIDER // DIVIDER// DIVIDER// DIVIDER// DIVIDER// DIVIDER// DIVIDER




/* ####################################### Untuk Koneksi Firestore ################################################## */


/**
 * Create new member
 * @param data 
 * data adalah isi data member yg akan di daftarkan
 */
async CreateNewMember(data){

  this.afs.collection('anggota').add(data).then(res => {
    console.log(res)
  }).catch(e => {
    console.log(e)
  })

}

/**
 * Get All Member
 */
async GetAllMember(){
  
  return new Promise((resolve, reject) =>{
    this.afs.collection('anggota').valueChanges().subscribe(res=>{
      resolve(res)
    })
  });
 

}


/* ####################################### Untuk Koneksi Firestore ################################################## */




}
