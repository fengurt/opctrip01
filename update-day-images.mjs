import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const connection = await mysql.createConnection(DATABASE_URL);

// Define image mappings for each trip
const tripImages = {
  'cambodia-business': {
    1: '/images/cambodia-day1.jpg',
    2: '/images/cambodia-day2.jpg',
    3: '/images/cambodia-day3.jpg',
    4: '/images/cambodia-day4.jpg',
    5: '/images/cambodia-day5.jpg',
  },
  'basel-art': {
    1: '/images/basel-art-day1.jpg',
    2: '/images/basel-art-day2.jpg',
    3: '/images/basel-art-day3.jpg',
    4: '/images/basel-art-day4.jpg',
    5: '/images/basel-art-day5.jpg',
    6: '/images/basel-art-day6.jpg',
  },
  'fantasy-basel': {
    1: '/images/fantasy-basel-day1.jpg',
    2: '/images/fantasy-basel-day2.jpg',
    3: '/images/fantasy-basel-day3.jpg',
    4: '/images/fantasy-basel-day4.jpg',
    5: '/images/fantasy-basel-day5.jpg',
    6: '/images/fantasy-basel-day6.jpg',
    7: '/images/fantasy-basel-day7.jpg',
  },
  'london-heritage': {
    1: '/images/london-day1.jpg',
    2: '/images/london-day2.jpg',
    3: '/images/london-day3.jpg',
    4: '/images/london-day4.jpg',
    5: '/images/london-day5.jpg',
    6: '/images/london-day6.jpg',
    7: '/images/london-day7.jpg',
  },
  'el-nido-paradise': {
    1: '/images/elnido-day1.jpg',
    2: '/images/elnido-day2.jpg',
    3: '/images/elnido-day3.jpg',
    4: '/images/elnido-day4.jpg',
    5: '/images/elnido-day5.jpg',
  },
  'kyoto-zen': {
    1: '/images/kyoto-day1.jpg',
    2: '/images/kyoto-day2.jpg',
    3: '/images/kyoto-day3.jpg',
    4: '/images/kyoto-day4.jpg',
    5: '/images/kyoto-day5.jpg',
    6: '/images/kyoto-day6.jpg',
  },
};

async function updateDayImages() {
  console.log('Updating day images...');

  for (const [tripSlug, dayImages] of Object.entries(tripImages)) {
    // Get trip ID
    const [trips] = await connection.execute(
      `SELECT id FROM trips WHERE slug = ?`,
      [tripSlug]
    );

    if (trips.length === 0) {
      console.log(`Trip ${tripSlug} not found, skipping...`);
      continue;
    }

    const tripId = trips[0].id;

    // Update each day's image
    for (const [dayNumber, imagePath] of Object.entries(dayImages)) {
      await connection.execute(
        `UPDATE days SET image = ? WHERE tripId = ? AND dayNumber = ?`,
        [imagePath, tripId, parseInt(dayNumber)]
      );
      console.log(`Updated ${tripSlug} day ${dayNumber} with ${imagePath}`);
    }
  }

  console.log('Day images updated successfully!');
  await connection.end();
}

updateDayImages().catch((err) => {
  console.error('Update failed:', err);
  process.exit(1);
});
