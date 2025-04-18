# CGI Flight Booking Application by Kirill Botškovoi

This repository was created as part of a test assignment for CGI to complete an internship. The application is a service for purchasing airline tickets.

## Technology Stack  
- **Back-end**: Spring Boot  
  A REST API has been implemented, along with objects for working with the database (PostgreSQL), a service layer, and a security system using Spring Security and JWT.  
  Special attention has been given to the service that fetches real flight data from the [AviationStack API](https://aviationstack.com/). Flight data is loaded from the API, while seat availability is randomly generated. The generation parameters are defined in `application.properties`:  
  - `seat.rows.min` and `seat.rows.max` specify the range of row numbers.  
  - `seat.occupancy.min` and `seat.occupancy.max` define the percentage of already booked seats (from 10% to 90%).  
  - And many other attributes that affect price for a seat  
  - The algorithm randomly determines seat characteristics: price, class (economy or business), number of seats per row, and whether a specific seat is booked.  

- **Front-end**: React  
  Pages for registration, authentication, and flight listings have been implemented. Only authorized users can book seats on flights.  
  On the **Dashboard** page, a user can upload new flights via the API or remove them from the database. Additionally, all tickets purchased by the user are displayed. Also used Bootstrap for designing 

- **Database**: PostgreSQL  
  Spring Data JPA was used for database operations.  

- **Containerization**: Docker  
  Docker and Docker Compose are used for easy deployment of the application.  

---  

## Installation Guide  
1. Clone the repository:  
   ```bash
   git clone https://github.com/kirill-botskovoi/cgi-application-2025

   cd cgi-application-2025
   ```

## How to use it?
1. Start the front-, backend and database using Docker Compose:
   ```bash
   docker-compose up --build
   ```
2. Access the application in your browser at `http://localhost`

## Things to improve
- Improve UI/UX design for a better user experience.
- Optimize database queries to enhance performance.
- Implement email notifications for booking confirmations.
- Introduce payment options.
- Write tests! Both Api and UX tests. I would you selenide for UX tests and unit tests for Api tests

## Spent time
From 40 to 50 hours were spent on development, including:
- Backend development: 15 hours
- Frontend development: 20-25 hours
- Debugging and testing: 5-10 hours

## Stackoverflow, AI, YouTube
- Referenced YouTube tutorials for setting up JWT authentication [https://www.youtube.com/watch?v=wcbqwYFfG70&t=2235s]
- Used ChatGPT to generate setup for alogrithms of generationg flight seats and some React Function
- Used my "base" projects on Spring Boot for faster basic setup for development

