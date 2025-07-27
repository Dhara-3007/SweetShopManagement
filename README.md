# Shahi Mithai - Sweet Shop Management System
Shahi Mithai is a sweet shop web application where users can browse different sweets, filter them by category, and place orders. The site also includes login/register features and keeps track of a user's past orders.

**What website does**
- Displays a list of sweets with images
- Allows users to register and log in
- Filters sweets by category (e.g., Bengali, Gujarati)
- Includes a "Buy Now" popup modal for quick ordering
- Displays individual user's order history
- Clean, responsive UI for all screen sizes
- Developed using Test-Driven Development (TDD)

**Tech Stack**
**Frontend**
- React
- CSS (Custom styling using `SweetList.css`)
- React Router
**Backend**
- Django (Django REST Framework)
- MySQL
- Django ORM
- django-cors-headers

**Project Highlights**
- Full-stack project using React (frontend) and Django (backend)
- Built with clean code and reusable components
- Simple UI for better user experience
- All key features like auth, filters, modals, and orders implemented

**Test Report**
Tests were written for backend logic (e.g., authentication, sweet operations). 
Example test cases:
- User registration & login
- Fetch sweets list
- Purchase sweets (and quantity update)
- Edge cases for out-of-stock or invalid actions

**Prerequisites**
Make sure the following are installed:
- Python 3.x
- Node.js and npm
- MySQL (running and configured)
Ensure the database details in `sweetshop-backenddd/sweetshop/settings.py` match your system.

**Go into the frontend folder**
```bash
cd sweetshop_frontend
npm install
npm start

**Go into the backend folder**
cd sweetshop-backenddd
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

**Screenshot**
- Homepage
<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/1981392d-486f-4185-8feb-c7291521b302" />
- Login
<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/032e2622-d2b3-4341-800d-13cd6b3ff505" />
- Registeration
<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/7c8618bd-8c5e-435a-af0f-09d3c2a10e61" />
- Purchasesweet
<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/b4e96ec2-92ed-47d8-9d01-547f812060e7" />
- OrderHistory
<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/c0b0cc48-7c72-4380-8701-aa4cc3afa48e" />


**My AI Usage**
AI Tools Used: GitHub Copilot, Gemini, ChatGPT

**Author**
Dhara Sudra

