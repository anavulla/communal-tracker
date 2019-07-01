import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EnvironmentService } from '../environment.service';
import { EmailNotificationsService } from '../emailNotifications.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-environment',
  templateUrl: './add-environment.component.html',
  styleUrls: ['./add-environment.component.css']
})
export class AddEnvironmentComponent implements OnInit {
  angForm: FormGroup;
  oldValue: any;
  constructor(private fb: FormBuilder, private es: EnvironmentService, private ens: EmailNotificationsService, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      env: ['', Validators.required],
      app: ['', Validators.required],
      current_version: ['', Validators.required],
      status: ['', Validators.required],
      install_date: new FormControl(),
      comments: []
    });

    /* 
    // Test the Observable behavior
     this.angForm.valueChanges.subscribe(newValue => { 
       console.log('old value',this.oldValue);
       this.oldValue = newValue;
       console.log('new form value',newValue);
       console.log('state ', this.angForm.status);
       console.log('pristine ',this.angForm.pristine);
       console.log('dirty ',this.angForm.dirty);
       console.log('touched ',this.angForm.touched);
    });*/
  }



  addEnvironment() {
    let _install_date = moment(this.angForm.value.install_date).toISOString();
    //let _install_date = moment(this.angForm.value.install_date).local().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

    this.es.addEnvironment(this.angForm.value.env, this.angForm.value.app, this.angForm.value.current_version, this.angForm.value.status, _install_date, this.angForm.value.comments).subscribe(
      res => {
        console.log(res);
        if (res['status'] === "200") {
          //this.ens.sendEmailNotification("Added the following Environment",env, app, current_version, status, this.angForm.value.install_date, comments);
          this.router.navigate(['']);
        }
      },
      err => {
        console.error(err);
      }
    );
  }
  ngOnInit() {
  }

}