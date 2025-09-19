const fs = require('fs');
const pool = require('./db');

async function runSQLFile(filePath) {
  const sql = fs.readFileSync(filePath, 'utf8');
  const statements = sql.split(';').filter(stmt => stmt.trim().length > 0);
  for (const statement of statements) {
    await pool.query(statement);
  }
}

async function runDummyData() {
  const { exec } = require('child_process');
  return new Promise((resolve, reject) => {
    exec('node dummy_data.js', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing dummy_data.js: ${error}`);
        reject(error);
        return;
      }
      console.log(`Dummy data insertion output: ${stdout}`);
      if (stderr) console.error(`Stderr: ${stderr}`);
      resolve();
    });
  });
}

async function main() {
  try {
    console.log('Running schema.sql...');
    await runSQLFile('schema.sql');
    console.log('Schema created successfully');

    console.log('Inserting dummy data...');
    await runDummyData();
    console.log('Dummy data insertion completed');
  } catch (err) {
    console.error('Failed:', err);
  } finally {
    pool.end();
    process.exit(0);
  }
}

main();
