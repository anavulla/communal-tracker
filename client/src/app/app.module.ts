import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { NgxEditorModule } from 'ngx-editor';
import { AppComponent } from './app.component';
import { GrdFilterPipe } from './pipes/filter-pipe';
import { SendNotificationsComponent } from './send-notifications/send-notifications.component';
import { FooterComponent } from './footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GetNotificationsComponent } from './get-notifications/get-notifications.component';
import { ViewNotificationComponent } from './view-notification/view-notification.component';
import { GetEnvironmentsComponent } from './get-environments/get-environments.component';
import { EditEnvironmentComponent } from './edit-environment/edit-environment.component';
import { AddEnvironmentComponent } from './add-environment/add-environment.component';
import { SubscribeEnvironmentComponent } from './subscribe-environment/subscribe-environment.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AppConfigService } from './configuration.service';

import { MatMomentDateModule } from "@angular/material-moment-adapter";
import {
  MatDatepickerModule,
  MatDialogModule,
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatTabsModule
} from "@angular/material";


@NgModule({
  declarations: [
    AppComponent,
    GrdFilterPipe,
    SendNotificationsComponent,
    FooterComponent,
    GetNotificationsComponent,
    ViewNotificationComponent,
    GetEnvironmentsComponent,
    EditEnvironmentComponent,
    AddEnvironmentComponent,
    SubscribeEnvironmentComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatTableModule,
    MatDialogModule,
    MatSortModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatToolbarModule,
    MatInputModule,
    MatMomentDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    NgxPaginationModule,
    NgbModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxEditorModule
  ],
  entryComponents: [
    SubscribeEnvironmentComponent,
    ViewNotificationComponent
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return () => {
          return appConfigService.loadAppConfig();
        };
      }
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }