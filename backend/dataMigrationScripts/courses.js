const mysql = require('mysql2/promise');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();
const prefix = 'GwS0O_';

async function migrateCourses() {
  const wpCredentials = {
    host: process.env.WORDPRESS_DB_HOST,
    port: process.env.WORDPRESS_DB_PORT,
    user: process.env.WORDPRESS_DB_USER,
    password: process.env.WORDPRESS_DB_PASSWORD,
    database: process.env.WORDPRESS_DB_NAME,
  };

  // Connect to WordPress database
  const wpConnection = await mysql.createConnection(wpCredentials);

  try {
    // Fetch WordPress users
    const [users] = await wpConnection.execute(`${prefix}users`);
    // const [meta] = await wpConnection.execute(
    //   `SELECT * FROM ${prefix}usermeta`,
    // );

    for (const user of users) {
      const { firstName, lastName } = splitName(user.display_name);

      // Map WordPress user data to Prisma user schema
      const prismaUser = {
        email: user.user_email,
        password: user.user_pass,
        first_name: firstName,
        last_name: lastName,
        user_name: user.user_login,
        // unique_code,
        // phone,
        // photo,
        // country,
        // birth_date,
        roles: '3',
        status: 1,
        email_verified: 0,
        phone_verified: 0,
        // gender,
        // provider,
        // provider_id,
        created_at: new Date(user.user_registered),
        updated_at: new Date(),
        // course_id,
      };

      try {
        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
          where: { email: prismaUser.email },
        });
    
        if (existingUser) {
          console.log(`User with email ${prismaUser.email} already exists. Skipping...`);
          continue; // Skip this user
        }
    
        // Insert user into Prisma database
        await prisma.user.create({
          data: prismaUser,
        });
    
        console.log('Migrated user:', prismaUser);
      } catch (error) {
        console.error('Error migrating user:', prismaUser.email, error);
      }    
    }
    console.log(`Fetched
      ${users.length}
    users from WordPress.`);
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    // Close connections
    await wpConnection.end();
    await prisma.$disconnect();
    console.log('Migration completed.');
  }
}

migrateCourses().catch((error) => {
  console.error('Migration script failed:', error);
});
