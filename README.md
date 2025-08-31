🍳 Smart Recipe Generator

Smart Recipe Generator is a web application that suggests recipes based on available ingredients. It supports both manual ingredient input and image-based recognition, while also providing dietary customization, nutritional information, and recipe filtering.

🚀 Features

Ingredient Input

Enter ingredients via text or select from a list

Upload ingredient images for recognition

Recipe Generation

Suggests multiple recipes with step-by-step instructions

Includes nutritional info (calories, protein, etc.)

Filters & Customization

Filter by cooking time, difficulty, or dietary restrictions

Adjust serving sizes dynamically

Recipe Database

Preloaded with 20+ recipes across multiple cuisines

Each recipe includes ingredients, steps, and nutritional values

User Feedback

Rate and save favorite recipes

Get personalized suggestions based on ratings/preferences

UI/UX

Clean, intuitive interface

Mobile responsive design

Hosting

Deployed on free hosting (vercel/render)

🛠️ Tech Stack

Frontend: React.js / HTML / CSS / JavaScript

Backend: Node.js / Express.js

Database: MongoDB 

Hosting: Vercel/Render


Smart-Recipe-Generator/
├── frontend/         # React app (UI)
├── backend/          # Node.js server (API & logic)
├── database/         # Recipe data (JSON/DB schema)
├── public/           # Static assets
├── README.md         # Documentation
└── package.json      # Dependencies & scripts

✅ Working application URL  :  https://smart-recipe-generator-three.vercel.app/

🚀 Deployment

Frontend: Deploy React app to Vercel

Backend: Deploy Express app to Render

Database: Use MongoDB Atlas

The Smart Recipe Generator was built with the goal of making cooking easier by suggesting personalized recipes from user-provided ingredients. The project is structured around three core modules: ingredient input, recipe generation, and user personalization. Ingredient input supports both manual text entry and image recognition using AI models, enabling flexibility for different users. A recipe matching algorithm checks the available ingredients against a predefined recipe database of 20+ items, ensuring variety across cuisines.

Nutritional data and dietary filters (vegetarian, gluten-free, etc.) are integrated to enhance health-conscious decision-making. The application also provides options to filter by cooking time, difficulty level, and serving size. User preferences are captured through a rating and favorites system, which helps tailor future suggestions.

The frontend was developed in React for a responsive, intuitive user experience, while Node.js and Express power the backend logic and API handling. Recipe data is stored in a structured JSON format or MongoDB for scalability. The application includes error handling, loading states, and responsive design to ensure smooth usability. Finally, it was deployed on free hosting platforms (Vercel/Render) to ensure accessibility and easy sharing.

