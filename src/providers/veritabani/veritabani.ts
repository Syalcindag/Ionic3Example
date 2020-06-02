import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject} from '@ionic-native/sqlite'
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Meditasyon } from "../../entities/meditasyon";

/*
  Generated class for the VeritabaniProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VeritabaniProvider {

  private veritabani: SQLiteObject;
  private veritabanihazir: BehaviorSubject<boolean>;
  ms: Meditasyon[];

  constructor(public http: HttpClient,
    private storage: Storage,
    public sqlite:SQLite,
    private platform: Platform) {
    console.log('Hello VeritabaniProvider Provider');

    this.veritabanihazir = new BehaviorSubject<boolean>(false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'meditasyonVeritabani',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.veritabani = db;
        this.storage.get('tablohazir').then(durum => {
          if (durum) {
            this.veritabanihazir.next(true);
          } else {
            this.veritabani.executeSql('CREATE TABLE veriler(id INTEGER PRİMARY KEY AUTOINCREMENT, baslik TEXT, aciklama TEXT, thumbnail TEXT UNIQUE, sesdosyasi TEXT UNIQUE, favori INTEGER DEFAULT 0, tarih TEXT,kategori INTEGER DEFAULT 0, sira INTEGER DEFAULT 0)', [])
              .then(() => console.log('Executed SQL'))
              .catch(e => console.log(e));
            this.veritabanihazir.next(true);
            this.storage.set('tablohazir', true);
          }
        })
      })
    }).catch(e => console.log(e));
  }

  veriEkle(baslik, aciklama, resim, ses, tarih, kategori, size) {
    let data = [baslik, aciklama, resim, ses, tarih, kategori, size];
    return this.veritabani.executeSql('insert into veriler (baslik, aciklama, thumbnail, sesdosyasi, tarih, kategori, sira) values(?,?,?,?,?,?,?)', data)
      .then(res => {
        return res;
      }).catch(e => console.log(e));
  }

  favoriGuncelle(sira, durum) {
    return this.veritabani.executeSql('update veriler set (favori = ?) where sira=?', [durum, sira])
      .then(res => {
        return res;
      }).catch(e => console.log(e));
  }

  tumDatayiGetir(kategori) {
    var query: string;
    if (kategori === "0") {
      query = "select * from veriler order by sira desc";
    } else if (kategori === "00") {
      query = "select * from veriler where favori=1 order by sira desc";
    } else {
      query = "select * from veriler where katagori=" + kategori + " order by sira desc";
    }

    return this.veritabani.executeSql(query, [])
      .then(res => {
        let data = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            data.push({
              baslik: res.rows.item(i).baslik, aciklama: res.rows.item(i).aciklama, thumbnail: res.rows.item(i).thumbnail,
              sesdosyasi: res.rows.item(i).sesdosyasi, favori: res.rows.item(i).favori, tarih: res.rows.item(i).tarih,
              kategori: res.rows.item(i).kategori, sira: res.rows.item(i).sira
            }
            )
          }
        }
        return data;
      }).catch(e => console.log(e));
  }

  birDataGetir(sira) {
    return this.veritabani.executeSql('select * from veriler where sira=' + sira, [])
      .then(res => {
        let data = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            data.push({
              baslik: res.rows.item(i).baslik, aciklama: res.rows.item(i).aciklama, thumbnail: res.rows.item(i).thumbnail,
              sesdosyasi: res.rows.item(i).sesdosyasi, favori: res.rows.item(i).favori, tarih: res.rows.item(i).tarih,
              kategori: res.rows.item(i).kategori, sira: res.rows.item(i).sira
            }
            )
          }
        }
        return data;
      }).catch(e => console.log(e));
  }

  veritabaniDurumu() {
    return this.veritabanihazir.asObservable();
  }

}
