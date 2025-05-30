import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ValidationMessageComponent } from '@Shared/validation/validation-message/validation-message.component';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'app-text-section',
  standalone: true,
  imports: [CommonModule, EditorModule, ReactiveFormsModule, ValidationMessageComponent],
  templateUrl: './text-section.component.html',
  styleUrl: './text-section.component.scss'
})
export class TextSectionComponent implements OnInit {
  @Input() index!: number;
  @Input() formItem!: FormGroup;
  @Input() submitted!: boolean;

  public control!: FormControl;

  ngOnInit(): void {
    this.control = this.formItem.get('textContent') as FormControl;
  }
}
