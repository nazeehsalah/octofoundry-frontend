import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  spinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private toaster: ToastrService) {}
  showSpinner() {
    this.spinner.next(true);
  }
  hideSpinner() {
    this.spinner.next(false);
  }
  showSuccess(title: string, msg: string) {
    this.toaster.success(msg, title, {
      timeOut: 3000,
    });
  }
  showError(title: string, msg: string) {
    this.toaster.error(msg, title, {
      timeOut: 3000,
    });
  }
}
