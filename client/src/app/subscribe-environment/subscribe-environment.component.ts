import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Router } from '@angular/router';
import { SubscriberService } from '../subscriber.service';
import { EnvironmentService } from '../environment.service';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from 'moment';
import { Subscriber } from '../model/subscriber';
import { EmailNotificationsService } from '../emailNotifications.service';

@Component({
  selector: 'app-subscribe-environment',
  templateUrl: './subscribe-environment.component.html',
  styleUrls: ['./subscribe-environment.component.css']
})
export class SubscribeEnvironmentComponent implements OnInit {

  form: FormGroup;
  env_id: String;
  env: String;
  app: String;

  constructor(private es: EnvironmentService, private ens: EmailNotificationsService, private ss: SubscriberService, private fb: FormBuilder,
    private dialogRef: MatDialogRef<SubscribeEnvironmentComponent>,
    @Inject(MAT_DIALOG_DATA) { env_id, env, app, email }: Subscriber, private router: Router) {

    this.env_id = env_id;
    this.env = env;
    this.app = app;

    this.form = fb.group({
      env: [env, Validators.required],
      app: [app, Validators.required],
      email: [email, Validators.required]
    });

  }

  save() {
    console.log(this.form.value);
    this.ss.addSubscriber(this.env_id, this.form.value.env, this.form.value.app, this.form.value.email).subscribe(
      res => {
        console.log(res);
        if (res['status'] === "200") {
          this.ens.sendGeneralNotifications(this.form.value.email, "Subscribed to environmental updates",
            "You have been successfully subscribed to " + this.form.value.env + ":" + this.form.value.app);
          this.router.navigate(['']);
        }
      },
      err => {
        console.error(err);
      }
    );

    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
