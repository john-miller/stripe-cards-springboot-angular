import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Handles generic Stripe.js functions
 * @author Jonathan Miller <john@essolutions.io>
 */
@Injectable({
  providedIn: 'root'
})
export class StripeService {

  private stripejsUrl = 'https://js.stripe.com/v3/';

  constructor() { }

  /**
   * Initializes the stripe api by loading it into the DOM
   */
  public initializeStripe() {
    return new Observable((observer) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = this.stripejsUrl;
      script.onload = () => {
        observer.next();
        observer.complete();
      };
      document.getElementsByTagName('head')[0].appendChild(script);
    });
  }
}
