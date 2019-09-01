package io.essolutions.charges;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 * Handles Stripe charges for credit cards
 * @author Jonathan Miller <john@essolutions.io>
 */
@Slf4j
@RestController
public class ChargeController {

	public ChargeController(@Value("${stripe.apikey}") String apiKey) {
		Stripe.apiKey = apiKey;
	}
	
	/**
	 * Creates a new charge from a Stripe.js token
	 * @param chargeForm
	 * @return {@link ResponseEntity}
	 */
	@PostMapping(value="/charges", consumes = "application/json")
	public ResponseEntity<?> chargeCard(@RequestBody CreateChargeForm chargeForm) {
		log.info("Processing token " + chargeForm);
		try {
			Map<String, Object> params = new HashMap<>();
			params.put("amount", chargeForm.getPrice());
			params.put("currency", chargeForm.getCurrency());
			params.put("description", chargeForm.getDescription());
			params.put("source", chargeForm.getToken());
			Charge charge = Charge.create(params);
			ChargeResponse response = new ChargeResponse();
			response.setId(charge.getId());
			return ResponseEntity.ok(response);
		} catch(StripeException e) {
			return ResponseEntity.badRequest().body(e.getStripeError().getMessage());
		}
	}
	
	
}
