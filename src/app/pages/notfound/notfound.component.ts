import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FloatingConfiguratorComponent } from '@Layout/component/floating-configurator/floating-configurator.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [RouterModule, FloatingConfiguratorComponent, ButtonModule],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss'
})
export class NotfoundComponent {}
