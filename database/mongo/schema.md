# MongoDB Schema Documentation
## Clean Architecture To-Do Application

MongoDB uses a document-based structure. Below are the collections and their document schemas.

---

## Collection: `users`

Stores user authentication and profile information.

```javascript
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "email": "alice@example.com",                    // String, unique, required
  "passwordHash": "$2b$10$rBV2HBq1J3YkJX7...",     // String, bcrypt hash
  "createdAt": ISODate("2025-10-23T12:00:00Z"),    // Date
  "updatedAt": ISODate("2025-10-23T12:00:00Z")     // Date
}
```

**Indexes:**
- `{ email: 1 }` - Unique index for faster login queries

---

## Collection: `todoLists`

Stores to-do lists belonging to users.

```javascript
{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "title": "Work Projects",                          // String, max 100 chars
  "userId": ObjectId("507f1f77bcf86cd799439011"),    // Reference to users._id
  "createdAt": ISODate("2025-10-23T12:00:00Z"),
  "updatedAt": ISODate("2025-10-23T12:00:00Z")
}
```

**Indexes:**
- `{ userId: 1 }` - For faster user-based queries

---

## Collection: `todoItems`

Stores individual to-do items within lists.

```javascript
{
  "_id": ObjectId("507f1f77bcf86cd799439013"),
  "title": "Complete API documentation",               // String, max 200 chars, required
  "description": "Finish documenting all endpoints",   // String, max 1000 chars, optional
  "isCompleted": false,                                // Boolean, default false
  "listId": ObjectId("507f1f77bcf86cd799439012"),      // Reference to todoLists._id
  "userId": ObjectId("507f1f77bcf86cd799439011"),      // Reference to users._id
  "startDate": ISODate("2025-10-23T12:00:00Z"),        // Date, optional
  "deadlineDate": ISODate("2025-10-30T12:00:00Z"),     // Date, optional
  "createdAt": ISODate("2025-10-23T12:00:00Z"),
  "updatedAt": ISODate("2025-10-23T12:00:00Z")
}
```

**Business Rule Validation:**
- `deadlineDate` must NOT be before `startDate` (validated in application layer)

**Indexes:**
- `{ listId: 1 }` - For faster list-based queries
- `{ userId: 1 }` - For user-based filtering
- `{ isCompleted: 1 }` - For filtering by completion status

---

## Notes

### Cascade Delete Handling

Unlike PostgreSQL, MongoDB does not have built-in CASCADE DELETE. The application layer handles cascade deletes:

- When a **user** is deleted → manually delete all their `todoLists` and `todoItems`
- When a **todoList** is deleted → manually delete all associated `todoItems`

This is implemented in the repository layer (MongoToDoListRepository).

### Field Naming Convention

MongoDB uses camelCase (e.g., `isCompleted`, `userId`) while PostgreSQL uses snake_case (e.g., `is_completed`, `user_id`). The repository implementations handle this conversion.

