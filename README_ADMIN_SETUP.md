# E-Commerce Admin Dashboard (Frontend-Only Architecture)

This project contains a full-featured, modular **Frontend-Only Admin Dashboard** built with React, Tailwind CSS, and React Context.

## Features Implemented

1. **Mock Services Layer (`src/services/`)**:
   - `productService.js`: Handles Product CRUD, multi-image upload preview, scale/tiered pricing, and bulk actions.
   - `categoryService.js`: Handles dynamic Category management & parent-child subcategories.
   - `subscriptionService.js`: Enforces a **strict 10% maximum discount cap** validation rule.
   - `authService.js`: Provides mock admin login guard authentication (`admin` / `password123`).

2. **Product CRUD & Scale Bulk Pricing**:
   - Add/Edit/Delete products with Product Type (`Physical`, `Digital`, `Service`).
   - Drag-and-drop / file upload preview with image removal.
   - Volume Scale Pricing builder (e.g. 1-10 units = $X, 11-50 units = $Y).
   - Search, filter by category/type/status, sorting, pagination.
   - Bulk actions (bulk delete & bulk status update).
   - Delete confirmation modal (`ConfirmModal`).
   - Client-side CSV export.

3. **Category Hierarchy**:
   - Parent and subcategory creation.
   - Syncs dynamically live to customer storefront tabs without code changes.

4. **Subscription Management (10% Discount Cap)**:
   - Discount percentage capped at max 10%.
   - Active plan discount auto-calculates final prices on storefront.

5. **Dashboard Analytics & Activity Audit**:
   - Overview metrics, low stock alerts (< 10 units), and real-time admin activity log stream.

---

## How to Plug in a Real Backend Later

When you are ready to connect a Node.js + Express + MongoDB/MySQL backend, **you do NOT need to rewrite any UI components**.

Simply replace the mock service implementations in `src/services/` with real HTTP calls (`fetch` / `axios`):

### Example: Replacing `productService.js` with Real API
```javascript
// src/services/productService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

export const productService = {
  async getProducts() {
    const res = await axios.get(API_URL);
    return res.data;
  },

  async createProduct(productData) {
    const res = await axios.post(API_URL, productData);
    return res.data;
  },

  async updateProduct(id, productData) {
    const res = await axios.put(`${API_URL}/${id}`, productData);
    return res.data;
  },

  async deleteProduct(id) {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  }
};
```

---

## Mock Admin Credentials
- **Username**: `admin`
- **Password**: `password123`
- **Portal URL**: `/admin/login` or `/admin`
