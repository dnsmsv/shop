import { Component } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { AlertType } from '../models/alert-type';
import { Alert } from '../models/alert.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  alert: Alert;
  alertType = AlertType;

  constructor(private alertService: AlertService) {
    if (alertService.alert) {
      alertService.alert.subscribe((alert) => {
        const newAlert: Alert = new Alert();
        newAlert.clone(alert);
        this.alert = newAlert;
      });
    }
  }

  hide() {
    this.alertService.hide();
  }
}
