import { Component, OnInit } from '@angular/core';
import { StripeService } from '../stripe.service';
import { CardService } from './card.service';
import { environment } from '../../environments/environment';

declare var Stripe: any;

/**
 * Simple UI to display Stripe.js card
 * @author Jonathan Miller <john@essolutions.io>
 */
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  private stripe: any = null;
  private card: any = null;
  private elements: any = null;
  public cardError: string = null;
  public chargeError: any = null;
  public charge: any = null;

  constructor(
    private readonly stripeService: StripeService,
    private readonly cardService: CardService
    ) { }

  public ngOnInit() {
    this.stripeService.initializeStripe().subscribe(() => {
      this.stripe = Stripe(environment.stripePublicKey);
      this.elements = this.stripe.elements();
      this.card = this.elements.create('card');
      this.card.mount('#card-element');
      this.card.addEventListener('change',
        event => event.error ? this.cardError = event.error.message : null);
    });
  }

  /**
   * Submits the Stripe token to the backend and creates a charge
   * @param token The Stripe.js token
   */
  public createCharge(token) {
    this.charge = null;
    this.chargeError = null;
    this.cardService.createCharge(token, 999, 'usd', 'This is a sample charge')
    .subscribe(
      response => this.charge = response,
      error => this.chargeError = error
    );
  }

  /**
   * Gets a Stripe token from the Stripe.js API
   */
  public getToken() {
    this.stripe.createToken(this.card).then(result => {
      if (result.error) {
        this.cardError = result.error.message;
      } else {
        this.createCharge(result.token);
      }
    });
  }
}
