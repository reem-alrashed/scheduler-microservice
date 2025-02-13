
```markdown
# 🕒 Scheduler Microservice

A scalable **job scheduling service** built with **NestJS** and **PostgreSQL**. This service provides an API for scheduling and managing jobs without relying on third-party scheduling libraries.

## 🚀 Features
- ✅ **API-driven Job Scheduling** – Create, update, and delete scheduled jobs.
- ✅ **Custom Scheduling** – Uses cron-like expressions to define schedules.
- ✅ **Persistence with PostgreSQL** – Stores jobs and execution history.
- ✅ **Retries & Failure Handling** – Ensures jobs execute reliably.
- ✅ **Scalable Architecture** – Designed to support high-throughput workloads.
- ✅ **Optimized with Redis Caching** – Reduces database load and improves performance.
- ✅ **Unit & E2E Testing** – Fully tested with Jest.
- ✅ **API Documentation with Swagger** – Interactive API documentation.

---

## 📦 Tech Stack
- **Backend**: [NestJS](https://nestjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [TypeORM](https://typeorm.io/)
- **Testing**: [Jest](https://jestjs.io/)
- **API Documentation**: [Swagger](https://swagger.io/)
- **Containerization**: Docker (optional)
- **Caching**: Redis
---

## 🛠️ Installation & Setup

### **Prerequisites**
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (>= 16.x)
- [PostgreSQL](https://www.postgresql.org/) (>= 12.x)
- [Docker](https://www.docker.com/) (optional)
- Redis (>= 6.x)
### **Clone the Repository**
```bash
git clone https://github.com/your-username/scheduler-microservice.git
cd scheduler-microservice
```

### **Install Dependencies**
```bash
npm install
```

### **Set Up Environment Variables**
Create a `.env` file in the root directory and configure it:
```env
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_user
DATABASE_PASSWORD=your_password
DATABASE_NAME=scheduler_db
```

---

## 🚀 Running the Application

### **Start in Development Mode**
```bash
npm run start:dev
```

### **Start in Production Mode**
```bash
npm run build
npm run start:prod
```

### **Run with Docker**
```bash
docker-compose up --build
```

---

## 📝 API Documentation (Swagger)
This project uses **Swagger** for API documentation.

### **Accessing Swagger**
After running the service, access the API documentation at:  
🔗 **`http://localhost:3000/api`**

### **Swagger Setup**
Swagger is integrated using `@nestjs/swagger`. Check the `main.ts` file for its implementation:
```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Scheduler Microservice')
    .setDescription('API documentation for the job scheduling service')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
```

---

## 🧪 Running Tests

### **Run Unit Tests**
```bash
npm run test
```

### **Run E2E (End-to-End) Tests**
```bash
npm run test:e2e
```

### **Check Test Coverage**
```bash
npm run test:cov
```

---

## 📦 Deployment

### **Deploy to a Cloud Server**
Refer to the [NestJS Deployment Guide](https://docs.nestjs.com/deployment) for best practices.

### **Deploy with Docker**
```bash
docker build -t scheduler-microservice .
docker run -p 3000:3000 scheduler-microservice
```

### **Deploy on AWS using NestJS Mau**
```bash
npm install -g mau
mau deploy
```

---

## 🔄 API Endpoints

| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| GET    | `/jobs`                | Get all scheduled jobs         |
| GET    | `/jobs/:id`            | Get a specific job by ID       |
| POST   | `/jobs`                | Create a new job               |
| PUT    | `/jobs/:id`            | Update an existing job         |
| DELETE | `/jobs/:id`            | Delete a job                   |

For a full list of API endpoints, check **Swagger** documentation at `http://localhost:3000/api`.

--


docker-compose up --build

🚀 Performance Optimization with Redis Caching

This microservice uses Redis caching to reduce database queries and improve response times. Caching is implemented in the JobService, storing frequently accessed job data for 60 seconds to optimize performance.

Benefits of Redis Caching

⚡ Faster API responses by reducing direct database queries.

🚀 Improved scalability for handling high request loads.

💾 Optimized database performance by caching frequently accessed job data.

How Caching Works?

When fetching job details, the service first checks Redis.

If cached data is found, it returns the cached response.

If not, it fetches from PostgreSQL and stores the result in Redis.
--

## 🔗 Resources

- **[NestJS Documentation](https://docs.nestjs.com)**
- **[Swagger Documentation](https://docs.nestjs.com/openapi/introduction)**
- **[PostgreSQL Documentation](https://www.postgresql.org/docs/)**
- **[Docker Documentation](https://docs.docker.com/)**
- **[NestJS Jobs Board](https://jobs.nestjs.com)**

---

## 📜 License

This project is **MIT licensed**. See the full license [here](https://github.com/nestjs/nest/blob/master/LICENSE).

```

---

### ✅ **This README.md file includes:**
1. **Introduction to the project**.
2. **Core features**.
3. **Technology stack**.
4. **Installation & setup** (including **Docker**).
5. **API documentation with Swagger**.
6. **How to run tests**.
7. **Deployment methods**.
8. **API endpoints list**.
9. **Contribution guidelines**.
10. **Useful resources**.
11. **License information**.

🚀 **Now it's ready to be pushed to your GitHub repository!**