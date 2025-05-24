import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LayoutService } from '@Layout/service/layout.service';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
  selector: 'app-topbar-widget',
  imports: [RouterModule, StyleClassModule, ButtonModule, RippleModule, CommonModule],
  templateUrl: './topbar-widget.component.html',
  styleUrl: './topbar-widget.component.scss'
})
export class TopbarWidgetComponent {
  public readonly layoutService = inject(LayoutService);
  public readonly router = inject(Router);

  public toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
  }
}
