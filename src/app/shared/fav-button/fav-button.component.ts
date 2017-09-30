import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenRingService } from '../../services/token-ring.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-fav-button',
  templateUrl: './fav-button.component.html',
  styleUrls: ['./fav-button.component.scss']
})
export class FavButtonComponent implements OnInit {

  @Input() series:any = false;
  user: any = false;
  processing: any = false;
  message: any = false;

  private authSub: any;
  private favSub: any;

  constructor(
    private Auth: AuthService,
    private TRS: TokenRingService
  ) { }

  ngOnInit() {
    this.authSub = this.Auth.userState.subscribe(value => {
      this.user = value;
    });

    this.message = false;
    this.processing = false;
  }

  toggle() {
    if (!this.user || !this.user.id) {
      alert('You need to login to track a show');
      return false;
    }

    if (this.processing) {
      return false;
    }

    this.processing = true;
    this.message = false;

    // Tracking
    let endPoint:any = false;
    let type:any = false;

    if (this.series && this.series.user_ids && this.series.user_ids.indexOf(this.user.id) == -1) {
      endPoint = environment.endpoint['add-favorite'];
      type = 'track';
    }

    // Untracking
    if (this.series && this.series.user_ids && this.series.user_ids.indexOf(this.user.id) !== -1) {
      endPoint = environment.endpoint['remove-favorite'];
      type = 'untrack';
    }

    if (!endPoint) {
      this.processing = false;
      return false;
    }

    this.TRS.apiPostCall(endPoint, { 'seriesid': this.series.seriesid }).subscribe((data) => {
      if (data.state == "success") {
        if (type == 'track') {
          this.series.user_ids.push(this.user.id);
          this.message = "Successfully tracked"
        } else {
          this.remove(this.series.user_ids, this.user.id);
          this.message = "Successfully untracked";
        }
      } else {
        this.message = "Something went wrong!";
      }

      this.processing = false;
      setTimeout(() => {
        this.message = false;
      }, 3000);
    });
  }

  remove(arr, what): void {
    let found = arr.indexOf(what);

    while (found !== -1) {
      arr.splice(found, 1);
      found = arr.indexOf(what);
    }
  }

  ngOnDestroy() {
    if (this.authSub) this.authSub.unsubscribe();
    if (this.favSub) this.favSub.unsubscribe();
  }
}
