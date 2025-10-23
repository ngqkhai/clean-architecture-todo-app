-- PostgreSQL Seed Data for Clean Architecture To-Do Application
-- This file populates the database with sample data for development and testing

-- Note: Passwords are hashed using bcrypt with 10 salt rounds
-- Plain passwords for reference:
-- - alice@example.com: password123
-- - bob@example.com: securepass456

-- ============================================================
-- SEED USERS
-- ============================================================
INSERT INTO users (id, email, password_hash, created_at, updated_at) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'alice@example.com', '$2b$10$rBV2HBq1J3YkJX7xV2bHNO3V8JL0LvVxNHQXxPJ0gOGM7RJ8aLzJO', NOW(), NOW()),
  ('b1ffdc88-8b1a-4de7-cc5c-5cc8cd481b22', 'bob@example.com', '$2b$10$YVuC0YQdHBjH4J9xI3xJCerF1P1KQ9WLJZqVVDQ7nDQJ1EL4Q1UdC', NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- ============================================================
-- SEED TO-DO LISTS
-- ============================================================
INSERT INTO todo_lists (id, title, user_id, created_at, updated_at) VALUES
  -- Alice's lists
  ('c2aaed77-7a2b-4cd6-dd4d-4dd7de582c33', 'Work Projects', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', NOW(), NOW()),
  ('d3bbfe66-6b3c-4be5-ee5e-5ee8ef693d44', 'Home Chores', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', NOW(), NOW()),
  ('e4ccgf55-5c4d-4af4-ff4f-4ff9fg704e55', 'Personal Goals', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', NOW(), NOW()),
  
  -- Bob's lists
  ('f5ddgh44-4d5e-4bg5-gg5g-5gg0gh815f66', 'Shopping List', 'b1ffdc88-8b1a-4de7-cc5c-5cc8cd481b22', NOW(), NOW()),
  ('g6eehi33-3e6f-4ch6-hh6h-6hh1hi926g77', 'Fitness Routine', 'b1ffdc88-8b1a-4de7-cc5c-5cc8cd481b22', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- SEED TO-DO ITEMS
-- ============================================================
INSERT INTO todo_items (id, title, description, is_completed, list_id, user_id, start_date, deadline_date, created_at, updated_at) VALUES
  -- Work Projects items (Alice)
  ('11111111-1111-1111-1111-111111111111', 'Complete API documentation', 'Finish documenting all REST endpoints', false, 'c2aaed77-7a2b-4cd6-dd4d-4dd7de582c33', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', NOW(), NOW() + INTERVAL '7 days', NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222222', 'Review pull requests', 'Review 3 pending PRs from the team', true, 'c2aaed77-7a2b-4cd6-dd4d-4dd7de582c33', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', NOW() - INTERVAL '2 days', NOW(), NOW(), NOW()),
  ('33333333-3333-3333-3333-333333333333', 'Prepare presentation', 'Create slides for quarterly review meeting', false, 'c2aaed77-7a2b-4cd6-dd4d-4dd7de582c33', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', NOW(), NOW() + INTERVAL '14 days', NOW(), NOW()),
  
  -- Home Chores items (Alice)
  ('44444444-4444-4444-4444-444444444444', 'Clean garage', '', false, 'd3bbfe66-6b3c-4be5-ee5e-5ee8ef693d44', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', NULL, NOW() + INTERVAL '3 days', NOW(), NOW()),
  ('55555555-5555-5555-5555-555555555555', 'Fix leaky faucet', 'Call plumber or fix DIY', false, 'd3bbfe66-6b3c-4be5-ee5e-5ee8ef693d44', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', NULL, NULL, NOW(), NOW()),
  ('66666666-6666-6666-6666-666666666666', 'Grocery shopping', 'Buy milk, eggs, bread, vegetables', true, 'd3bbfe66-6b3c-4be5-ee5e-5ee8ef693d44', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day', NOW(), NOW()),
  
  -- Personal Goals items (Alice)
  ('77777777-7777-7777-7777-777777777777', 'Read 2 books this month', 'Currently reading Clean Architecture by Robert Martin', false, 'e4ccgf55-5c4d-4af4-ff4f-4ff9fg704e55', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', NOW(), NOW() + INTERVAL '30 days', NOW(), NOW()),
  
  -- Shopping List items (Bob)
  ('88888888-8888-8888-8888-888888888888', 'Buy new running shoes', 'Size 10, prefer Nike or Adidas', false, 'f5ddgh44-4d5e-4bg5-gg5g-5gg0gh815f66', 'b1ffdc88-8b1a-4de7-cc5c-5cc8cd481b22', NULL, NULL, NOW(), NOW()),
  ('99999999-9999-9999-9999-999999999999', 'Get birthday gift for Mom', 'Her birthday is next week!', false, 'f5ddgh44-4d5e-4bg5-gg5g-5gg0gh815f66', 'b1ffdc88-8b1a-4de7-cc5c-5cc8cd481b22', NULL, NOW() + INTERVAL '7 days', NOW(), NOW()),
  
  -- Fitness Routine items (Bob)
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Morning run - 5km', 'Start week with good energy', true, 'g6eehi33-3e6f-4ch6-hh6h-6hh1hi926g77', 'b1ffdc88-8b1a-4de7-cc5c-5cc8cd481b22', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day', NOW(), NOW()),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Gym session - Upper body', 'Focus on chest and arms', false, 'g6eehi33-3e6f-4ch6-hh6h-6hh1hi926g77', 'b1ffdc88-8b1a-4de7-cc5c-5cc8cd481b22', NOW(), NOW(), NOW(), NOW()),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Yoga class', 'Wednesday evening at 7 PM', false, 'g6eehi33-3e6f-4ch6-hh6h-6hh1hi926g77', 'b1ffdc88-8b1a-4de7-cc5c-5cc8cd481b22', NOW() + INTERVAL '2 days', NOW() + INTERVAL '2 days', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- VERIFICATION QUERIES (commented out, use for manual testing)
-- ============================================================
-- SELECT COUNT(*) as user_count FROM users;
-- SELECT COUNT(*) as list_count FROM todo_lists;
-- SELECT COUNT(*) as item_count FROM todo_items;
-- SELECT u.email, COUNT(l.id) as list_count FROM users u LEFT JOIN todo_lists l ON u.id = l.user_id GROUP BY u.email;

