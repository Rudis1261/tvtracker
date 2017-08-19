import { Component, OnInit } from '@angular/core';
import { TokenRingService } from '../services/token-ring.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  private seriesSub: any;
  private series: any;

  constructor(private TRS: TokenRingService) {
    this.seriesSub = this.TRS.apiGetCall(environment.endpoint['series-all']).subscribe((data) => {
      this.series = data.data.items;
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.seriesSub) this.seriesSub.unsubscribe();
  }
}
