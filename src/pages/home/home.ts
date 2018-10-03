import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { Vibration } from '@ionic-native/vibration';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  playing: boolean = false;
  constructor(
    public navCtrl: NavController, 
    public audio: NativeAudio,
    public platform: Platform,
    public vibration: Vibration,
    public adMob: AdMobFree
  ) {
    this.audio.preloadSimple('shave','assets/audio/shaver.mp3').then(res => {
      console.log(res)
    })
    .catch(err =>{
      console.error('erro preload',err);
    });

  }

  ionViewDidLoad(){
    this.platform.ready().then(_ => {
      this.showBannerAd();
    });
  }

  showBannerAd(){
    const bannerConfig: AdMobFreeBannerConfig = {
      id: 'ca-app-pub-8822334834267652/8206381981',
      isTesting: false,
      autoShow: true,
    }
    this.adMob.interstitial.config({
      autoShow: true,
      isTesting: false,
      id: 'ca-app-pub-8822334834267652/7049104527'
    })
    this.adMob.interstitial.prepare();
    this.adMob.banner.config(bannerConfig);
    this.adMob.banner.prepare()
      .then(result => {
        this.adMob.banner.show();
      })
    
    
  }
  play(event){
    this.playing = !this.playing;
    if(this.playing)
      this.audio.play('shave')
        .then(_ => {
          this.vibration.vibrate(1000000);
        })
        .catch(err => {
          console.error(err);
        })
    else{
      this.audio.stop('shave')
        .then(_ => {
          this.vibration.vibrate(0);
        })
        .catch(err => {
          console.error(err);
        })
    }
  }
}
