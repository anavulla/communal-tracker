import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AppConfigService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  // load using environment file
  //uri = environment.serverURI;

  // load using config json
  uri: string;

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.uri = appConfigService.serverURI;
  }

  addSubscriber(env_id, env, app, email) {
    const obj = {
      env_id: env_id,
      env: env,
      app: app,
      email: email
    };
    return this.http.post(`${this.uri}/subscriber/add`, obj)
  }

  getSubscribers() {
    return this
      .http
      .get(`${this.uri}/subscriber`);
  }

  editSubscriber(id) {
    return this
      .http
      .get(`${this.uri}/subscriber/edit/${id}`);
  }

  deleteSubscriber(id) {
    return this
      .http
      .get(`${this.uri}/subscriber/delete/${id}`);
  }

}