import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {MatOptionModule} from "@angular/material/core";
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-auto-complete',
  standalone: true,
  imports: [CommonModule, FormsModule, MatOptionModule, MatAutocompleteModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './auto-complete.component.html',
  styleUrl: './auto-complete.component.scss'
})
export class AutoCompleteComponent implements OnInit {

  @Input() options!: string[];
  @Output() selected = new EventEmitter<string>();

  private getDistinctOptions(options: string[]): string[] {
    return Array.from(new Set(options));
  }

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor() {
    // Bắt đầu với tất cả các từ gợi ý khi không có input
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const uniqueOptions = this.getDistinctOptions(this.options);
    return uniqueOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
  }

  optionSelected(event: MatAutocompleteSelectedEvent): void {
    this.selected.emit(event.option.viewValue);
  }
}
