import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterWidgetComponent } from './component/footer-widget/footer-widget.component';
import { TopbarWidgetComponent } from './component/topbar-widget/topbar-widget.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterModule, TopbarWidgetComponent, FooterWidgetComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {}
