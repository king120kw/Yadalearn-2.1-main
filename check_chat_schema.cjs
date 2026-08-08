const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres.yxqezrvgvfwdgrlwczea:Alliswell12%40%40@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres' });
client.connect().then(async () => {
  const cols = await client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'chat_messages'");
  console.log('chat_messages columns:', cols.rows);
  const policies = await client.query("SELECT policyname, cmd, qual, with_check FROM pg_policies WHERE tablename = 'chat_messages'");
  console.log('chat_messages policies:', policies.rows);
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
