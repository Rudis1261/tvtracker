import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenRingService } from '../../services/token-ring.service';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { HighlightPipe } from '../../pipes/highlight.pipe';

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
  host: {
    '(document:click)': 'handleClick($event)',
  }
})
export class TypeaheadComponent implements OnInit {

  public query = '';
  public series = [];
  public filteredList = [];
  public elementRef;
  public emptySet = false;
  public user: any = false;
  public message: any = false;

  public searchListSub: any;
  private authSub: any;

  constructor(
    myElement: ElementRef,
    private TRS: TokenRingService,
    private Auth: AuthService,
    private Router: Router
  ) {
    this.elementRef = myElement;
  }

  filter() {
    if (this.query !== ""){
      let filteredByName = this.series.filter(function(el){
        return el.seriesname.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
      }.bind(this));

      // Match against name
      if (filteredByName.length > 0) {
        this.filteredList = filteredByName

      // Only look deeper when no matches are found
      } else {

        this.filteredList = this.series.filter(function(el){
          let overview = el.overview.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
          let seriesname = el.seriesname.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
          return overview || seriesname;
        }.bind(this));
      }

    } else {
      this.filteredList = [];
    }
  }

  handleClick(event){
    var clickedComponent = event.target;
    var inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);

    if(!inside){
      this.filteredList = [];
    }
  }

  select(item){
    this.Router.navigate([ '/show', item.slug ]);
  }

  trackSeries(e, item) {
    if (!item || !item.seriesid) return false;
    e.preventDefault();
    e.stopPropagation();
    this.message = false;

    if (!this.user) {
      alert("Login to track shows, and get notification");
      return false;
    }

    // Otherwise add the episode
    this.filteredList = [];
    this.TRS.apiPostCall(environment.endpoint['add-favorite'], { 'seriesid': item.seriesid }).subscribe((data) => {
      if (data.state == "success") {
        this.message = "Successfully tracked " + item.seriesname + " <i class='icon-check-outline'></i>";
      } else {
        this.message = "Something went wrong, try again";
      }

      setTimeout(() => {
       this.message = false;
      }, 3000);
    });
  }

  ngOnInit() {
    this.authSub = this.Auth.userState.subscribe(value => {
      this.user = value;
    });

    this.searchListSub = this.TRS.apiCall(environment.endpoint['search-list']).subscribe((data) => {
      if (data.state == "failure" || !data.data.items || data.data.items.length == 0) {
        this.emptySet = true;
        return false;
      }

      this.series = data.data.items;
    });
  }

  ngOnDestroy() {
    if (this.searchListSub) this.searchListSub.unsubscribe()
    if (this.authSub) this.authSub.unsubscribe()
  }
}
