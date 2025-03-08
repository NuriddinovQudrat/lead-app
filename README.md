# Lead Management API

This is a simple API to manage leads, including creating, viewing, and updating the status of leads. The API is built using Next.js API routes.

## Features

- **GET** `/api/leads` - Retrieve a list of all leads.
- **POST** `/api/leads` - Create a new lead.
- **PUT** `/api/leads` - Update the status of an existing lead.

## Accessing the Admin Page

To access the admin page, use the following credentials:

- **Username**: `qudrat`
- **Password**: `12345678`

## API Endpoints

### 1. **GET** `/api/leads`

Retrieves all leads.

#### Response

```json
{
    "leads": [
        {
            "id": "1234567890",
            "first_name": "Qudratjon",
            "last_name": "Nuriddinov",
            "email": "qudratjonnuriddinov2603@gmail.com",
            "linkedin": "https://www.linkedin.com/in/nuriddinovqudratjon",
            "citizenship": "Uzbekistan",
            "visas": "0-1",
            "additional": "TEST",
            "status": "pending",
            "created_at": "2025-03-09T12:34:56Z"
        }
    ]
}
```

### Key Sections Added:

1. **Admin Page Access**: Instructions for accessing the admin page with the provided username and password.
2. **Deployed Domain**: The live domain where the application is hosted: `leads-app.qudratjon.uz`.
3. **Libraries Used**: Lists the libraries used in the project (`Next.js`, `TypeScript`, `TailwindCSS`, `Shadcn UI`).
