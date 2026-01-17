![JEONFT banner](public/favicon.ico)

# JEONFT User Platform

Enterprise-grade Web3 marketplace, referral engine, and user banking console for the JEONFT ecosystem. This monorepo hosts the customer-facing portal where collectors onboard, explore NFTs, deposit/withdraw capital, visualize multi-level referral income, and manage their wallets.

## Table of Contents

1. [Overview](#overview)
2. [Core Capabilities](#core-capabilities)
3. [Technology Stack](#technology-stack)
4. [Application Topology](#application-topology)
5. [Module Breakdown](#module-breakdown)
6. [Server Actions & Data Layer](#server-actions--data-layer)
7. [Environment Variables](#environment-variables)
8. [Getting Started](#getting-started)
9. [Workflow Recipes](#workflow-recipes)
10. [Directory Guide](#directory-guide)
11. [Testing & QA](#testing--qa)
12. [Troubleshooting](#troubleshooting)

## Overview

JEONFT is a Next.js 15 (App Router) application written in TypeScript with Tailwind CSS 4, React 19, and server actions backed by MongoDB via Mongoose. Users authenticate with JWTs, interact with NFT catalogues powered by Cloudinary media, and manage deposits/withdrawals that are locked for 180 days to fuel the platform’s AI-driven trading rewards. React Toastify delivers instant UX feedback across the portal.

## Core Capabilities

- **Authentication & onboarding** – Email/password signup with referral links, JWT login, middleware-protected `/auth` and `/user-dashboard` routes, and modal-based login prompts on the landing page.
- **NFT discovery & ownership** – Landing page showcases curated carousels, collections, collectibles, and video explainers. Users can search, inspect detail pages, and fetch owned NFTs via server actions.
- **Wallet & blockchain utilities** – Wallet linking, ETH balance checks, INR↔ETH conversion with live CoinGecko quotes, and mainnet-only guards before executing deposits.
- **Deposits, withdrawals, and admin wallets** – Users initiate deposits (ETH or INR), view deposit/withdrawal history, and trigger withdrawals after 180 days. Admin wallet configuration is enforced before any transaction.
- **Rewards, referrals, and MLM tree** – Recursive MLM visualizations, automated ROI/level/referral income calculations, and reward redemption workflows update balances server-side.
- **Content & support surfaces** – Fully routed legal pages (privacy, terms, shipping, refund, etc.), contact forms, announcement assets, and EmailJS hooks for outreach.

## Technology Stack

- **Framework**: Next.js 15 (App Router, client + server components)
- **Language**: TypeScript 5, React 19 hooks
- **Styling**: Tailwind CSS 4, custom utility classes, CSS modules per component
- **State & UX**: React hooks, React Toastify, Framer Motion, React Slick
- **Authentication**: JSON Web Tokens signed with `jose`, middleware gatekeeping, cookies/`localStorage`
- **Data**: MongoDB Atlas (via `mongoose`), server actions for CRUD, lean() for serialization
- **Media & Assets**: Cloudinary for NFT/collection uploads, optimized `next/image`
- **Blockchain Tooling**: MetaMask/Ethereum mainnet (Window provider), live price conversion (CoinGecko)

## Application Topology

- **Layout shell** – [`src/app/layout.tsx`](src/app/layout.tsx) renders `LayoutClient`, navbar, footer, and a global `ToastContainer` so every route can dispatch notifications.
- **Client-only wrapper** – [`src/components/LayoutClient`](src/components/LayoutClient/index.tsx) checks JWT validity on every route change using `verifyToken`, toggling authenticated UI (menu/CTA states).
- **Routing** – App Router organizes marketing routes (`/`, `/explore`, `/nft-details/[id]`), static policy pages, NFT search (`/nft-search/[keyword]`), and authenticated dashboard sub-routes under `/user-dashboard`.
- **Server actions as API boundary** – Instead of REST endpoints, files under [`src/lib/actions`](src/lib/actions) encapsulate database access, ensuring serializable responses for client hooks/components.
- **Middleware guardrails** – [`middleware.ts`](middleware.ts) blocks authenticated users from re-visiting `/auth/*` and forces anonymous visitors to `/auth/login` before hitting dashboard pages.

## Module Breakdown

| Area | Entry Points | Highlights |
| --- | --- | --- |
| Landing & discovery | [src/app/page.tsx](src/app/page.tsx), [src/components/LandingPage/*](src/components/LandingPage) | Carousel hero, NFT marketplace grid, collectibles, discovery callouts, and explainers (VideoSection) combine to funnel users into signup/login. |
| Authentication | [src/app/auth/login/page.tsx](src/app/auth/login/page.tsx), [src/app/auth/signup/page.tsx](src/app/auth/signup/page.tsx), [src/lib/actions/auth](src/lib/actions/auth) | Email/password auth, referral-aware signup, JWT issuance, modal login (`NftLoginModal`) triggered on landing when tokens are absent. |
| NFT catalogue | [src/lib/actions/nft.actions.ts](src/lib/actions/nft.actions.ts), [src/components/NFTDetail/*](src/components/NFTDetail) | Cloudinary-backed CRUD for collections/NFTs, `getOwnedNFTs` for dashboard views, `searchNFTs` powering the navbar search hook. |
| Wallet & blockchain | [src/lib/actions/wallet.actions.ts](src/lib/actions/wallet.actions.ts), [src/components/DepositComponent](src/components/DepositComponent/index.tsx) | Wallet CRUD, forced Ethereum mainnet metadata, MetaMask checks, ETH balance reads, INR conversions, and admin-wallet validation before deposits. |
| Deposits & withdrawals | [src/lib/actions/deposit.actions.ts](src/lib/actions/deposit.actions.ts), [src/lib/actions/withdraw.actions.ts](src/lib/actions/withdraw.actions.ts), [src/components/DepositListComp](src/components/DepositListComp/index.tsx), [src/components/WithdrawComponent](src/components/WithdrawComponent/index.tsx) | Deposit initiation, 180-day lock timers, withdrawal creation, history tables with toast-driven UX states. |
| User dashboard | [src/app/user-dashboard/page.tsx](src/app/user-dashboard/page.tsx), [src/components/userDashComp](src/components/userDashComp/index.tsx), [src/components/UserIncomeComp](src/components/UserIncomeComp/index.tsx) | Profile details, username/password management, wallet overview, ROI/level/referral income tiles fed by `updateUserBalance`. |
| Rewards & MLM | [src/components/FetchRewardComponent](src/components/FetchRewardComponent/index.tsx), [src/components/MLMTree](src/components/MLMTree/index.tsx), [src/lib/actions/reward.actions.ts](src/lib/actions/reward.actions.ts), [src/lib/actions/mlmtree.actions.ts](src/lib/actions/mlmtree.actions.ts) | Tree visualization of referral hierarchy plus reward fetching/claiming workflows that mutate both reward docs and user balances. |
| Search & discovery | [src/hooks/useSearchNFTs.ts](src/hooks/useSearchNFTs.ts), [src/app/nft-search/[keyword]](src/app/nft-search) | Debounced keyword search backed by server actions, surfaced in the navbar and dedicated result pages. |
| Static & support pages | [`src/app/*/page.tsx`](src/app) for legal/contact/shipping/etc. | Dedicated routes ensure compliance and support messaging with shared layout and SEO metadata. |

## Server Actions & Data Layer

- **NFT lifecycle** – [`src/lib/actions/nft.actions.ts`](src/lib/actions/nft.actions.ts) handles create/update/delete, Cloudinary uploads, ownership transfers via `buyNFT`, collection scoping, and `getOwnedNFTs` for dashboard cards.
- **Collections** – [`src/lib/actions/collection.actions.ts`](src/lib/actions/collection.actions.ts) mirrors NFT CRUD while keeping artwork assets synced with Cloudinary folders.
- **Users & auth** – [`src/lib/actions/user.actions.ts`](src/lib/actions/user.actions.ts) centralizes profile CRUD, wallet linking, reward posting, ROI/level/referral income math, conversions between ETH/INR, and MLM counters.
- **Wallets** – [`src/lib/actions/wallet.actions.ts`](src/lib/actions/wallet.actions.ts) enforces Ethereum mainnet metadata, serializes balances, and updates nested network state.
- **Deposits & withdrawals** – [`src/lib/actions/deposit.actions.ts`](src/lib/actions/deposit.actions.ts) and [`src/lib/actions/withdraw.actions.ts`](src/lib/actions/withdraw.actions.ts) validate ObjectIds, fetch admin wallets, and record unit-aware movements.
- **Rewards** – [`src/lib/actions/reward.actions.ts`](src/lib/actions/reward.actions.ts) lets admins seed rewards, provides user-level fetches, and deletes stale incentives.
- **Admin wallet** – [`src/lib/actions/adminwallet.actions.ts`](src/lib/actions/adminwallet.actions.ts) stores the canonical payout wallet and exposes helpers (`getFirstAdminWallet`) consumed by every monetary workflow.
- **MLM tree** – [`src/lib/actions/mlmtree.actions.ts`](src/lib/actions/mlmtree.actions.ts) recursively stitches parent/child referral relations for visual display.
- **Database bootstrap** – [`src/lib/database/db.ts`](src/lib/database/db.ts) memoizes the MongoDB connection (dbName `jeonft`) via a global cache for serverless friendliness.

## Environment Variables

| Variable | Description | Required |
| --- | --- | --- |
| `MONGODB_URL` | Connection string for the JEONFT MongoDB database. | ✅ |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud identifier for NFT and collection uploads. | ✅ |
| `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | API credentials for Cloudinary `v2` SDK. | ✅ |
| `NEXT_PUBLIC_JWT_SECRET` | Symmetric secret used by `jose` to sign/verify JWTs on both client and server. | ✅ |
| `PEPPER` | Extra string appended to passwords before hashing (stored alongside bcrypt salt). | ✅ |
| `BCRYPT_SALT_ROUNDS` | Number of salt rounds for bcrypt (defaults to 12 if omitted). | ⚠️ Recommended |

> **Tip:** Keep client-exposed secrets (`NEXT_PUBLIC_*`) distinct from server-only values. Missing variables fail fast thanks to explicit runtime checks (for example, `connectToDatabase` throws when `MONGODB_URL` is absent).

## Getting Started

1. **Install dependencies**
	```bash
	npm install
	```
2. **Create `.env.local`** with the variables listed above.
3. **Seed an admin wallet (optional but required for deposits)** by calling `createAdminWallet` (temporary script or Mongo shell) so user flows can retrieve `walletAddress`.
4. **Run the development server**
	```bash
	npm run dev
	```
	Visit http://localhost:3000 and log in or sign up via the modal/`/auth/login`.
5. **Lint** before committing
	```bash
	npm run lint
	```
6. **Build for production**
	```bash
	npm run build && npm run start
	```

## Workflow Recipes

1. **Register & log in**
	- Navigate to `/auth/signup` to create an account (optional referral code stored as `referralCode`).
	- Upon success, JWT and `userId` are persisted to `localStorage`, unlocking dashboard routes via middleware and `LayoutClient`.
2. **Connect a wallet & deposit ETH**
	- Head to `/user-dashboard/deposit-eth` (renders [DepositComponent](src/components/DepositComponent/index.tsx)).
	- Ensure MetaMask is installed, network is Ethereum mainnet (`0x1`), and an admin wallet exists.
	- Enter the amount (>=0.01 ETH). The component checks ETH balance, displays INR equivalent, and forces users to accept the 180-day lock before calling `createDeposit`.
3. **Deposit INR**
	- `/user-dashboard/deposit-rs` leverages INR to ETH conversion helpers (`convertRsToEth` / `convertEthToRs`). Update admin wallet and payment gateway configs before launch.
4. **Track deposits & withdraw post-lock**
	- `/user-dashboard/deposit-list` loads [DepositListComp](src/components/DepositListComp/index.tsx) which reveals the unlock countdown and enables withdrawals via `createWithdraw` only after 180 days.
	- `/user-dashboard/withdraw-list` renders [WithdrawComponent](src/components/WithdrawComponent/index.tsx) summarizing payout states.
5. **Claim rewards & observe MLM impact**
	- `/user-dashboard/user-rewards` mounts [FetchRewardComponent](src/components/FetchRewardComponent/index.tsx), enabling real-time reward redemption through `addRewardToUserBalance`.
	- The landing page’s [MLMTree](src/components/MLMTree/index.tsx) visualizes the same referral relationships for transparency.
6. **Manage NFTs**
	- Use server actions in [nft.actions.ts](src/lib/actions/nft.actions.ts) to create/update/delete NFTs and collections, typically from admin tooling (not included in this repo).
	- The user dashboard’s `[owned-nfts](src/components/OwnedNfts/index.tsx)` page fetches holdings via `getOwnedNFTs`, surfacing toast-driven errors whenever the server responds with an issue.

## Directory Guide

- `src/app` – Route definitions (landing, auth, dashboard, legal, contact, NFT detail/search pages).
- `src/components` – Reusable UI (Navbar, Footer, landing widgets, dashboard widgets, modals, loaders, NFT detail cards, payment gateway surfaces, etc.).
- `src/lib/actions` – Server actions acting as the data layer. Each file co-locates validation, DB reads/writes, and serialization helpers.
- `src/lib/models` – Mongoose schemas (`userModel`, `walletModel`, `nftModel`, `collectionModel`, `depositModel`, `withdrawModel`, `rewardModel`, `adminwalletModel`).
- `src/lib/database` – Mongo connection bootstrap.
- `src/hooks` – Custom hooks such as `useSearchNFTs` to orchestrate async flows with toast messaging.
- `src/utils` – Crypto helpers (`jwt`, `bcrypt`), referral-code generator, etc.
- `src/assets` – Static imagery for landing sections, announcements, and NFT showcases.
- `public` – Publicly served assets (favicons, placeholders, etc.).

## Testing & QA

- Automated tests are not yet configured. Focus on end-to-end verification of wallet flows, referral math, and server-action error handling.
- When adding new server actions, ensure responses remain serializable (no Mongoose documents). Prefer `.lean()` or JSON serialization, matching existing patterns.

## Troubleshooting

- **JWT errors on client-only hooks** – Remember `verifyToken` is asynchronous; await it inside try/catch as seen in `LayoutClient` and landing modal logic.
- **Deposits blocked** – Confirm an admin wallet exists via `createAdminWallet` and that users accepted the 180-day lock checkbox. Without both, `createDeposit` returns descriptive errors.
- **Cloudinary failures** – Check all three Cloudinary variables and ensure uploaded files use the `File` API (see `createCollection` and `createNFT`).
- **Mongo connection leaks** – Reuse the exported `connectToDatabase` helper; never call `mongoose.connect` directly in new modules.

---

Need clarification, onboarding help, or an architectural review? Open an issue or reach out to the JEONFT engineering team.
