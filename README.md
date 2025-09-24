# Inventory & Order Management API

A small Node.js + Express + MySQL REST API that simulates supply & demand flows:

- Manage **products** and **stock**
- Create and view **orders**
- Clean, modular structure aligned with modern engineering practices

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MySQL
- **Tools:** Git/GitHub, Postman
- **Optional:** Docker

## Endpoints

- `GET /api/products` – list products + stock
- `POST /api/products` – add a product
- `GET /api/orders` – list orders
- `POST /api/orders` – place an order
- `GET /api/orders/:id` – order details
