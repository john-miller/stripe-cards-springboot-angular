# Sample Stripe integration using SpringBoot and Angular

## What's Covered

## Angular

### Setup
https://stripe.com/docs/web/setup

```html
<script src="https://js.stripe.com/v3/"></script>
```

### Stripe Elements
https://stripe.com/docs/stripe-js

#### Card
```html
<div class="container">
  <div class="card m-3">
    <div class="card-header">
      <table class="table table-sm">
        <thead>
          <th>Test Card</th>
          <th>Type</th>
        </thead>
        <tr>
          <td>4242424242424242</td>
          <td>Visa</td>
        </tr>
        <tr>
          <td>5555555555554444</td>
          <td>Mastercard</td>
        </tr>
        <tr>
          <td>378282246310005</td>
          <td>American Express</td>
        </tr>
        <tr>
          <td>6011111111111117</td>
          <td>Discover</td>
        </tr>
      </table>
    </div>
    <div class="card-body">
      <div class="p-2 m-1" id="card-element">
      </div>
      <small style="display: block;" class="text-danger">
        {{cardError}}
      </small>
    </div>
    <button class="btn btn-primary" (click)="submit()">Submit</button>
  </div>
</div>
```

## SpringBoot

### Setup
```xml
<dependency>
    <groupId>com.stripe</groupId>
    <artifactId>stripe-java</artifactId>
    <version>11.3.0</version>
</dependency>
```

### Creating Charges
```java
Stripe.apiKey = "YOUR_PUBLIC_API_KEY";
String token = request.getParameter("stripeToken");
Map<String, Object> params = new HashMap<>();
params.put("amount", 999);
params.put("currency", "usd");
params.put("description", "Example charge");
params.put("source", token);
Charge charge = Charge.create(params);
```