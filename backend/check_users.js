
import { mysqlPool } from './config/db.js';

async function checkUsers() {
         try {
                  const [rows] = await mysqlPool.execute('SELECT * FROM users');
                  console.log('--- Current Users in DB ---');
                  console.table(rows);
                  process.exit(0);
         } catch (err) {
                  console.error(err);
                  process.exit(1);
         }
}

checkUsers();
