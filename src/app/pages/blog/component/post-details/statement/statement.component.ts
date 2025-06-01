import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statement',
  standalone: true,
  imports: [],
  templateUrl: './statement.component.html',
  styleUrl: './statement.component.scss'
})
export class StatementComponent implements OnInit {
  public currentDateTime: string = '';

  ngOnInit(): void {
    setInterval(() => {
      const now = new Date();
      this.currentDateTime = now.toLocaleString();
    }, 1000);
  }
}
