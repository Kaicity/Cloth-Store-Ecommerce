import {Directive, ElementRef, HostListener} from "@angular/core";
import {NgControl} from "@angular/forms";

@Directive({
  standalone: true,
  selector: '[appThousandSeparator]'
})
export class ThousandSeparatorDirective {
  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    // Get input value from the form control
    let value = this.control.value;

    // Remove non-numeric characters
    value = value.replace(/\D/g, '');

    // Add thousand separator
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Update form control value
    this.control.control!.setValue(value, { emitEvent: false }); // prevent circular update
  }
}
