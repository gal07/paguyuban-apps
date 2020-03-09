import { SiswaRunning } from './../../model/siswa_running';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  Generated class for the AlertProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GuruserviceProvider {

  /* Forgot Pass */
  datasForgot;
  /* Attribute*/
  forUpdateAbsen;

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

  /* Document */
  private siswa_running_detail: AngularFirestoreDocument<SiswaRunning>;
  doc_siswarunnin_detail: Observable<SiswaRunning>

  constructor(
    public http: HttpClient,
    public alertController: AlertController,
    private afs:AngularFirestore,
    public afauth:AngularFireAuth,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    ) {
    console.log('Hello AlertProvider Provider');
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
 * get Guru UID
 */
  getGuruUiD(){
    
    this.guruuid = this.afs.collection<GuruUid>('guru_uid');
    this.items_guruuid = this.guruuid.snapshotChanges().pipe(
      map(changes=>
        changes.map(c => ({key: c.payload.doc.id, ...c.payload.doc.data()}))
        )
    );

    return this.items_guruuid;
  }

  /**
   * 
   * @param email 
   */
  getNipByEmail(email){
    this.guruInterface = this.afs.collection<Guru>('biodata-guru',ref=>{
      return ref.where('email','==',email)
    });
    this.items_guru = this.guruInterface.snapshotChanges().pipe(
      map(changes=>
        changes.map(c => ({key: c.payload.doc.id, ...c.payload.doc.data()}))
        )
    );
    return this.items_guru;
  }

  /**
   * 
   * @param email 
   */
  check_guru_uid(email){

    this.guruuid = this.afs.collection<GuruUid>('guru_uid',ref=>{
      return ref.where('email','==',email)
    });
    this.items_guruuid = this.guruuid.snapshotChanges().pipe(
      map(changes=>
        changes.map(c => ({key: c.payload.doc.id, ...c.payload.doc.data()}))
        )
    );
    return this.items_guruuid;

  }

  /**
   * 
   * @param email 
   */
  check_siswa_uid(email){

    this.guruuid = this.afs.collection<GuruUid>('siswa_uid',ref=>{
      return ref.where('email','==',email)
    });
    this.items_guruuid = this.guruuid.snapshotChanges().pipe(
      map(changes=>
        changes.map(c => ({key: c.payload.doc.id, ...c.payload.doc.data()}))
        )
    );
    return this.items_guruuid;

  }

  /**
   * 
   * @param email 
   */
  check_orangtua_uid(email){

    this.guruuid = this.afs.collection<GuruUid>('orangtua_uid',ref=>{
      return ref.where('email','==',email)
    });
    this.items_guruuid = this.guruuid.snapshotChanges().pipe(
      map(changes=>
        changes.map(c => ({key: c.payload.doc.id, ...c.payload.doc.data()}))
        )
    );
    return this.items_guruuid;

  }

  /**
   * 
   * @param nip 
   * @param semester 
   * semester adalah tahun ajaran yg sedang berjalan skrg
   */
  getMapelByNip(nip,semester){

    this.checkRunning();
    this.guru_running = this.afs.collection('data_semester').doc('/'+semester).collection('/guru',ref=>{
      return ref.where('id','==',nip)
    })
    this.items_guru_running = this.guru_running.snapshotChanges().pipe(
      map(changes=>
        changes.map(c => ({key: c.payload.doc.id, ...c.payload.doc.data()}))
        )
    );
    return this.items_guru_running;
  }

  /**
   * 
   * @param k 
   * k adalah kode mapel
   */
  getSiswaByMapel(k){
    this.checkRunning();
    this.siswaRunninginterface = this.afs.collection('data_semester').doc('/'+localStorage.getItem('semester')).collection('/siswa',ref=>{
      return ref.where('kelas','==',k.substring(4))
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
   * Get Siswa Detail
   * 
   */
  GetSiswaDetail(n){
    this.checkRunning();
    this.siswa_running_detail = this.afs.collection('data_semester').doc('/'+localStorage.getItem('semester')).collection('/siswa').doc<SiswaRunning>('/'+n);
    this.doc_siswarunnin_detail = this.siswa_running_detail.valueChanges();
    return this.doc_siswarunnin_detail;
  }

  /**
   * 
   * Change Nilai
   * 
   */
  ChangeNilaiSiswa(k,nama,nilai){
    
    var Updates = {};
    Updates['mapel.'+nama+'.h1'] = nilai.h1;
    Updates['mapel.'+nama+'.h2'] = nilai.h2;
    Updates['mapel.'+nama+'.h3'] = nilai.h3;
    Updates['mapel.'+nama+'.absensi'] = nilai.absensi;
    Updates['mapel.'+nama+'.uts'] = nilai.uts;
    Updates['mapel.'+nama+'.uas'] = nilai.uas;

    this.afs.collection('data_semester').doc('/'+localStorage.getItem('semester')).collection('/siswa').doc('/'+k).update(Updates).then(()=>{
      this.presentToast('Nilai Telah Disimpan')
    }).catch(error=>{
      this.presentToast(error)
    });
  }

  /**
   * Update Bio Guru 
   * @param d 
   * @param k 
   */
  updateDataGuru(d,k){
    this.afs.collection('biodata-guru').doc('/'+k).update(d).then(()=>{
      this.presentToast("Data Telah Di Update")
    }).catch(error=>{
      this.presentToast(error)
    })
  }

  /**
   * 
   * @param data
   */
  absensiSiswa(data){
    /* Get Actual Data Absen */
      let Updates = {};        
      var i = parseInt(localStorage.getItem('totAbsen'));

      console.log(localStorage.getItem('totAbsen'))
      Updates['mapel.'+data.mapel+'.absensis.'+data.type] = parseInt(localStorage.getItem('totAbsen'));

      this.afs.collection('data_semester').doc('/'+localStorage.getItem('semester')).collection('/siswa').doc('/'+data.key).update(Updates).then(()=>{
        this.presentToast(data.nama+' '+data.type)
        this.CreateLogAbsen(data.keylog,data.mapel,data.type,data.key)
      }).catch(error=>{
        this.presentToast(error)
      })

      let TIME_IN_MS = 500;
      let hideFooterTimeout = setTimeout( () => {
            localStorage.removeItem('totAbsen');
      }, TIME_IN_MS);
    
  }

  /**
   * Update Absen
   * @param data
   */
  UpdateAbsen(data){

    // /* Get Jumlah */
    let abs = null
    let record = null
    let abs2 = null
    this.GetSiswaDetail(data.key).subscribe(datas=>{
     
      /* Get Record Absen */
      record = datas.mapel[data.mapel].log_absen[data.keylog]
      localStorage.setItem('recordabsentoday',record)

       /* Get Number Absen terpilih */
       abs = datas.mapel[data.mapel].absensis[data.type]
       localStorage.setItem('numberoftypechoose',abs)

       /* Get NUmber Absen Sebelum nya */
       abs2 = datas.mapel[data.mapel].absensis[record]
       localStorage.setItem('numberoftypechoose2',abs2)

    })

    

    let TIME_IN_MS = 500;
    let hideFooterTimeout = setTimeout( () => {

      /* Mengurangi Nilai absen */
      let decrement = {}

      if (data.type == localStorage.getItem('recordabsentoday')) {
        this.presentToast('Absen '+ data.nama +' Sudah Dipilih '+data.type+' Sebelum nya')
      }else{
        /* Tambah Nilai */
        decrement['mapel.'+data.mapel+'.absensis.'+data.type] = parseInt(localStorage.getItem('numberoftypechoose')) + 1;
        /* Kurang Nilai */
        decrement['mapel.'+data.mapel+'.absensis.'+localStorage.getItem('recordabsentoday')] = parseInt(localStorage.getItem('numberoftypechoose2')) - 1;
        /* Ubah Log Absen Untuk Hari Ini */
        decrement['mapel.'+data.mapel+'.log_absen.'+data.keylog] = data.type;
        console.log(decrement)

        this.afs.collection('data_semester').doc('/'+localStorage.getItem('semester')).collection('/siswa').doc('/'+data.key).update(decrement)
        this.presentToast('Absen '+ data.nama +' Sudah Dirubah Menjadi '+data.type+'')
        // console.log('numberoftypechoose '+localStorage.getItem('numberoftypechoose'))
        // console.log('numberoftypechoose2 '+localStorage.getItem('numberoftypechoose2'))
        // console.log('recordabsen '+localStorage.getItem('recordabsentoday'))
      }
          localStorage.removeItem('totAbsen');
          localStorage.removeItem('TodayAbsen');
          localStorage.removeItem('numberoftypechoose');
          localStorage.removeItem('numberoftypechoose2');
          localStorage.removeItem('recordabsentoday');
    }, TIME_IN_MS);

  }

  /**
   * Create Log Absen
   * @param msg 
   */
  CreateLogAbsen(keylog,mapel,type,key){
    /* Create log */
    let logs = {}
    var b = keylog
    logs['mapel.'+mapel+'.log_absen.'+b] = type;
    this.afs.collection('data_semester').doc('/'+localStorage.getItem('semester')).collection('/siswa').doc('/'+key).update(logs)
    localStorage.removeItem('TodayAbsen')
  }

  /**
   * 
   * @param k 
   * @param m 
   */
  getAbsenLog(k,m){
    this.GetSiswaDetail(k).subscribe(data => {
      console.log(data)
    })
  }

  forgotPassword(datas){
    this.afauth.auth.sendPasswordResetEmail(datas).then(()=>{
      this.presentToast('Check Your Email, For Reset Password')
    }).catch(error=>{
      this.presentToast(error)
    })
  }

    /* membuat pesan */
    presentToast(msg) {
      let toast = this.toastCtrl.create({
        message: msg,
        duration: 2000
      });
      toast.present();
    }

}
