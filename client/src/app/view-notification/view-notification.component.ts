import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Router } from '@angular/router';
import EmailNotification from '../model/EmailNotification';

@Component({
  selector: 'app-view-notification',
  templateUrl: './view-notification.component.html',
  styleUrls: ['./view-notification.component.css']
})
export class ViewNotificationComponent implements OnInit {

  to: String;
  emailHtml: String;



  constructor(private dialogRef: MatDialogRef<ViewNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) private emailNotification: EmailNotification, private router: Router) {


  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.to = Object["values"](this.emailNotification)[0].to;
    this.emailHtml = Object["values"](this.emailNotification)[0].html;
  }

}
