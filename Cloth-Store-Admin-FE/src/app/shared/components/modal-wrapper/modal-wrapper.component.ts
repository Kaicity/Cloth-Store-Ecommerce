import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';

import {ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent} from "@coreui/angular";

import {ControlMaterial} from "../../../ui-component/ControlMaterial";
import {FormsModule} from "@angular/forms";
import {size} from "lodash-es";

@Component({
  selector: 'app-modal-wrapper',
  standalone: true,
  imports: [CommonModule, ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent, ControlMaterial, FormsModule],
  templateUrl: './modal-wrapper.component.html',
  styleUrl: './modal-wrapper.component.scss'
})
export class ModalWrapperComponent{
  @Input() modalId="";
  @Input() nameButton ="Print function";
  @Input() showModal: boolean = false;
  @Input() modalTitle: string = 'Modal Title';
  @Input() size = "modal-xl";
  @Input() runFunction: Function | undefined;
  @Output() closeModalEvent = new EventEmitter();
  @Output() confirmModalEvent = new EventEmitter();

  closeModal() {
    this.closeModalEvent.emit();
  }

  run(): void {
    if (this.runFunction) {
      this.runFunction();
      console.log("Thực hiện chức năng là: ");
    }

  }
}
