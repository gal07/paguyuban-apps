import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertProvider } from './../alert/alert';

import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore'; //AngularFirestoreDocument
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Anggota } from './../../myreference/anggota';
import { JadwalAcara } from './../../myreference/jadwal-acara';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';


/*
  Generated class for the PaguyubanServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PaguyubanServiceProvider {

  /* Reference */
  private anggota: AngularFirestoreCollection<Anggota>;
  items_anggota: Observable<Anggota[]>;

  private jadwal: AngularFirestoreCollection<JadwalAcara>;
  items_jadwal: Observable<JadwalAcara[]>;

  token:any;
  url:any;

  constructor(
    public http: HttpClient,
    public httpclient:HttpClient,
    private afs:AngularFirestore,
    public afauth:AngularFireAuth,
    public alertservice:AlertProvider,
    private callNumber: CallNumber,
    private sms: SMS

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
  
  // return new Promise((resolve, reject) =>{
  //   this.afs.collection('anggota',ref=>{return ref.where('active','==',1).orderBy('nama')}).snapshotChanges().pipe(
  //     map(changes => 
  //       changes.map(c => ({key : c.payload.doc.id }))
  //     )
  //   );
  // });

  this.anggota = this.afs.collection<Anggota>('anggota',ref=>{return ref.orderBy('nama')});
  this.items_anggota = this.anggota.snapshotChanges().pipe(
    map(changes=>
      changes.map(c => ({key: c.payload.doc.id, ...c.payload.doc.data()}))
      )
  );

  return this.items_anggota;
 
}


/**
 * Check Email Before Login
 * 
 */
async CheckEmail(email){

  this.anggota = this.afs.collection<Anggota>('anggota',ref=>{return ref.where('email','==',email).where('active','==',1)});
  this.items_anggota = this.anggota.snapshotChanges().pipe(
    map(changes=>
      changes.map(c => ({key: c.payload.doc.id, ...c.payload.doc.data()}))
      )
  );

  return this.items_anggota;

  // return new Promise((resolve, reject) =>{
  //   this.afs.collection('anggota',ref=>{ return ref.where('email','==',email).where('active','==',1) }).valueChanges().subscribe(res=>{
  //     resolve(res)
  //   })
  // })

}


/***
 * 
 * Active & Deactive User
 */
async ChangeStatusActive(k,value){

  switch (value) {
    case 1:
      this.afs.collection('anggota').doc('/'+k).update({active:0}).then(()=>{
        this.alertservice.presentToast('User Di Nonaktifkan',3000,'bottom')
      }).catch(e => {
        this.alertservice.showAlert('Error',e,'Tutup')
      })
      break;
  
    case 0:
      this.afs.collection('anggota').doc('/'+k).update({active:1}).then(()=>{
        this.alertservice.presentToast('User Di Aktifkan',3000,'bottom')
      }).catch(e => {
        this.alertservice.showAlert('Error',e,'Tutup')
      })
      break;
    
    default:
      break;
  }

}


/**
 * Call Number Service
 */
async CallNumber(number){
  this.callNumber.callNumber(number,true).then(()=>{

  }).catch(e => {
    this.alertservice.showAlert('Error',e,'Tutup')
  })
}


/***
 * SMS Service
 */
async SMS(number,message){
    this.sms.send(number,message).then(res => {
      this.alertservice.presentToast('Pesan Terkirim',3000,'bottom')
    }).catch(e=>{
      this.alertservice.presentToast(e,3000,'bottom')
    })
}


/**
 * Update Profile
 */
async UpdateProfile(k,data){
  this.afs.collection('anggota').doc('/'+k).update(data).then(()=>{
    this.alertservice.presentToast('Belum berubah ya ? Coba deh logout dulu',3000,'bottom')
  }).catch(e => {
    this.alertservice.presentToast(e,3000,'bottom')
  })
}


/***
 * Get Jadwal Acara
 */
async GetJadwalAcara(){

  this.jadwal = this.afs.collection<JadwalAcara>('jadwal');
  this.items_jadwal = this.jadwal.snapshotChanges().pipe(
    map(changes=>
      changes.map(c => ({key: c.payload.doc.id, ...c.payload.doc.data()}))
      )
  );

  return this.items_jadwal;

}

/**
 * Create Event
 */
async CreateEvent(data){

  this.afs.collection('jadwal').add(data).then((res)=>{
    console.log(res)
  }).catch(e => {
    console.log(e)
  })

}


/**
 * Delete Event
 */
async DeleteEvent(k){
  this.afs.collection('jadwal').doc('/'+k).delete().then((res)=>{
    console.log(res)
  }).catch(e => {
    console.log(e)
  })
}

/**
 * 
 * Get Parent Member
 */
async GetParent(parent,uid = null){

  if (parent == 0) {
    console.log('get parent '+uid);
    this.anggota = this.afs.collection<Anggota>('anggota',ref=>{return ref.where('parent','==',uid).where('active','==',1)});
  }else{
    this.anggota = this.afs.collection<Anggota>('anggota',ref=>{return ref.where('uid','==',parent).where('active','==',1)});
  }

  this.items_anggota = this.anggota.snapshotChanges().pipe(
    map(changes=>
      changes.map(c => ({key: c.payload.doc.id, ...c.payload.doc.data()}))
      )
  );

  return this.items_anggota;

}


/* ####################################### Untuk Koneksi Firestore ################################################## */




}
