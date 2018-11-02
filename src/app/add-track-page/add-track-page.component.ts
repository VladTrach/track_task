import { Component, OnInit } from '@angular/core';
import {TrackService} from '../track.service';

@Component({
  selector: 'app-add-track-page',
  templateUrl: './add-track-page.component.html',
  styleUrls: ['./add-track-page.component.sass'],
  providers: [TrackService]
})
export class AddTrackPageComponent implements OnInit {

  number: string;
  title: string;
  viaPoints: string;
  trackColor: string;

  constructor(private trackService: TrackService) { }

  ngOnInit() {
  }

  addTrack() {
    this.trackService.addTrack(this.number, this.title, this.viaPoints, this.trackColor)
      .subscribe( next => null );
  }

}
