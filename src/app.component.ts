import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ToastModule, NgxSpinnerModule],
  template: `
    <ngx-spinner type="ball-scale-multiple" color="var(--primary-color)"></ngx-spinner>
    <p-toast key="global-toast"></p-toast>
    <router-outlet></router-outlet>
  `,
  providers: [MessageService]
})
export class AppComponent {}
