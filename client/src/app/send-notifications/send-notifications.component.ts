import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailNotificationsService } from '../emailNotifications.service';

@Component({
  selector: 'app-send-notifications',
  templateUrl: './send-notifications.component.html',
  styleUrls: ['./send-notifications.component.css']
})
export class SendNotificationsComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private ens: EmailNotificationsService, private router: Router) { 
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      subject: ['', Validators.required ],
      to: [ ],
      body: ['', Validators.required ]
    });
  }

  sendGeneralNotifications() {
    this.ens.sendGeneralNotifications(this.angForm.value.to, this.angForm.value.subject, this.angForm.value.body);
    this.router.navigate(['']);
  }

  ngOnInit() {

  }

}