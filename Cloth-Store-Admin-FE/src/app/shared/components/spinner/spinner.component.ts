import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlMaterial} from "../../../ui-component/ControlMaterial";

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, ControlMaterial],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  @Input() isLoading: boolean = false;

}
