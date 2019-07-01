import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EnvironmentService } from '../environment.service';
import { EmailNotificationsService } from '../emailNotifications.service';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-environment',
  templateUrl: './edit-environment.component.html',
  styleUrls: ['./edit-environment.component.css']
})
export class EditEnvironmentComponent implements OnInit {

  angForm: FormGroup;
  environment: any = {};

  constructor(private route: ActivatedRoute,
    private router: Router,
    private es: EnvironmentService,
    private ens: EmailNotificationsService,
    private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      env: ['', Validators.required],
      app: ['', Validators.required],
      current_version: ['', Validators.required],
      status: ['', Validators.required],
      install_date: [],
      comments: []
    });
  }

  updateEnvironment(env, app, current_version, status, install_date, comments) {
    let _install_date = moment(this.angForm.value.install_date).toISOString();

    this.route.params.subscribe(params => {
      this.es.updateEnvironment(env, app, current_version, status, _install_date, comments, params['id']).subscribe(
        res => {
          console.log(res);
          if (res['status'] === "200") {
            let _install_date_format = moment(new Date(_install_date)).format('MM/DD/YYYY, hh:mm A');
            
            this.ens.sendEnvUpdateNotification("Updated the following Environment", params['id'], env, app, current_version, status, _install_date_format, comments);
            this.router.navigate(['']);
          }
        },
        err => {
          console.error(err);
        }
      );
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.es.editEnvironment(params['id']).subscribe(res => {
        this.environment = res;
      });
    });
  }
}
