import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bugreport',
  templateUrl: './bugreport.component.html',
  styleUrls: ['./bugreport.component.scss']
})
export class BugreportComponent implements OnInit {

  error: any = false;
  success: any = false;
  submitting: any = false;
  formData: any;
  actionLabel: String = 'Send Report';

  constructor() {
    this.formData = {
      'description': ""
    };
  }

  onSubmit(form) {
    console.log("SUBMIT", form);
  }

  ngOnInit() { }
}
