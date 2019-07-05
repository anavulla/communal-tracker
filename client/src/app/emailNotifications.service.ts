import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})

export class EmailNotificationsService {

  // load using environment file
  //uri = environment.serverURI;

  // load using config json
  uri: string;

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.uri = appConfigService.serverURI;
  }

  getEmailNotifications() {
    return this
      .http
      .get(`${this.uri}/emailNotification`);
  }

  sendEnvUpdateNotification(sub, env_id, env, app, current_version, status, install_date, comments) {
    const obj = {
      sub: sub,
      env_id: env_id,
      env: env,
      app: app,
      current_version: current_version,
      status: status,
      install_date: install_date,
      comments: comments
    };
    return this
      .http
      .post(`${this.uri}/emailnotification/send-email-and-add`, obj)
      .subscribe(res => console.log(res));
  }

  sendGeneralNotifications(to, subject, body) {
    const obj = {
      general: 'yes',
      to: to,
      subject: subject,
      body: body
    };
    return this
      .http
      .post(`${this.uri}/emailnotification/send-email-and-add`, obj)
      .subscribe(res => console.log(res));
  }


}