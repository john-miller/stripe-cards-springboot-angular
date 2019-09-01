package io.essolutions.charges;

import lombok.Data;

/**
 * The charge response from Stripe
 * @author Jonathan Miller <john@essolutions.io>
 */
@Data
public class ChargeResponse {
	private String id;
}
