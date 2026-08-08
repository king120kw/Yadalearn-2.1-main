const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres.yxqezrvgvfwdgrlwczea:Alliswell12%40%40@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres' });

async function run() {
  await client.connect();
  console.log("Connected to DB");

  // Check policies on live_classes
  const policies = await client.query("SELECT policyname FROM pg_policies WHERE tablename = 'live_classes'");
  console.log("Existing live_classes policies:", policies.rows.map(r => r.policyname));

  // Add SELECT policy for authenticated users to view live_classes statuses
  try {
    await client.query(`
      CREATE POLICY "Authenticated users can view live_classes"
      ON public.live_classes
      FOR SELECT
      USING (auth.role() = 'authenticated');
    `);
    console.log("Created 'Authenticated users can view live_classes' SELECT policy");
  } catch (e) {
    console.log("SELECT policy error or already exists:", e.message);
  }

  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
