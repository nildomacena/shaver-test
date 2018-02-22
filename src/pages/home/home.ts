import { EstimoteBeacons } from '@ionic-native/estimote-beacons';
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
    public beacon: EstimoteBeacons
  ) {
    this.audio.preloadSimple('shave','assets/audio/shaver.mp3').then(res => {
      console.log(res)
    })
    .catch(err =>{
      console.error('erro preload',err);
    })
    
    console.log(this.platform.is('cordova'))
  }

  play(event){
    console.log(event);
    this.playing = !this.playing;
    console.log(this.playing);
    if(this.playing)
      this.audio.play('shave')
        .then(_ => {
          this.vibration.vibrate(1000000);
          console.log('tocou');
        })
        .catch(err => {
          console.error(err);
        })
    else{
      this.audio.stop('shave')
        .then(_ => {
          this.vibration.vibrate(0);
          console.log('parou');
        })
        .catch(err => {
          console.error(err);
        })
    }
  }
}
