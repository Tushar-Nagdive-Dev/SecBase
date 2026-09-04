package org.secbase.credentials.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@Setter
@Table(schema = "creds", name = "credential_cards")
public class CredentialCard {

    private String cardholderName;

    private String maskedNumber;

    private String cardBrand;

    private String expiryMonth;

    private String expiryYear;

    private String encryptedNumber;

    private String encryptedCvv;

    private String encryptedPin;
}
