import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Meditasyon } from '../../entities/meditasyon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import  'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  sayfa?: any;
  meditasyonlar: Meditasyon[];
  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private http: Http) {


    this.sayfa = navParams.get('data');
    console.log(this.sayfa);
    }

    getMeditasyon():Observable<Meditasyon[]>{
      return this.http.get('http://mistikyol.com/mistikmobil/mobiljson.php')
      .map(response => response.json());
    }

    getDataFromWeb() {
      this.getMeditasyon().subscribe(p => {
        this.meditasyonlar = p['meditasyonlar'];
        console.log(this.meditasyonlar);
      })
    }

    ionViewDidLoad(){
      this.getDataFromWeb();
    }

    goMeditasyon(meditasyon){
      this.navCtrl.push(ListPage, {
        meditasyon:meditasyon
      })
    }
}
