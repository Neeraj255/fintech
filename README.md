# Finance Data Processing & Access Control API

A professional backend system for managing financial records with Role-Based Access Control (RBAC) and Dashboard Analytics.

## Table of Contents
- [Project Overview](#project-overview)
- [Core Features](#core-features)
- [RBAC Model](#rbac-model)
- [API Endpoints](#api-endpoints)
- [Tech Stack](#tech-stack)
- [Design Decisions](#design-decisions)

---

## Project Overview
This project is built to demonstrate high-quality backend engineering, specifically focusing on **data aggregation**, **access control**, and **modular architecture**. It allows users to track financial entries (income/expenses) while restricting actions based on their assigned role.

## Core Features
- **User & Role Management**: Create users with roles (`Viewer`, `Analyst`, `Admin`).
- **Financial CRUD**: Detailed tracking of transactions (Amount, Type, Category, Date).
- **Dashboard Summary**: Aggregate data (Total Income, Expenses, Net Balance) with category breakdowns.
- **Advanced Filtering**: Filter records by date range, type, or category.
- **RBAC Enforcement**: Middleware-level security to ensure only authorized roles can modify data.

## RBAC Model
|    Role     | View Records | View Summary | Create/Update/Delete |
| :---:       | :---:        | :---:        | :---:                |
| **Viewer**  | ✅           | ❌          | ❌                   |
| **Analyst** | ✅           | ✅          | ❌                   |
| **Admin**   | ✅           | ✅          | ✅                   |

---

## API Endpoints

### 🔑 Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Sign up with role |
| `POST` | `/api/auth/login` | Get JWT token |

### 📊 Dashboard & Records
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/records/summary` | Analyst, Admin | Aggregate finance metrics |
| `GET` | `/api/records` | Viewer, Analyst, Admin | List records (supports search/filter) |
| `POST` | `/api/records` | Admin | Create new record |
| `PUT` | `/api/records/:id` | Admin | Update record |
| `DELETE` | `/api/records/:id` | Admin | Soft delete |

---

## Design Decisions
1. **Separation of Concerns**: Business logic is isolated in `services/` to keep controllers clean and facilitate unit testing.
2. **MongoDB Aggregation**: The dashboard summary uses the `$facet` operator to perform multiple aggregations (totals + breakdown) in a single database pass for maximum efficiency.
3. **Soft Delete**: Implemented `isDeleted` flag to maintain data integrity and audit trails.
4. **Validation Logic**: Joi is used to enforce strict schema validation before data reaches the database layer.

## Setup Instructions
1. Install dependencies: `npm install`
2. Configure `.env` with `MONGO_URI` and `JWT_SECRET`.
3. Run the server: `npm start`
"# fintech" 
