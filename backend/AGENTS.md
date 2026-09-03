# Backend AGENTS.md

## Build & Run

```bash
# Build
mvn clean install

# Run
mvn spring-boot:run

# Run tests
mvn test
```

## Project Structure

```
src/main/java/com/gl/lms/
├── controller/     # REST endpoints (@RestController)
├── service/        # Business logic (interface + impl)
├── repository/     # Data access (Spring Data JPA)
├── entity/         # JPA entities (@Entity)
├── dto/            # Data transfer objects with validation
├── exception/      # Custom exceptions
├── config/         # Configuration classes
└── utility/        # Exception handler, logging aspect
```

## Architecture

- **Pattern**: Layered MVC (Controller → Service → Repository → Entity)
- **Framework**: Spring Boot 3.5.0, Java 21
- **ORM**: Spring Data JPA + Hibernate
- **Database**: PostgreSQL

## Conventions

- Use Lombok annotations (`@Getter`, `@Setter`, `@NoArgsConstructor`) on entities and DTOs
- Service interface in `service/`, implementation as `*Impl.java`
- Jakarta Bean Validation on DTOs (`@NotBlank`, `@Email`, `@Valid`)
- Global exception handling via `@RestControllerAdvice` in `utility/ControllerException.java`
- AOP logging in `utility/LoggingAspect.java` catches service exceptions

## API Endpoints

All endpoints under `/LMS` prefix:
- `POST /add-user-and-issue-library-card` - Create user + card
- `GET /fetch-user-and-issued-library-card/{email}` - Get user by email
- `GET /fetch-all-users` - Get all users with library cards
- `GET /fetch-all-books` - Get all books with author names
- `GET /fetch-all-reviews` - Get all reviews with book titles
- `PUT /update-name/{email}/{updatedName}` - Update user name
- `DELETE /delete-user/{email}` - Delete user
- `POST /add-author-and-books` - Add author with books
- `POST /add-reviews/{title}` - Add review to book
- `GET /fetchBookDetailsAndReviews/{title}` - Get book reviews
- `DELETE /delete-book/{title}` - Delete book

## Entity Relationships

- User ↔ LibraryCard: One-to-One (cascade ALL)
- Author → Books: One-to-Many (cascade ALL)
- Book ← Reviews: One-to-Many

## Key Files

- `application.properties`: DB config at `src/main/resources/`
- `pom.xml`: Dependencies (Spring Boot 3.5.0, PostgreSQL, Lombok, Springdoc OpenAPI)
- `WebConfig.java`: CORS for `http://localhost:3000`

## Testing

Only basic Spring context test exists. Add:
- Unit tests for service layer
- Integration tests for controller endpoints
- Test database configuration (H2 or testcontainers)
