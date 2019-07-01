import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AppConfigService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  // load using environment file
  //uri = environment.serverURI;

  // load using config json
  uri: string;

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.uri = appConfigService.serverURI;
  }
  
  addEnvironment(env, app, current_version, status, install_date, comments) {
    const obj = {
      env: env,
      app: app,
      current_version: current_version,
      status: status,
      install_date: install_date,
      comments: comments
    };
    return this.http.post(`${this.uri}/environment/add`, obj)
  }

  getEnvironmentes() {
    return this
      .http
      .get(`${this.uri}/environment`);
  }

  editEnvironment(id) {
    return this
      .http
      .get(`${this.uri}/environment/edit/${id}`);
  }

  updateEnvironment(env, app, current_version, status, install_date, comments, id) {

    const obj = {
      env: env,
      app: app,
      current_version: current_version,
      status: status,
      install_date: install_date,
      comments: comments
    };
    return this.http.post(`${this.uri}/environment/update/${id}`, obj)
  }

  deleteEnvironment(id) {
    return this
      .http
      .get(`${this.uri}/environment/delete/${id}`);
  }

}