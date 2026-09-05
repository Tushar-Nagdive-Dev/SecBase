# SECBASE // Enterprise Zero-Knowledge Credential & Identity Governance Platform

Secbase is an enterprise-grade, zero-knowledge credential management and identity governance platform designed from the ground up for strict data sovereignty and cryptographic isolation. Utilizing a modern modular monolith backend and a high-contrast neo-brutalist Angular interface, Secbase ensures that plaintext secrets **never** touch a network socket or a persistence layer. All encryption, decryption, and key derivation occur exclusively within ephemeral browser RAM.

---

## 🏗️ System Architecture & Technology Stack

### Backend Engine

* **Language & Framework**: Java 25, Spring Boot, Spring Modulith.
* **Data Access**: Spring Data JDBC with custom database audit entity interceptors.
* **Database**: PostgreSQL (handling encrypted JSON/binary payloads, salts, and verifier hashes).
* **Security Architecture**: Stateless JWT authentication with role-based access control (RBAC).

### Frontend & Client Workspace

* **Framework**: Angular (leveraging Angular Signals and Reactive Forms).
* **Styling**: Tailwind CSS configured with a custom, high-contrast **Neo-Brutalist** design system.
* **Cryptography Engine**: Native browser Web Crypto API (`AES-GCM` symmetric encryption, `PBKDF2` key derivation).

---

## 🔒 Zero-Knowledge Security Model

Secbase separates identity authentication from data decryption:

1. **Master Password Isolation**: Your master password never leaves your browser. It is combined with a cryptographically secure, server-provided `cryptoSalt` using PBKDF2 to derive a local AES-GCM key.
2. **Verifier Hash Challenge**: A verification hash (`cryptoVerifier`) is validated locally against derived keys. If it fails, the master key is discarded, preventing unauthorized vault mounting.
3. **Ephemeral RAM Storage**: Once unlocked, the active AES `CryptoKey` is held strictly in volatile browser memory (`EnclaveStateService`) and is automatically purged upon inactivity timeout or explicit vault locking.
4. **Client-Side Ciphertexts**: The backend database stores only opaque encrypted payloads (`encryptedPassword`, `encryptedNumber`, `encryptedContent`), making database compromises completely unreadable to third parties.

---

## 📂 Core Features & Capabilities

* **Cryptographic Enclaves (Profiles)**: Isolate your credentials into separate vaults (Enclaves), each secured by distinct cryptographic parameters.
* **Multi-Type Credential Support**:
* **LOGIN**: Secure URLs, usernames, encrypted passwords, PINs, and TOTP seeds with one-click clipboard copying.
* **CARD**: Full credit card management supporting dynamic brand selection (Visa, Mastercard, Amex, Discover), cardholder names, secure masked numbers (`**** **** **** 1234`), drop-down expiration months (`01-12`) and dynamically generated future years, along with encrypted CVVs and PINs.
* **NOTE**: Secure long-form text blocks with structured formatting.


* **Dynamic Workspace Views**: Seamlessly toggle between **Card Grid**, **Data Table**, and **Bubble View** layouts.
* **Interactive Neo-Brutalist UI**: Bold borders, striking chromatic contrast (`bg-cyan-400`, `bg-yellow-300`, `bg-fuchsia-600`), and real-time state feedback.

---

## 🚀 Getting Started & Installation

### Prerequisites

* Java 25 or higher
* Node.js (v18+ recommended) & npm
* PostgreSQL instance running locally or remotely

### 1. Backend Setup (Spring Boot)

1. Clone the repository and navigate to the backend module.
2. Configure your database connection properties inside your environment configuration or `application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/secbase
    username: your_db_user
    password: your_db_password

```


3. Run the application via Maven or your preferred IDE (such as IntelliJ IDEA with environment variables properly mapped):
```bash
mvn clean spring-boot:run

```



### 2. Frontend Setup (Angular)

1. Navigate to the frontend directory:
```bash
cd frontend

```


2. Install dependencies:
```bash
npm install

```


3. Launch the development server:
```bash
ng serve

```


4. Open your browser and navigate to `http://localhost:4200`.

---

## 🧭 Application Routing & Navigation Map

* **`/` or `/secbase-view**`: Central Dashboard and Enclave Lobby overview.
* **`/enclave/:profileId`**: Mounts and displays credentials for a specific cryptographic enclave vault.
* **`/enclave/:profileId/item/new`**: Inline or dedicated wizard interface for encrypting and storing new secrets.
* **`/enclave/:profileId/item/:id`**: Secure detail view for decrypting, unmasking, copying, or modifying an individual credential payload.

---

## 🛡️ Roadmap & Future Enhancements

* **Shamir's Secret Sharing (SSS)**: Distributed social recovery of master keys across trusted peer devices without server interaction.
* **Local Entropy & Compromise Scanner**: Offline k-anonymity hash checks against known data breaches.
* **Developer CLI Bridge**: Secure localhost socket utilities to inject encrypted credentials directly into local `.env` files or CI/CD pipelines.