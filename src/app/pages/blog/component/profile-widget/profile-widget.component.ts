import { Component } from '@angular/core';
import { ProfileComponent } from '@Pages/profile/profile.component';

@Component({
  selector: 'app-profile-widget',
  standalone: true,
  imports: [ProfileComponent],
  templateUrl: './profile-widget.component.html',
  styleUrl: './profile-widget.component.scss'
})
export class ProfileWidgetComponent {

}
