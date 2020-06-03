import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  meditasyon: any;
  sure:number;
  anlik:number;

  toplamSure:string="00:00";
  anlikSure:string="00:00";

  isPlay:boolean=false;

  player =new  Audio();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.meditasyon = navParams.get('meditasyon');

  }

  ionViewDidLoad(){
    this.player.src= "http://mistikyol.com/mistikmobil/audios/"+this.meditasyon.sesdosyasi;
    console.log(this.player.src);
  }

  playPause(){
    if(this.isPlay){
      this.player.pause();
      this.isPlay=false;
    } else {
      this.player.play();
      this.isPlay=true;
    }
  }

}
