# HopeFund

Civic issue-reporting + transparent municipal crowdfunding.

- **Citizens** report infrastructure issues (photos + category + location).
- **Government bodies** review issues, set timeline/budget, and can enable crowdfunding.
- **Admin** verifies government accounts and citizen KYC.
- Once crowdfunding is enabled and a fundraiser holder is KYC-verified and
  approved, the community can contribute (eSewa) toward getting the issue fixed.

## Stack
- **Client**: React + Vite, React Router, Axios
- **Server**: Node.js + Express, Prisma ORM
- **Database**: PostgreSQL 
- **Payments**: eSewa 

## Getting started

### 1. Database + server
```bash
cd server
cp .env.example .env      # fill in DATABASE_URL and JWT_SECRET
npm install
npx prisma migrate dev --name init
npm run dev                # http://localhost:5000
```

### 2. Client
```bash
cd client
npm install
npm run dev                # http://localhost:5173
```

## What's scaffolded vs. still TODO

**Done:**
- Full Prisma data model (User, GovernmentBody, Issue, IssueStatusUpdate, FundraiserCampaign, Contribution)
- Auth (register/login, JWT, role middleware)
- Issue create/list/detail/status-update routes + controllers
- Campaign application/approval/contribution routes + controllers
- Basic React app shell: public issue feed, report-issue form, auth context

**Not yet built (next steps):**
- eSewa payment integration (`server/src/services/esewaService.js` — file not yet created)
- File upload handling for issue photos + KYC documents (Cloudinary/S3)
- Government and Admin dashboards (folders scaffolded, pages empty)
- Issue detail page, campaign contribution UI on the client
- KYC submission flow on the client
- Map-based location picker (v2 — text location works for v1)
