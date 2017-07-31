import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-bugreport',
  templateUrl: './bugreport.component.html',
  styleUrls: ['./bugreport.component.scss']
})
export class BugreportComponent {

  error: any = false;
  success: any = false;
  submitting: any = false;
  formData: any;
  submitSub: any;
  actionLabel: String = 'Send Report';

  constructor(private CS: ContactService) {
    this.formData = {
      'description': ""
    };
  }

  onSubmit(form) {
    this.error = false;
    this.success = false;

    this.submitSub = this.CS.bugReport(this.formData.description).subscribe(data => {
      if (data.state == 'failure') {
        this.error = data;
      } else {
        this.success = data;
      }
    });
  }

  ngOnDestroy() {
    if (this.submitSub) this.submitSub.unsubscribe();
  }
}
