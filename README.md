# Lead Management API

A simple API to manage leads, including creating, viewing, and updating their status. Built with **Next.js API routes**.

## 🚀 Features

- **GET** `/api/leads` - Retrieve all leads.
- **POST** `/api/leads` - Create a new lead.
- **PUT** `/api/leads/:id` - Update the status of a lead.

## 🔐 Admin Panel Access

To access the admin page:

- **Username**: `qudrat`
- **Password**: `12345678`

Visit: [`leads-app.qudratjon.uz/admin`](https://leads-app.qudratjon.uz/admin)

## 🔗 API Endpoints

### ➤ **GET** `/api/leads`

Returns a list of all leads.

#### ✅ Example Response

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

🛠 Setup & Installation
To install and run the project locally:

1️⃣ Clone the repository:
git clone https://github.com/NuriddinovQudrat/lead-app
cd lead-app

2️⃣ Install dependencies:
npm install --force

3️⃣ Run the development server:
npm run dev

➡ The app will be available at http://localhost:3000.

🌍 Deployment
This project is live at:

🔗 leads-app.qudratjon.uz

📦 Libraries Used
Next.js - Framework for API and frontend.
TypeScript - Static typing for better maintainability.
Tailwind CSS - Utility-first CSS for styling.
ShadCN UI - Modern UI components.

📄 License
This project is licensed under the MIT License.

✨ Feel free to contribute and improve the project! 🚀

### 🔥 Refactored Improvements:

✔ **Concise and structured formatting**  
✔ **API examples for easy understanding**  
✔ **Clear installation steps**  
✔ **Deployment details**  
✔ **Formatted headings for readability**

Let me know if you need further refinements! 🚀
