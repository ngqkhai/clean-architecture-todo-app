/**
 * MongoDB Seed Script
 * Seeds the database with initial data including hashed passwords
 */

import dotenv from 'dotenv';
import { connectMongoDB, disconnectMongoDB } from '../mongodb/connection';
import { UserModel } from '../mongodb/schemas/UserSchema';
import { ToDoListModel } from '../mongodb/schemas/ToDoListSchema';
import { ToDoItemModel } from '../mongodb/schemas/ToDoItemSchema';
import { BcryptPasswordHasher } from '@infrastructure/security/BcryptPasswordHasher';
import seedData from './seedData.json';

dotenv.config();

async function seedMongo() {
  const passwordHasher = new BcryptPasswordHasher(10);

  try {
    console.log('🌱 Starting MongoDB database seeding...');
    await connectMongoDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await ToDoItemModel.deleteMany({});
    await ToDoListModel.deleteMany({});
    await UserModel.deleteMany({});

    // Seed users with hashed passwords
    console.log('👥 Seeding users...');
    for (const user of seedData.users) {
      const hashedPassword = await passwordHasher.hash(user.password);
      await UserModel.create({
        id: user.id,
        email: user.email,
        passwordHash: hashedPassword,
        name: user.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log(`  ✅ Created user: ${user.email}`);
    }

    // Seed lists
    console.log('📋 Seeding to-do lists...');
    for (const list of seedData.lists) {
      await ToDoListModel.create({
        id: list.id,
        userId: list.userId,
        title: list.title,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log(`  ✅ Created list: ${list.title}`);
    }

    // Seed items
    console.log('✅ Seeding to-do items...');
    for (const item of seedData.items) {
      await ToDoItemModel.create({
        id: item.id,
        listId: item.listId,
        title: item.title,
        description: item.description,
        isCompleted: item.isCompleted,
        startDate: item.startDate ? new Date(item.startDate) : null,
        deadlineDate: item.deadlineDate ? new Date(item.deadlineDate) : null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log(`  ✅ Created item: ${item.title}`);
    }

    console.log('\n🎉 MongoDB database seeded successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`  - ${seedData.users.length} users`);
    console.log(`  - ${seedData.lists.length} lists`);
    console.log(`  - ${seedData.items.length} items`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await disconnectMongoDB();
  }
}

// Run seed if executed directly
if (require.main === module) {
  seedMongo()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { seedMongo };

