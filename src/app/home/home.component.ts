import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  poster: String = "assets/img/posters_all_mobile.png";
  posters: Array<String> = [
    "assets/img/posters_all_mobile.png",
    "assets/img/posters_all_mobile_2.png",
  ];
  activePoster: any = 0;

  constructor() {
    this.poster = this.posters[this.activePoster];
    this.rotate();
  }

  ngOnInit() {}

  rotate() {
    setTimeout(() => {
      this.activePoster = (this.activePoster == 0) ? 1 : 0;
      this.poster = this.posters[this.activePoster];
      this.rotate();
    }, 10000);
  }
}
