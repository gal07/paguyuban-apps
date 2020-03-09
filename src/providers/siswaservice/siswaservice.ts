import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController,ToastController} from 'ionic-angular';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable,Subject } from 'rxjs';
import { GuruUid } from './../../model/guruuid';
import { Guru_Running } from './../../model/guru_running';
import { Guru } from '../../model/guru';
import { SiswaRunning } from './../../model/siswa_running';
import { Siswa } from '../../model/siswa';
import { Semester } from './../../model/semester';
import { map } from 'rxjs/operators';
/*
  Generated class for the SiswaserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SiswaserviceProvider {

    /* Collection */
    private guruuid: AngularFirestoreCollection<GuruUid>;
    items_guruuid: Observable<GuruUid[]>;
  
    private guru_running: AngularFirestoreCollection<Guru_Running>;
    items_guru_running: Observable<Guru_Running[]>;
  
    private SemesterInterface: AngularFirestoreCollection<Semester>;
    items_semester: Observable<Semester[]>;
  
    private guruInterface: AngularFirestoreCollection<Guru>;
    items_guru: Observable<Guru[]>;
  
    private siswaRunninginterface: AngularFirestoreCollection<SiswaRunning>;
    items_siswarunning: Observable<SiswaRunning[]>;

    private siswaInterface: AngularFirestoreCollection<Siswa>;
    items_siswaiInterface: Observable<Siswa[]>;
  
    /* Document */
    private siswa_running_detail: AngularFirestoreDocument<SiswaRunning>;
    doc_siswarunnin_detail: Observable<SiswaRunning>

  constructor(
    public http: HttpClient,
    public alertController: AlertController,
    private afs:AngularFirestore,
    public toastCtrl: ToastController,
  ) {
    console.log('Hello SiswaserviceProvider Provider');
  }

    /**
   * Check Running Semester
   */
  checkRunning(){
    this.SemesterInterface = this.afs.collection<Semester>('data_semester',ref=>{
      return ref.where('status','==',1);
    });
    this.items_semester = this.SemesterInterface.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    );

    this.items_semester.subscribe(data=>{
      localStorage.setItem('semester',data[0].key)
    })
    
    return this.items_semester;

  }

  /**
   * 
   * @param nisn 
   * @param semester 
   * semester adalah tahun ajaran yg sedang berjalan skrg
   */
  getMapelByNisn(nisn,semester){

    this.checkRunning();
    this.siswaRunninginterface = this.afs.collection('data_semester').doc('/'+semester).collection('/siswa',ref=>{
      return ref.where('id','==',nisn)
    })
    this.items_siswarunning = this.siswaRunninginterface.snapshotChanges().pipe(
      map(changes=>
        changes.map(c => ({key: c.payload.doc.id, ...c.payload.doc.data()}))
        )
    );
    return this.items_siswarunning;
  }

    /**
   * 
   * @param email 
   */
  getNisnByEmail(email){
    this.siswaInterface = this.afs.collection<Siswa>('biodata-siswa',ref=>{
      return ref.where('email','==',email)
    });
    this.items_siswaiInterface = this.siswaInterface.snapshotChanges().pipe(
      map(changes=>
        changes.map(c => ({key: c.payload.doc.id, ...c.payload.doc.data()}))
        )
    );
    return this.items_siswaiInterface;
  }

  getDetailSiswa(n){
    this.checkRunning();
    this.siswa_running_detail = this.afs.collection('biodata-siswa').doc<SiswaRunning>('/'+n);
    this.doc_siswarunnin_detail = this.siswa_running_detail.valueChanges();
    return this.doc_siswarunnin_detail;
  }

  

}
