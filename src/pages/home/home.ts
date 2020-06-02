import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  sayfa?: any;
  constructor(public navCtrl: NavController,
              private navParams: NavParams) {


    this.sayfa = navParams.get('data');
    console.log(this.sayfa);
  }

}
