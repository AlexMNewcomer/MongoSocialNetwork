import connection from '../config/connection.js';
import { User } from '../routes/api/index';
import { getRandomName } from './data'; // Removed getRandomApplications


connection.on('error', (err) => console.error(err));

connection.once('open', async () => {
  console.log('Connected to database');

  // Delete the 'users' collection if it exists
  const userCheck = await connection.db?.listCollections({ name: 'users' }).toArray();
  if (userCheck?.length) {
    await connection.dropCollection('users');
  }

  const users = [];

  for (let i = 0; i < 20; i++) {
    const fullName = getRandomName();
    const [first, last] = fullName.split(' ');

    users.push({
      first,
      last,
      age: Math.floor(Math.random() * (99 - 18 + 1) + 18),
    });
  }

  // Insert users into the database
  await User.insertMany(users);

  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
