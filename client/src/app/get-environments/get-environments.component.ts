import { Component, OnInit } from '@angular/core';
import Environment from '../model/Environment';
import { EnvironmentService } from '../environment.service';
import { Sort } from '@angular/material';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { SubscribeEnvironmentComponent } from '../subscribe-environment/subscribe-environment.component';
import * as moment from 'moment';

@Component({
  selector: 'app-get-environments',
  templateUrl: './get-environments.component.html',
  styleUrls: ['./get-environments.component.css']
})
export class GetEnvironmentsComponent implements OnInit {

  public searchText: string;
  environments: Environment[];
  closeResult: string;
  p:any;

  constructor(private dialog: MatDialog, private es: EnvironmentService, private router: Router) { }

  sortData(sort: Sort) {
    const data = this.environments.slice();
    if (!sort.active || sort.direction === '') {
      this.environments = data;
      return;
    }

    this.environments = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'env': return compare(a.env, b.env, isAsc);
        case 'app': return compare(a.app, b.app, isAsc);
        case 'current_version': return compare(a.current_version, b.current_version, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        case 'install_date': return compare(a.install_date, b.install_date, isAsc);
        case 'comments': return compare(a.comments, b.comments, isAsc);
        default: return 0;
      }
    });
  }
  ngOnInit() {
    this.es
      .getEnvironmentes()
      .subscribe((data: Environment[]) => {
        this.environments = data;

        // convert ISO timestamp to readable format
        this.environments.forEach(function (value) {
          if(value.install_date)
          value.install_date=moment(new Date(value.install_date)).format('MM/DD/YYYY, hh:mm A')
        });
        
        // default sort to env
        this.sortData({ active: "env", direction: "asc" })
      });
  }

  deleteEnvironment(id) {
    this.es.deleteEnvironment(id).subscribe(res => {
      console.log('Deleted');
      location.reload();
    });
  }



  addSubscriber(env_id, env, app, email) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.maxWidth = "1500px";

    dialogConfig.data = {
      env_id: env_id,
      env: env,
      app: app
    };

    this.dialog.open(SubscribeEnvironmentComponent, dialogConfig);

  }

}

function compare(a: number | String | Date, b: number | String | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
