import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const connection = await mysql.createConnection(DATABASE_URL);

const [trips] = await connection.execute('SELECT id, slug FROM trips');
console.log('Trips in database:');
trips.forEach(t => console.log(`  ID: ${t.id}, Slug: ${t.slug}`));

await connection.end();
