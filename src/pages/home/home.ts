import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public datepicker:DatePicker
    ) {

     

  }

  async Showdate(){

    this.datepicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datepicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
    );
    

  }

}
