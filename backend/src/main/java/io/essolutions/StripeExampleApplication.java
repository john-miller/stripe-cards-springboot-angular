package io.essolutions;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * Main class for Stripe Backend Example
 * @author Jonathan Miller <john@essolutions.io>
 */
@ComponentScan("io.essolutions")
@SpringBootApplication
public class StripeExampleApplication {

	public static void main(String[] args) {
		SpringApplication.run(StripeExampleApplication.class, args);
	}

}
