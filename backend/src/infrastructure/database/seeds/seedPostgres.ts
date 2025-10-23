/**
 * PostgreSQL Seed Script
 * Seeds the database with initial data including hashed passwords
 */

import dotenv from 'dotenv';
import { createPostgresPool, closePostgresPool } from '../postgres/connection';
import { BcryptPasswordHasher } from '@infrastructure/security/BcryptPasswordHasher';
import seedData from './seedData.json';

dotenv.config();

async function seedPostgres() {
  const pool = createPostgresPool();
  const passwordHasher = new BcryptPasswordHasher(10);

  try {
    console.log('🌱 Starting PostgreSQL database seeding...');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await pool.query('DELETE FROM todo_items');
    await pool.query('DELETE FROM todo_lists');
    await pool.query('DELETE FROM users');

    // Seed users with hashed passwords
    console.log('👥 Seeding users...');
    for (const user of seedData.users) {
      const hashedPassword = await passwordHasher.hash(user.password);
      await pool.query(
        `INSERT INTO users (id, email, password_hash, name, created_at, updated_at)
         VALUES ($1, $2, $3, $4, NOW(), NOW())`,
        [user.id, user.email, hashedPassword, user.name]
      );
      console.log(`  ✅ Created user: ${user.email}`);
    }

    // Seed lists
    console.log('📋 Seeding to-do lists...');
    for (const list of seedData.lists) {
      await pool.query(
        `INSERT INTO todo_lists (id, user_id, title, created_at, updated_at)
         VALUES ($1, $2, $3, NOW(), NOW())`,
        [list.id, list.userId, list.title]
      );
      console.log(`  ✅ Created list: ${list.title}`);
    }

    // Seed items
    console.log('✅ Seeding to-do items...');
    for (const item of seedData.items) {
      await pool.query(
        `INSERT INTO todo_items (
          id, list_id, title, description, is_completed,
          start_date, deadline_date, created_at, updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())`,
        [
          item.id,
          item.listId,
          item.title,
          item.description,
          item.isCompleted,
          item.startDate,
          item.deadlineDate,
        ]
      );
      console.log(`  ✅ Created item: ${item.title}`);
    }

    console.log('\n🎉 PostgreSQL database seeded successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`  - ${seedData.users.length} users`);
    console.log(`  - ${seedData.lists.length} lists`);
    console.log(`  - ${seedData.items.length} items`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await closePostgresPool();
  }
}

// Run seed if executed directly
if (require.main === module) {
  seedPostgres()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { seedPostgres };

