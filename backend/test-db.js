// Quick database connection test
import pool from './src/infrastructure/database/postgres/connection.js';
import bcrypt from 'bcrypt';

async function test() {
  try {
    console.log('Testing PostgreSQL connection...');
    
    // Test basic query
    const result = await pool.query('SELECT COUNT(*) FROM users');
    console.log('✓ Users count:', result.rows[0].count);
    
    // Test finding a user
    const userQuery = await pool.query('SELECT * FROM users WHERE email = $1', ['alice@example.com']);
    console.log('✓ Found Alice:', userQuery.rows.length > 0);
    
    if (userQuery.rows.length > 0) {
      const user = userQuery.rows[0];
      console.log('  Email:', user.email);
      console.log('  Password Hash:', user.password_hash.substring(0, 20) + '...');
      
      // Test password comparison
      console.log('\nTesting password verification...');
      const isMatch = await bcrypt.compare('password123', user.password_hash);
      console.log('✓ Password matches:', isMatch);
    }
    
    // Test creating a user
    console.log('\nTesting user creation...');
    const testEmail = 'testuser' + Date.now() + '@test.com';
    const testPassword = 'testpass123';
    const hash = await bcrypt.hash(testPassword, 10);
    
    const insertResult = await pool.query(
      'INSERT INTO users (email, password_hash, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING *',
      [testEmail, hash]
    );
    
    console.log('✓ User created:', insertResult.rows[0].email);
    console.log('  ID:', insertResult.rows[0].id);
    
    await pool.end();
    console.log('\n✅ All tests passed!');
  } catch (err) {
    console.error('❌ Error:', err.message);
    console.error('Stack:', err.stack);
    process.exit(1);
  }
}

test();

