
# ✈️ Flight Booking Application by Kirill Botškovoi

This is a full-stack flight booking application designed to simulate the process of searching, selecting, and purchasing airline tickets. It was built as a portfolio project to demonstrate skills in microservice architecture, backend development, and frontend integration.

---

## ⚙️ Technology Stack

### 🔧 **Back-end**: Spring Boot  
A REST API was built using Spring Boot, with:
- PostgreSQL as the main database (managed via Spring Data JPA),
- Spring Security and JWT for authentication and access control,
- Integration with the [AviationStack API](https://aviationstack.com/) for retrieving real flight data.

The seat generation algorithm uses the following configuration (in `application.properties`):
- `seat.rows.min` / `seat.rows.max`: range for number of seat rows.
- `seat.occupancy.min` / `seat.occupancy.max`: percentage of seats initially booked.
- Additional attributes affect seat pricing, class (economy/business), layout, and availability.  
Seats are generated dynamically per flight with randomized features.

---

### 🌐 **Front-end**: React  
The UI includes pages for:
- Registration and login,
- Flight browsing and filtering,
- Viewing seat layouts and booking (available only to authenticated users),
- A personal dashboard to manage flights and view purchased tickets.

**Bootstrap** was used for styling and layout.

---

### 🛢 **Database**: PostgreSQL  
Database operations are implemented using Spring Data JPA.

---

### 📦 **Containerization**: Docker  
The project uses Docker and Docker Compose for quick setup and deployment of the entire stack.

---

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kirill-botskovoi/cgi-application-2025
   cd cgi-application-2025
   ```

2. Start backend, frontend, and database with Docker Compose:
   ```bash
   docker-compose up --build
   ```

3. Open the application in your browser at:
   ```
   http://localhost
   ```

---

## 🛠 Planned Improvements
- Enhanced UI/UX for a more intuitive user experience.
- Performance optimization of database queries.
- Email notifications upon successful booking.
- Simulated or real payment integration.
- Unit and integration tests (API + UI via tools like Selenide).

---

## ⏱ Development Time

Total: **~40–50 hours**, including:
- Backend: 15 hours
- Frontend: 20–25 hours
- Debugging & testing: 5–10 hours

---

## 🔍 References & Tools
- [YouTube JWT Auth Guide](https://www.youtube.com/watch?v=wcbqwYFfG70&t=2235s)
- ChatGPT for generating parts of the seat generation logic and React components
- Reused boilerplate code from my previous Spring Boot projects to speed up development
