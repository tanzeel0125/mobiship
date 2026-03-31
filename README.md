# MobiShip 📦

A mobile-first shipping application that lets users create shipments, purchase postage, generate QR codes, and track packages — entirely from their phone. No printer required.

---

## Overview

MobiShip simplifies the consumer shipping experience by handling the full shipment lifecycle in one app: enter package details, compare rates, pay, get a QR code, drop off at the nearest location, and track delivery in real time.

## Preview

<img width="385" height="648" alt="Screen 1" src="https://github.com/user-attachments/assets/dc84af9e-b8f8-4f93-95eb-038672072256" />
<img width="385" height="648" alt="Screen 1" src="https://github.com/user-attachments/assets/dc84af9e-b8f8-4f93-95eb-038672072256" />

<img width="377" height="650" alt="Screen 2" src="https://github.com/user-attachments/assets/8c02b126-6bb6-4ef3-9aa3-e8132ed9cab2" />
<img width="377" height="650" alt="Screen 2" src="https://github.com/user-attachments/assets/8c02b126-6bb6-4ef3-9aa3-e8132ed9cab2" />

<img width="375" height="650" alt="Screen 3" src="https://github.com/user-attachments/assets/69d15c3e-ac84-48a2-bc14-588bb98c3da9" />
<img width="375" height="650" alt="Screen 3" src="https://github.com/user-attachments/assets/69d15c3e-ac84-48a2-bc14-588bb98c3da9" />

<img width="376" height="650" alt="Screen 4" src="https://github.com/user-attachments/assets/82fd86e7-e3ea-4dce-86d6-a80e48f4e02a" />
<img width="376" height="650" alt="Screen 4" src="https://github.com/user-attachments/assets/82fd86e7-e3ea-4dce-86d6-a80e48f4e02a" />


---

## Features

- **Account Management** — Sign up, log in, manage profile, saved addresses, and billing
- **Ship a Package** — Enter recipient address, describe item, estimate weight via image or manual entry
- **Multi-Carrier Rate Comparison** — Compare USPS, UPS, and FedEx rates side by side
- **Payment Processing** — Stripe integration supporting credit/debit cards, Apple Pay, and Google Pay
- **QR Code Generation** — Label-free shipping; QR code generated post-payment and saveable to Apple/Google Wallet
- **Drop-Off Location Finder** — Map view of nearby carrier drop-off locations with directions
- **Shipment Tracking** — Real-time status updates from label created through delivery
- **Order History** — View all past shipments, access QR codes, and request refunds
- **Returns** — Initiate a return directly from order history
- **Refer & Earn** — Referral program with tiered shipping credit rewards

---

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile App | React Native |
| Frontend | React, Tailwind CSS |
| State Management | Zustand |
| Routing | React Router v6 |
| Payments | Stripe |
| Shipping API | EasyPost (USPS, UPS, FedEx) |
| Maps | Google Maps API |
| QR Code | qrcode.react |
| Icons | lucide-react |
| Auth | Custom (JWT) |
| Database | PostgreSQL |
| Backend | Node.js / Express |

---

## Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn
- EasyPost API key
- Stripe API key
- Google Maps API key

### Installation

```bash
git clone https://github.com/your-org/mobiship.git
cd mobiship
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
EASYPOST_API_KEY=your_easypost_key
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_PUBLIC_KEY=your_stripe_public
GOOGLE_MAPS_API_KEY=your_maps_key
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_postgres_url
```

### Run Locally

```bash
npm run dev
```

---

## Project Structure

```
mobiship/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Screen-level components (one per route)
│   ├── store/           # Zustand state management
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Helpers (formatting, validation)
│   └── api/             # API call wrappers
├── public/
├── .env.example
└── README.md
```

---

## API Integrations

- **EasyPost** — Rate retrieval, label/QR code generation, shipment tracking
- **Stripe** — Payment processing and refunds
- **Google Maps** — Drop-off location search and directions

---

## Intellectual Property

All custom source code, UI components, business logic, database schemas, and deployment configurations developed for this project are the sole property of MobiShip upon full project completion. Third-party services (Stripe, EasyPost, Google Maps) remain subject to their respective licensing terms.

---

## License

Private — All rights reserved. Not licensed for public use or redistribution.

## Contact

**WhatsApp** — [+1 (920) 828-6711](https://wa.me/19208286711)
