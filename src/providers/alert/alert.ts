import { GuruserviceProvider } from './../guruservice/guruservice';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController,ToastController } from 'ionic-angular';
import { getLocaleMonthNames } from '@angular/common';



/*
  Generated class for the AlertProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertProvider {

  constructor(
    public http: HttpClient,
    public alertController: AlertController,
    private guruserv :GuruserviceProvider,
    public loadingCtrl: LoadingController,
    public toastctrl:ToastController
    ) {
    console.log('Hello AlertProvider Provider');
  }

  showAlert(title,subtitle,titlebutton) {
    const alert = this.alertController.create({
      title: title,
      subTitle:subtitle,
      buttons: [titlebutton]
    });
    alert.present();
  }

  showPrompt() {
    const prompt = this.alertController.create({
      title: 'Login',
      message: "Enter a name for this new album you're so keen on adding",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  showConfirm() {
    const confirm = this.alertController.create({
      title: 'Use this lightsaber?',
      message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  showRadio(nama,key,mapel) {
    let alert = this.alertController.create();
    alert.setTitle('Absen '+nama);

    alert.addInput({
      type: 'radio',
      label: 'Hadir',
      value: 'hadir',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Izin',
      value: 'izin',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'Sakit',
      value: 'sakit',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'Alfa',
      value: 'alfa',
      checked: false
    });
    
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        let adaabsen = null;
        let dates = new Date();
        let month = dates.getMonth()+1;
        let keysLOG = dates.getDate()+'-'+month+'-'+dates.getFullYear() 
        
        let totalPrevious;
        this.guruserv.GetSiswaDetail(key).subscribe(datass=>{
          if (datass.mapel[mapel].absensis[data] === "" || datass.mapel[mapel].absensis[data] === 0 || datass.mapel[mapel].absensis[data] === null) {
            totalPrevious = 1;
          }else{
            totalPrevious = datass.mapel[mapel].absensis[data] + 1;
          }

          if (datass.mapel[mapel].log_absen[keysLOG] != null) {
            console.log('ada absen')
            adaabsen = 'ada';
          }else{
            console.log('tidak ada absen')
            adaabsen = 'tidak'

          }

          localStorage.setItem('totAbsen',totalPrevious)
        })
        
        let datas = {
          "type":data,
          "key":key,
          "nama":nama,
          "mapel":mapel,
          "keylog":keysLOG
        };

           /* Create Loader */
          const loader = this.loadingCtrl.create({
            content: "Waiting , Update Absensi",
          });
        loader.present()
        let TIME_IN_MS = 1000;
        let hideFooterTimeout = setTimeout( () => {
          if (adaabsen == 'tidak' ) {
            console.log("create")
              this.guruserv.absensiSiswa(datas)

          } else {
            console.log("update")
              this.guruserv.UpdateAbsen(datas)

          }
              loader.dismiss()
              localStorage.removeItem('totAbsen');
        }, TIME_IN_MS);
             
      }
    });
    alert.present();
  }

  /* membuat pesan */
  presentToast(msg,dur,position) {
    let toast = this.toastctrl.create({
      message: msg,
      duration: dur,
      position:position
    });
    toast.present();
  }

  /**
   * Loading Controller
   */
  presentLoader(on){
     /* Create Loader */
     const loader = this.loadingCtrl.create({
      content: "Waiting , Update Absensi",
    });

    if (on == 1) {
      loader.present()
    }else if(on == 2){
      loader.dismiss()
    }

  }

}
