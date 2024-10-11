# Login Tokens

```text
{
  "iss": "https://accounts.google.com",// Issuer
  "azp": "<request-client_id>",// The requesting client's ID
  "aud": "<data-client_id>",// The application client's ID
  "sub": "<numbered unique primary key>",// Unique subscriber primary key
  "email": "<e-mail address>",// E-mail
  "email_verified": "true",// E-mail is authoritative
  "nbf": "1728648594",// Don't use before timecode
  "name": "Simon Jackson",
  "picture": "<https included URL>",// Profile picture URL
  "given_name": "Simon",
  "family_name": "Jackson",
  "iat": "1728648894",// Issued timecode
  "exp": "1728652494",// Expiration timecode
  "jti": "<issue number>",// Token unique issue number
  "alg": "RS256",// The algorithm used for verification
  "kid": "<private key ID of service account>",// Private key ID
  "typ": "JWT"// Type of token
}
```

A Google login token payload above. Is store similar to below but not expired.

```text
eyJhbGciOiJSUzI1NiIsImtpZCI6ImE1MGY2ZTcwZWY0YjU0OGE1ZmQ5MTQyZWVjZDFmYjhmNTRkY2U5ZWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzL1ODkzLTgwa3J1M3ZqZDgybWFyczQzZmpoOHZtMjBzZ2JhZHNvLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTA3NDEzNzYxNTg5My04MGtydTN2amQ4Mm1hcnM0M2ZqaDh2bTIwc2diYWRzby5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExNzc5NTMyNjc0MjI5MjI0NDg3NSIsImVtYWlsIjoiamFja29rcmluZ0BnbWlZCI6dHJ1ZSwibmJMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJWVRjVVE1X2dvdF9vbEs2bXE2TEFJZk93WDQ3c2FqWGdtTTMzb2NNOWpOclllZXY3Sz1zOTYtYyIsImdpdmVuX25hbWUiOiJTaW1vbiIsImZhbWlseV9uYW1lIjoiSmFja3NvbiIsImlhdCI6MTcyODY0ODg5NCwiZXhwIjoxNzI4NjUyNDk0LCJqdGkiOiIwNGRmOGI4ZGFkNjUwZGUzYWFhNjk2YThkZDNhYmQ0ODM0NzQ4YWQxIn0.uV1tN9WU_XOVlDED2Yxpp7b0RVqfpvT02YfqKSuhc_-kqdbaKN-ngcM5krvaO65tZ5v4LMjDSOIfMnc_esZYngGj7reFW0rCin0WdEjvu6O4LqZwd05AdUe-1LuakOvYquX-KLOhv9sfvZ6fLdzI9smNtjx-FEDW0R5KIaNhgJq52ndoX3Vfhv62i9X2M5hNxsafrrZdXTg1qYiL2g2ipikEI4UZCeYf89j8vbnfniQm2Di1mInbA_Mm6N-tm6jlnMf4B3CJ6Zm64MjxSpveFG_XrqC11sTQLCcDOYARP_Vrn5JKQ0tfJDvtL4bTeWC_XynJMxA
```

Indicating a site token can then be done by adding the payload field.
