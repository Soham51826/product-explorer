# Product Explorer

A searchable, paginated web interface built with React and Vite, fetching product data from the public DummyJSON REST API.

## Features & Implementation
- **Live Search with Debounce:** Connects to `/products/search` using a 350ms debounce timer to prevent firing requests on every keystroke.
- **Server-Side Pagination:** Handles pagination directly via the API's `limit` and `skip` query parameters rather than client-side array slicing.
- **Request Cancellation:** Uses native `AbortController` signals to cancel pending, out-of-order network requests when typing fast or changing pages.
- **Boundary & Edge Case Handling:** Manages explicit states for loading feedback (animated skeleton loaders), failed network responses with retry options, missing thumbnail images, and zero-result search queries.
- **Category Filtering & Modal Detail View:** Quick category selector pills and full product modal overlays.

## Setup & Running Locally

1. Clone the repository:
   ```bash
   git clone [https://github.com/Soham51826/product-explorer.git](https://github.com/Soham51826/product-explorer.git)
   cd product-explorer
