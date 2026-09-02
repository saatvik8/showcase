# Showcase AI — Product Experience Platform

> Turn static product catalogs into interactive, searchable, lead-generating experiences.

Built for **Best Power Equipments India Pvt. Ltd. (BPE)** as the first client. Phase 1 MVP — June 2026.

---

## What It Is

Showcase AI is a full-stack product catalog platform. Customers browse, search, shortlist, and submit inquiries. Admins manage products, categories, leads, and branding — all from one dashboard.

**The problem it solves:** B2B companies hand customers a PDF. The PDF gets ignored. No search, no data, no follow-up. Showcase AI replaces that broken workflow with a live, interactive experience.

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Next.js 16 + React + Tailwind CSS | Customer catalog + Admin dashboard |
| Backend | Node.js + Express.js | REST API server |
| Database | PostgreSQL (Supabase) | Products, categories, leads, admins |
| ORM | Prisma 6 | Type-safe database queries |
| Auth | JWT + bcrypt | Secure admin authentication |
| Storage | Cloudinary | Product image uploads and CDN |
| Dev | Nodemon + Concurrently | Run frontend + backend together |

---

## Project Structure

```
Mvp/
├── frontend/                  # Next.js app (Nishant)
│   ├── app/
│   │   ├── page.tsx           # Homepage / catalog
│   │   ├── products/          # Products listing
│   │   ├── product/[id]/      # Single product detail
│   │   ├── categories/        # Category browser
│   │   ├── contact/           # Inquiry form
│   │   ├── admin/
│   │   │   ├── login/         # Admin login page
│   │   │   └── page.tsx       # Admin dashboard
│   │   └── pdf-success/       # PDF generation success
│   ├── components/            # Reusable UI components
│   ├── lib/
│   │   ├── api.ts             # All API calls (centralized)
│   │   └── mockData.ts        # Fallback mock data
│   └── .env.local             # NEXT_PUBLIC_API_URL
│
├── lib/
│   ├── prisma.js              # Prisma client singleton
│   └── cloudinary.js          # Cloudinary + Multer setup
│
├── middleware/
│   └── verifyToken.js         # JWT auth middleware
│
├── routes/
│   ├── auth.js                # POST /api/auth/login
│   ├── company.js             # GET /api/company/:slug
│   ├── categories.js          # GET /api/companies/:id/categories
│   ├── adminCategories.js     # POST/PUT/DELETE /api/admin/categories
│   ├── products.js            # GET /api/companies/:id/products
│   ├── productById.js         # GET /api/products/:id
│   ├── adminProducts.js       # POST/PUT/DELETE /api/admin/products
│   ├── leads.js               # POST /api/companies/:id/leads
│   ├── adminLeads.js          # GET/PUT /api/admin/leads
│   └── upload.js              # POST /api/upload
│
├── scripts/
│   └── seed.js                # Full BPE catalog seed (18 products, 10 categories)
│
├── prisma/
│   └── schema.prisma          # DB schema: Company, Admin, Category, Product, Lead
│
├── server.js                  # Express entry point
└── package.json               # Scripts: dev, seed, start
```

---

## API Reference

### Public Endpoints (no auth required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |
| GET | `/api/company/:slug` | Company branding & config |
| GET | `/api/companies/:id/categories` | Category tree |
| GET | `/api/companies/:id/products?search=&categoryId=` | Products with search/filter |
| GET | `/api/products/:id` | Single product detail |
| POST | `/api/companies/:id/leads` | Submit customer inquiry |

### Admin Endpoints (JWT required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login → returns JWT |
| POST | `/api/admin/products` | Create product |
| PUT | `/api/admin/products/:id` | Update product |
| DELETE | `/api/admin/products/:id` | Delete product |
| POST | `/api/admin/categories` | Create category |
| PUT | `/api/admin/categories/:id` | Update category |
| DELETE | `/api/admin/categories/:id` | Delete category |
| GET | `/api/admin/companies/:id/leads` | View all leads |
| PUT | `/api/admin/leads/:id/status` | Update lead status |
| POST | `/api/upload` | Upload image to Cloudinary |

---

## Database Schema

```
Company         → slug, name, primaryColor, logoUrl, whatsappNumber, websiteUrl
Admin           → email, password (bcrypt), companyId
Category        → name, parentId (self-ref for subcategories), sortOrder, companyId
Product         → name, description, specs (JSON), images (JSON), isVisible, categoryId, companyId
Lead            → name, email, phone, message, wishlistSnapshot (JSON), status, companyId
```

---

## Getting Started (Local Dev)

### Prerequisites
- Node.js v18+
- PostgreSQL (local) or Supabase account
- Cloudinary account (free tier)

### Setup

```bash
# 1. Clone and install backend dependencies
cd Mvp
npm install

# 2. Install frontend dependencies
cd frontend && npm install && cd ..

# 3. Configure environment
# Edit .env with your DATABASE_URL, JWT_SECRET, Cloudinary keys
# Edit frontend/.env.local with NEXT_PUBLIC_API_URL=http://localhost:5000/api

# 4. Run database migrations
npx prisma migrate dev --name init

# 5. Seed the BPE catalog (18 products, 10 categories, sample leads)
npm run seed

# 6. Start both servers
npm run dev
```

Backend runs on `http://localhost:5000`
Frontend runs on `http://localhost:3000`

### Default Admin Credentials
```
Email:    admin@bpe.com
Password: password123
```

> Change these before any client-facing deployment.

---

## BPE Catalog Coverage

The seed script populates the full BPE product range:

| Category | Products |
|----------|----------|
| Line Interactive UPS | BP/BPI Series (650VA–2200VA) |
| Online UPS — 1Ph/1Ph | MF Series, MSI Series, MF II Series, MPP Series |
| Online UPS — 3Ph/1Ph | HPX Series (200–600kVA) |
| Online UPS — 3Ph/3Ph | GTP, GTPIX, EPX+, UGX, GTP-InfiniteX Series |
| Rack Mount UPS | GTRT Series (10–60kVA) |
| Modular UPS | PS Series (4kVA–1000kVA) |
| BESS — Single Phase | NrgX Series (1–10kVA) |
| BESS — Three Phase | ESS15, ESS50, NRGX Series |
| BESS — Containerized | Outdoor IP54 (125kW–8MW) |
| Data Center | IDU Smart Rack |
| Accessories | STS, Isolation Transformer, APFC, PDU, Li-ion Battery, BHMS, IoT, Bus Bar |

---

## Team

| Name | Role |
|------|------|
| Saatvik | Backend & Architecture — Database, Prisma, APIs, Auth, Cloudinary, Leads, Deployment |
| Nishant | Frontend — Next.js, UI/UX, Customer Catalog, Admin Dashboard |

---

## Roadmap

### Phase 1 (Current — MVP)
- [x] Interactive product catalog
- [x] Search + category filtering
- [x] AI-powered semantic search
- [x] Wishlist + PDF generation
- [x] WhatsApp inquiry integration
- [x] Admin dashboard (products, categories, leads, branding)
- [x] JWT authentication
- [x] Cloudinary image uploads
- [x] Full BPE catalog seeded

### Phase 2 (Next)
- [ ] AI product extraction from PDFs
- [ ] Natural language search (backend)
- [ ] AI lead qualification + intent scoring
- [ ] CRM integrations (HubSpot, Zoho)

### Phase 3 (Platform)
- [ ] Multi-tenant SaaS (multiple clients)
- [ ] Self-serve onboarding
- [ ] Analytics dashboard
- [ ] Sales intelligence

---

## Notes

- The `←` character in JSX must use `&larr;` to avoid parser errors
- Supabase RLS is enabled on all tables — Prisma bypasses RLS as the DB owner, PostgREST is blocked
- The `generated` folder (Prisma client) should not be copied into the frontend directory
- Cloudinary uses `req.file.secure_url` not `req.file.path` in multer-storage-cloudinary v2.2.1
- Admin token is stored in `localStorage` under key `adminToken`
