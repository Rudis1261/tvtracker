import { Component, OnInit } from '@angular/core';
import { TokenRingService } from '../../services/token-ring.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {

  public data = {};
  constructor(private api: TokenRingService) {
    // "donate": "https://api.tvtracker.co.za/donate",
    // "donate-check-paid": "https://api.tvtracker.co.za/donate/check_paid",
    // "donations": "https://api.tvtracker.co.za/donate/payments",
  }

  donationData() {
    console.log("DONATION ENDPOINT", environment.endpoint['donate']);
    this.api.apiCall(environment.endpoint['donate']).subscribe(res => {
      this.data = res.data;
    });
  }

  ngOnInit() {
    this.donationData();
  }
}
