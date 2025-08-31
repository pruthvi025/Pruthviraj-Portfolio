const fs = require('fs');
const path = require('path');

console.log('Current directory:', __dirname);
console.log('Env file path:', path.join(__dirname, '.env.local'));

// Check if file exists
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  console.log('✅ .env.local file exists');
  
  // Read file content
  const content = fs.readFileSync(envPath, 'utf8');
  console.log('File content:');
  console.log(content);
  
  // Try to parse manually
  const lines = content.split('\n').filter(line => line.trim() && !line.startsWith('#'));
  console.log('\nParsed lines:');
  lines.forEach(line => {
    const [key, value] = line.split('=');
    console.log(`${key} = ${value}`);
  });
} else {
  console.log('❌ .env.local file not found');
}

// Try dotenv
try {
  require('dotenv').config({ path: envPath });
  console.log('\nAfter dotenv:');
  console.log('GMAIL_USER:', process.env.GMAIL_USER);
  console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? '***SET***' : 'NOT SET');
  console.log('CONTACT_EMAIL:', process.env.CONTACT_EMAIL);
} catch (error) {
  console.error('Dotenv error:', error);
}
