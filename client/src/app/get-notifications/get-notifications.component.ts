import { Component, OnInit } from '@angular/core';
import EmailNotification from '../model/EmailNotification';
import { EmailNotificationsService } from '../emailNotifications.service';
import { Sort } from '@angular/material';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ViewNotificationComponent } from '../view-notification/view-notification.component';
import * as moment from 'moment';

@Component({
  selector: 'app-get-notifications',
  templateUrl: './get-notifications.component.html',
  styleUrls: ['./get-notifications.component.css']
})
export class GetNotificationsComponent implements OnInit {

  public searchText: string;
  emailNotifications: EmailNotification[];
  closeResult: string;
  p:any;

  constructor(private dialog: MatDialog, private ens: EmailNotificationsService, private router: Router) { }

  sortData(sort: Sort) {
    const data = this.emailNotifications.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.emailNotifications = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'createdAt': return compare(a.createdAt, b.createdAt, isAsc);
        case 'subject': return compare(a.subject, b.subject, isAsc);
        case 'to': return compare(a.to, b.to, isAsc);
        default: return 0;
      }
    });
  }

  ngOnInit() {

    this.ens
      .getEmailNotifications()
      .subscribe((data: EmailNotification[]) => {
        this.emailNotifications = data;

        // convert ISO timestamp to readable format
        this.emailNotifications.forEach(function (value) {
          value.createdAt = moment(new Date(value.createdAt)).format('MM/DD/YYYY, hh:mm A')
        });
        // default sort to createdAt
        this.sortData({ active: "createdAt", direction: "desc" })
      });
  }


  viewNotification(emailNotification) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = "1500px";

    dialogConfig.data = {
      emailNotification: emailNotification
    };

    this.dialog.open(ViewNotificationComponent, dialogConfig);

  }


}

function compare(a: number | String | Date, b: number | String | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}