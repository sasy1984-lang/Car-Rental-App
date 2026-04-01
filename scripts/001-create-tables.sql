-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create cars table
CREATE TABLE IF NOT EXISTS cars (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(500) NOT NULL,
  rent_per_hour DECIMAL(10, 2) NOT NULL,
  capacity INTEGER NOT NULL,
  fuel_type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  car_id INTEGER NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
  bookedtime_slots JSONB NOT NULL,
  total_hours INTEGER NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  transaction_id VARCHAR(255),
  driver_required BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_car_id ON bookings(car_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Insert sample cars
INSERT INTO cars (name, image, rent_per_hour, capacity, fuel_type) VALUES
  ('Audi A3', 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500', 25.00, 4, 'Petrol'),
  ('BMW 3 Series', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500', 35.00, 4, 'Diesel'),
  ('Mercedes C-Class', 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500', 40.00, 4, 'Petrol'),
  ('Tesla Model 3', 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500', 50.00, 5, 'Electric'),
  ('Volkswagen Golf', 'https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?w=500', 20.00, 5, 'Diesel'),
  ('Fiat 500', 'https://images.unsplash.com/photo-1595787142518-1ba52c57101e?w=500', 15.00, 4, 'Petrol')
ON CONFLICT DO NOTHING;
