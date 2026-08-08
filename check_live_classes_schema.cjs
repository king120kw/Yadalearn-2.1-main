const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres.yxqezrvgvfwdgrlwczea:Alliswell12%40%40@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres' });
client.connect().then(async () => {
  const cols = await client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'live_classes'");
  console.log('live_classes columns:', cols.rows);
  const rows = await client.query("SELECT * FROM live_classes LIMIT 10");
  console.log('sample rows:', rows.rows);
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
