# Mini eCommerce Platform — Next.js + MongoDB

## Project Overview

This is a mini eCommerce platform built with **Next.js (App Router)**, **TypeScript**, and **MongoDB Atlas**. The project includes both a public-facing store and an admin panel for managing products. It demonstrates fullstack skills, including data modeling, API development, frontend integration, and UI/UX design.

---

## Features

### Frontend (User Store)

* **Home Page**: Product listing with search and pagination.
* **Product Details Page**: Displays title, description, price, category, and image.
* **Cart Page**: Add/remove products, update quantity, and display total.
* **State Management**: Implemented using **Zustand** with `persist` middleware to store cart data in `localStorage`.
* **Forms**: Managed using **React Hook Form** for robust form handling and validation.
* **Styling**: Tailwind CSS + Shadcn UI components.

### Backend (API)

* REST API built with **Next.js App Router** under `/app/api/products`.
* Endpoints:

  * **GET** `/api/products` — Fetch all products with optional pagination and search.
  * **GET** `/api/products/:id` — Fetch single product.
  * **POST** `/api/products` — Create new product.
  * **PUT** `/api/products/:id` — Update existing product.
  * **DELETE** `/api/products/:id` — Delete product.
* **Validation**: Using **Zod** for schema validation.
* **Error Handling**: Implemented with `try/catch` blocks and appropriate HTTP status codes.

### Admin Panel

* Create, edit, and delete products via a secure admin interface.
* Image input accepts URL only.
* Connected directly to API endpoints.
* Forms are powered by **React Hook Form** for better performance and validation handling.

---

## Tech Stack

* **Next.js** (App Router, API routes)
* **TypeScript**
* **Zustand** (with `persist` middleware)
* **React Hook Form**
* **Tailwind CSS** + **Shadcn UI**
* **MongoDB Atlas** + **Mongoose**
* **Zod** for validation

---

## Folder Structure

```
/app
  /page.tsx               # Home Page
  /product/[id]/page.tsx  # Product Details Page
  /cart/page.tsx          # Cart Page
  /admin                  # Admin Pages
  /api/products           # API Routes (GET, POST, PUT, DELETE)
/lib
  dbConnect.ts            # MongoDB connection helper
/models
  Product.ts              # Mongoose schema
/components               # Reusable UI components
```

---

## Environment Setup

Create a `.env.local` file with:

```
MONGODB_URI="your-mongodb-atlas-uri"
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## Run Locally

```bash
npm install
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## API Documentation

### GET /api/products

Fetch all products with optional pagination and search.

```bash
curl "http://localhost:3000/api/products?search=flowers&page=1"
```

### GET /api/products/\:id

```bash
curl http://localhost:3000/api/products/PRODUCT_ID
```

### POST /api/products

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"title":"New Product","description":"Desc","price":19.99,"category":"Gifts","imageUrl":"https://..."}'
```

### PUT /api/products/\:id

```bash
curl -X PUT http://localhost:3000/api/products/PRODUCT_ID \
  -H "Content-Type: application/json" \
  -d '{"price":24.99}'
```

### DELETE /api/products/\:id

```bash
curl -X DELETE http://localhost:3000/api/products/PRODUCT_ID
```

---

## Design Decisions

* **App Router** for modern Next.js features and routing.
* **Zustand** for lightweight, flexible state management.
* **React Hook Form** for efficient, controlled form handling.
* **Zod** for type-safe validation.
* **Persisted Cart** with localStorage for better UX.
* **Tailwind + Shadcn** for fast, modern UI.

---

## Deployment

Deployed on **Vercel**: [Live Demo Link](#)

---

## Author

**Badr Shaban**
