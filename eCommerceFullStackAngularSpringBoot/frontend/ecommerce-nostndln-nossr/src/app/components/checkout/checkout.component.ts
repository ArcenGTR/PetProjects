import { ShopFormService } from './../../services/shop-form.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  public checkoutFormGroup: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  constructor(private formBuilder: FormBuilder,
    private shopFormService: ShopFormService
  ) {
    this.checkoutFormGroup = this.formBuilder.group(
      {
        customer: this.formBuilder.group({
          firstName: [''],
          lastName: [''],
          email: ['']
        }),
        shippingAddress: this.formBuilder.group({
          country: [''],
          city: [''],
          street: [''],
          state: [''],
          zipCode: ['']
        }),
        billingAddress: this.formBuilder.group({
          country: [''],
          city: [''],
          street: [''],
          state: [''],
          zipCode: ['']
        }),
        creditCard: this.formBuilder.group({
          cardType: [''],
          nameOnCard: [''],
          cardNumber: [''],
          securityCode: [''],
          expirationMonth: [''],
          expirationYear: ['']
        })
      });

    const startMonth = new Date().getMonth() + 1;

    this.shopFormService.getCreditCardMonths(startMonth).subscribe(data => {
      console.log("Months: " + JSON.stringify(data));
      this.creditCardMonths = data;
    });

    this.shopFormService.getCreditCardYears().subscribe(data => {
      console.log("Years: " + JSON.stringify(data));
      this.creditCardYears = data;
    });

  }


  onSubmit() {
    console.log("Handling Submition");
    console.log(this.checkoutFormGroup.get("customer")?.value);
  }

  copyFormAddresses(event: Event) {
    const input = event.target as HTMLInputElement; // Cast the target to HTMLInputElement
    if (input.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  handleMonthsAndYears() {
    
    const creditCardFormGroup = this.checkoutFormGroup.get("creditCard");
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.get("expirationYear"));

    let startMonth: number;
    if (selectedYear === currentYear) {
      startMonth = new Date().getMonth() + 1;
      console.log('Years are equal');
    } else {
      startMonth = 1;
      console.log('Years are NOT equal');
    }

    this.shopFormService.getCreditCardMonths(startMonth).subscribe(data => {
      console.log("Months: " + JSON.stringify(data));
      this.creditCardMonths = data;
    });

  }

  

}
