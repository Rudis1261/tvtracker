import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { TokenRingService } from '../../services/token-ring.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {

  public data = {
    reference: false
  };
  public paid = false;
  public progress = '';
  public progressTime = 0;
  public pollingInMs = 10;
  public intervalTimeInMs = 5000;
  public donationAmount = 10;
  @Input() open = false;

  constructor(private api: TokenRingService) {
    // "donate": "https://api.tvtracker.co.za/donate",
    // "donate-check-paid": "https://api.tvtracker.co.za/donate/check_paid",
    // "donations": "https://api.tvtracker.co.za/donate/payments",
  }

  donationData() {
    this.api.apiCall(environment.endpoint['donate'] + "/" + this.donationAmount).subscribe(res => {
      this.data = res.data;
    });
  }

  checkPaid() {
    if (!this.open) return false;
    this.api.apiCall(environment.endpoint['donate-check-paid'] + "/" + this.data.reference).subscribe(res => {
      this.paid = res.data.paid;
    });
  }

  indicateProgress() {
    setTimeout(() => {
      if (this.progressTime > this.intervalTimeInMs) {
        this.checkPaid();
        this.progressTime = 0;
      } else {
        this.progressTime += this.pollingInMs
      }
      this.progress = ((this.progressTime / this.intervalTimeInMs) * 100) + '%'
      if (this.open) this.indicateProgress()
    }, this.pollingInMs);
  }

  ngOnInit() {
    this.donationData();
    this.indicateProgress();
  }

  ngOnChanges(event) {
    if (this.open) {
      this.progressTime = 0;
      this.indicateProgress();
    }
  }
}
