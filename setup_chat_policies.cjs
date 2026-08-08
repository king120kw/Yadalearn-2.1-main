const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres.yxqezrvgvfwdgrlwczea:Alliswell12%40%40@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres' });

async function run() {
  await client.connect();
  console.log("Connected to DB");

  // Check policies
  const policies = await client.query("SELECT policyname FROM pg_policies WHERE tablename = 'chat_messages'");
  console.log("Existing policies:", policies.rows.map(r => r.policyname));

  // Add UPDATE policy if not present
  try {
    await client.query(`
      CREATE POLICY "Users can update chat messages in their conversations"
      ON public.chat_messages
      FOR UPDATE
      USING ((auth.uid() = sender_id) OR (auth.uid() = receiver_id))
      WITH CHECK ((auth.uid() = sender_id) OR (auth.uid() = receiver_id));
    `);
    console.log("Created UPDATE policy");
  } catch (e) {
    console.log("UPDATE policy error or already exists:", e.message);
  }

  // Add DELETE policy if not present
  try {
    await client.query(`
      CREATE POLICY "Users can delete chat messages in their conversations"
      ON public.chat_messages
      FOR DELETE
      USING ((auth.uid() = sender_id) OR (auth.uid() = receiver_id));
    `);
    console.log("Created DELETE policy");
  } catch (e) {
    console.log("DELETE policy error or already exists:", e.message);
  }

  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
