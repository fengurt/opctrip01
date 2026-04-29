import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

const replacements = [
  ['/images/l60qANZf8XX0.jpg', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031722344/F3yU7NnX8QP8zNNpCsJM3K/l60qANZf8XX0_b2c8e9c8.jpg'],
  ['/images/basel-art-day5.jpg', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031722344/F3yU7NnX8QP8zNNpCsJM3K/basel-art-day5_a23131a4.jpg'],
  ['/images/cambodia-day4.jpg', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031722344/F3yU7NnX8QP8zNNpCsJM3K/cambodia-day4_d1482702.jpg'],
  ['/images/elnido-day3.jpg', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031722344/F3yU7NnX8QP8zNNpCsJM3K/elnido-day3_c8ff89c2.jpg'],
  ['/images/basel-art-day3.jpg', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031722344/F3yU7NnX8QP8zNNpCsJM3K/basel-art-day3_c3a34b74.jpg'],
  ['/images/V2aUJWzZ2Z93.jpg', 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031722344/F3yU7NnX8QP8zNNpCsJM3K/V2aUJWzZ2Z93_836586ad.jpg'],
];

for (const [oldPath, newUrl] of replacements) {
  // Update trips table
  const [r1] = await conn.execute('UPDATE trips SET heroImage = ? WHERE heroImage = ?', [newUrl, oldPath]);
  if (r1.affectedRows > 0) console.log(`Updated trips heroImage: ${oldPath} -> CDN`);
  
  // Update days table
  const [r2] = await conn.execute('UPDATE days SET image = ? WHERE image = ?', [newUrl, oldPath]);
  if (r2.affectedRows > 0) console.log(`Updated days image: ${oldPath} -> CDN`);
}

console.log('Done updating image URLs in database');
await conn.end();
