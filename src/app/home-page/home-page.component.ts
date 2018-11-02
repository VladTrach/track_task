import { Component, OnInit } from '@angular/core';
import {TrackService} from '../track.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit {

  tracks = [];

  constructor(private trackService: TrackService){}

  ngOnInit() {
    this.trackService.getTracks().subscribe(tracks => {
      this.tracks = tracks;
    });
    console.log(this.tracks);
  }



}
