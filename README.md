# ⚡ JEONFT — Web3 NFT Platform

A modern Web3 platform for exploring digital assets, managing NFT-related activity, connecting cryptocurrency wallets, and interacting with user-focused financial, reward, and referral workflows.

Built with Next.js, TypeScript, MongoDB, and Cloudinary, the application combines a responsive frontend with server-side actions for authentication, NFT management, wallet operations, deposits, withdrawals, rewards, and referral data.

---

## ✨ Overview

JEONFT provides a user-facing experience for interacting with an NFT and Web3 ecosystem.

The platform brings together NFT discovery, user authentication, wallet connectivity, digital-asset ownership, deposit and withdrawal workflows, rewards, and referral-based functionality within a single application.

The application uses the Next.js App Router and server actions to connect the frontend with a MongoDB-backed data layer while integrating external services for media management, blockchain wallet interaction, and cryptocurrency price information.

---

## 🚀 Features

### 🔐 Authentication

* Email and password authentication
* JWT-based sessions
* Secure password hashing
* Referral-aware registration
* Protected user dashboard routes
* Authentication-aware navigation
* Cookie and local-storage based session handling

### 🖼️ NFT Discovery

* NFT marketplace interface
* NFT collections
* NFT detail pages
* NFT search
* Owned NFT views
* Dynamic NFT routes
* Collection-based discovery
* Media delivery through Cloudinary

### 🔗 Web3 Wallet

* Cryptocurrency wallet connectivity
* MetaMask integration
* Ethereum network validation
* Ethereum mainnet support
* Wallet information management
* ETH balance retrieval
* ETH ↔ INR conversion
* Wallet-linked user workflows

### 💰 Deposits & Withdrawals

* ETH deposit workflow
* INR-based deposit workflow
* Deposit history
* Withdrawal requests
* Withdrawal history
* Wallet validation
* Admin wallet verification
* Deposit lock-period handling

### 🎁 Rewards

* User reward management
* Reward discovery
* Reward redemption
* Balance updates
* ROI-related calculations
* Level-based rewards

### 🌳 Referral & MLM System

* Referral-based onboarding
* Multi-level referral relationships
* Referral income calculations
* Hierarchical MLM visualization
* Parent/child relationship tracking
* Referral-related user metrics

### 👤 User Dashboard

* User profile management
* Wallet overview
* NFT ownership
* Deposit history
* Withdrawal history
* Rewards
* Income information
* Referral information

### 🔎 Search

* NFT search
* Keyword-based discovery
* Debounced search interaction
* Search results pages

### 📄 Supporting Pages

The application also includes dedicated pages for:

* Privacy policy
* Terms and conditions
* Shipping information
* Refund information
* Contact/support
* Other informational content

---

## 🧰 Tech Stack

### Frontend

| Technology         | Purpose                    |
| ------------------ | -------------------------- |
| **Next.js 16**     | Full-stack React framework |
| **React 19**       | UI development             |
| **TypeScript**     | Type-safe development      |
| **Tailwind CSS 4** | Styling                    |
| **Framer Motion**  | Animations                 |
| **React Slick**    | Carousels                  |
| **Lucide React**   | UI icons                   |
| **React Icons**    | Icon library               |
| **React Toastify** | Notifications              |

### Backend & Data

| Technology                 | Purpose                              |
| -------------------------- | ------------------------------------ |
| **Next.js Server Actions** | Server-side application operations   |
| **MongoDB**                | Database                             |
| **Mongoose**               | MongoDB ODM                          |
| **Express**                | Supporting server-side functionality |

### Authentication & Security

| Technology         | Purpose           |
| ------------------ | ----------------- |
| **JOSE**           | JWT operations    |
| **JSON Web Token** | Authentication    |
| **bcryptjs**       | Password hashing  |
| **cookies-next**   | Cookie management |

### Web3 & External Services

| Technology              | Purpose                         |
| ----------------------- | ------------------------------- |
| **MetaMask / Ethereum** | Wallet interaction              |
| **Cloudinary**          | NFT and collection media        |
| **CoinGecko**           | Cryptocurrency price conversion |
| **Axios**               | HTTP requests                   |
| **EmailJS**             | Email/contact workflows         |

---

## 🏗️ Application Architecture

```text
                    JEONFT Platform
                          │
            ┌─────────────┴─────────────┐
            │                           │
        Next.js UI                Authentication
            │                           │
            ▼                           ▼
      Server Actions              JWT / Cookies
            │
     ┌──────┼───────────────────────┐
     │      │                       │
     ▼      ▼                       ▼
   NFTs   Wallets              User Accounts
     │      │                       │
     └──────┼───────────────────────┘
            │
            ▼
       Mongoose Models
            │
            ▼
         MongoDB
```

External integrations:

```text
                JEONFT
                  │
       ┌──────────┼───────────┐
       │          │           │
       ▼          ▼           ▼
  Cloudinary   MetaMask   CoinGecko
     Media     Ethereum    Price Data
```

---

## 📁 Project Structure

```text
Jeonftadmin/
│
├── public/
│   └── Public assets
│
├── src/
│   ├── app/
│   │   ├── auth/
│   │   ├── explore/
│   │   ├── nft-details/
│   │   ├── nft-search/
│   │   ├── user-dashboard/
│   │   └── ...
│   │
│   ├── components/
│   │   ├── LandingPage/
│   │   ├── NFTDetail/
│   │   ├── DepositComponent/
│   │   ├── WithdrawComponent/
│   │   ├── MLMTree/
│   │   ├── UserIncomeComp/
│   │   └── ...
│   │
│   ├── hooks/
│   │   └── Custom React hooks
│   │
│   ├── lib/
│   │   ├── actions/
│   │   ├── database/
│   │   └── models/
│   │
│   ├── utils/
│   │   └── Authentication and utility functions
│   │
│   └── assets/
│       └── Application assets
│
├── middleware.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## 🔄 Authentication Flow

```text
User
 │
 ▼
Sign Up / Login
 │
 ▼
Credentials Validation
 │
 ▼
Password Verification
 │
 ▼
JWT Issued
 │
 ▼
Session Stored
 │
 ▼
Middleware Validation
 │
 ▼
Protected Dashboard
```

Referral information can also be captured during registration and associated with the new account.

---

## 🖼️ NFT Workflow

```text
Explore
   │
   ▼
NFT / Collection Search
   │
   ▼
NFT Details
   │
   ├──────────────┐
   ▼              ▼
Ownership      Collection
   │              │
   └──────┬───────┘
          ▼
     User Dashboard
```

NFT-related server actions handle operations such as NFT retrieval, ownership information, searching, and collection-related data.

Cloudinary is used for application media associated with NFTs and collections.

---

## 🔗 Wallet Workflow

```text
Connect Wallet
      │
      ▼
Check Provider
      │
      ▼
Validate Ethereum Network
      │
      ▼
Read Wallet Address
      │
      ▼
Retrieve ETH Balance
      │
      ▼
Display Wallet Information
```

The application includes Ethereum mainnet validation before performing supported blockchain-related workflows.

---

## 💰 Deposit & Withdrawal Flow

```text
User
 │
 ▼
Connect / Select Wallet
 │
 ▼
Deposit
 │
 ├── ETH
 └── INR
 │
 ▼
Validate Wallet & Configuration
 │
 ▼
Create Deposit Record
 │
 ▼
Deposit Lock Period
 │
 ▼
Eligible Withdrawal
 │
 ▼
Create Withdrawal Request
```

The current application implements a **180-day deposit lock period** for the withdrawal workflow.

---

## 🎁 Rewards & Referral System

The platform maintains user-level reward and referral information.

```text
                 User
                  │
          ┌───────┼───────┐
          ▼       ▼       ▼
        Level    ROI    Referral
          │               │
          └───────┬───────┘
                  ▼
              User Balance
```

The application includes recursive referral hierarchy data and a visual MLM tree for representing parent/child relationships.

---

## 🗄️ Data Layer

The application uses MongoDB with Mongoose models for its primary data layer.

Core model areas include:

* Users
* Wallets
* NFTs
* Collections
* Deposits
* Withdrawals
* Rewards
* Administrative wallet configuration

Server actions provide the primary application boundary for database operations.

---

## 🛠️ Getting Started

### Prerequisites

Make sure you have:

* Node.js
* npm
* MongoDB
* Cloudinary account
* MetaMask or another compatible Ethereum wallet for Web3 workflows

### 1. Clone the repository

```bash
git clone https://github.com/MdKaifSardar/Jeonftadmin.git
cd Jeonftadmin
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file.

```env
MONGODB_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

NEXT_PUBLIC_JWT_SECRET=
PEPPER=
BCRYPT_SALT_ROUNDS=
```

> **Important:** Never commit secrets or production credentials to the repository.

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### 5. Build for production

```bash
npm run build
```

### 6. Start production server

```bash
npm run start
```

---

## 💻 Available Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the Next.js development server |
| `npm run build` | Create a production build            |
| `npm run start` | Start the production server          |
| `npm run lint`  | Run ESLint                           |

---

## 🔑 Environment Variables

| Variable                 | Purpose                           |
| ------------------------ | --------------------------------- |
| `MONGODB_URL`            | MongoDB connection string         |
| `CLOUDINARY_CLOUD_NAME`  | Cloudinary cloud identifier       |
| `CLOUDINARY_API_KEY`     | Cloudinary API key                |
| `CLOUDINARY_API_SECRET`  | Cloudinary API secret             |
| `NEXT_PUBLIC_JWT_SECRET` | JWT configuration                 |
| `PEPPER`                 | Additional password-hashing value |
| `BCRYPT_SALT_ROUNDS`     | bcrypt work factor                |

---

## 🧪 Testing & QA

Automated test suites are not currently configured.

Important workflows to validate during development include:

* Authentication
* Protected routes
* NFT discovery
* NFT ownership
* Wallet connection
* Ethereum network validation
* Deposits
* Withdrawals
* Reward calculations
* Referral relationships
* Server-action error handling
* Cloudinary uploads

---

## 🔒 Security Considerations

Because the application handles authentication, wallets, financial workflows, and digital-asset related data, production deployments should receive additional security review.

Recommended practices:

* Keep all secrets in environment variables.
* Never expose server-side credentials.
* Use strong authentication secrets.
* Validate all user-controlled input.
* Restrict protected operations through authorization checks.
* Secure wallet and financial workflows.
* Use HTTPS in production.
* Review blockchain transaction handling before production use.

---

## 📌 Project Highlights

* Next.js App Router architecture
* TypeScript-based application
* Server actions for backend operations
* MongoDB + Mongoose data layer
* JWT authentication
* Cloudinary media management
* Ethereum / MetaMask integration
* NFT discovery and ownership workflows
* Deposit and withdrawal management
* Reward and referral system
* MLM hierarchy visualization
* Responsive and animated UI

---

## 📄 License

This project is provided for development and portfolio purposes.
