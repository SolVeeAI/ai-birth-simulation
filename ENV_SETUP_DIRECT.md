# 🔌 Direct PostgreSQL Connection Setup

## ⚠️ SECURITY WARNING

**You shared your database credentials publicly!** 

Your current password is exposed. After testing, you should:
1. Go to Supabase Dashboard
2. Settings > Database > Reset Database Password
3. Update your .env with the new password

---

## 🔑 Your Database Info

From your connection string, I extracted:

```
Project Reference: fkuupsqwllejhyiulorm
Host: db.fkuupsqwllejhyiulorm.supabase.co
Database: postgres
Port: 5432
User: postgres
Password: V^7>{E4pw2@EKKIR4gTp2|mo~2?;S*j
```

**Supabase REST API URL:**
```
https://fkuupsqwllejhyiulorm.supabase.co
```

---

## 📝 Step 1: Get Your Anon Key

You still need the **anonymous public key** for browser access:

1. Go to: https://app.supabase.com/project/fkuupsqwllejhyiulorm/settings/api
2. Find **Project API keys** section
3. Copy the `anon` `public` key (long string starting with `eyJ...`)

---

## 📝 Step 2: Create/Update .env File

Create or update `.env` in your project root:

```bash
# 🌐 SUPABASE (Required for browser app)
VITE_SUPABASE_URL=https://fkuupsqwllejhyiulorm.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...your_actual_anon_key_here

# 🔌 DIRECT DATABASE (Optional - for server-side only)
VITE_DATABASE_URL=postgresql://postgres:V^7>{E4pw2@EKKIR4gTp2|mo~2?;S*j@db.fkuupsqwllejhyiulorm.supabase.co:5432/postgres

# 🤖 OPENROUTER (Optional - for 5x faster learning)
VITE_OPENROUTER_API_KEY=your_openrouter_key_here
VITE_OPENROUTER_MODEL=meta-llama/llama-3-8b-instruct:free
```

---

## 🧪 Step 3: Test the Connection

### Option 1: Run Test in App

1. Open `src/App.jsx`

2. Add import at the top:
```javascript
import { runAllTests } from './utils/databaseTest';
```

3. Add this useEffect (temporary):
```javascript
useEffect(() => {
  runAllTests();
}, []);
```

4. Start dev server:
```bash
npm run dev
```

5. Open browser console (F12) and check results

6. Remove the test code after confirming it works

### Option 2: Create Test Page

1. Create `src/TestDatabase.jsx`:

```javascript
import { useState } from 'react';
import { runAllTests, testSupabaseConnection } from './utils/databaseTest';

function TestDatabase() {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState(null);

  const handleTest = async () => {
    setTesting(true);
    setResults(null);
    const res = await runAllTests();
    setResults(res);
    setTesting(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🧪 Database Connection Test</h1>
        
        <button
          onClick={handleTest}
          disabled={testing}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {testing ? '⏳ Testing...' : '🚀 Run Tests'}
        </button>

        {results && (
          <div className="mt-8 space-y-4">
            <div className={`p-4 rounded-lg ${results.supabase.success ? 'bg-green-900/50' : 'bg-red-900/50'}`}>
              <h3 className="font-bold mb-2">
                {results.supabase.success ? '✅' : '❌'} Supabase REST API
              </h3>
              <p className="text-sm opacity-80">{results.supabase.message}</p>
              {results.supabase.totalRecords !== undefined && (
                <p className="text-sm mt-2">Total AI Children: {results.supabase.totalRecords}</p>
              )}
            </div>

            <div className={`p-4 rounded-lg ${results.postgres.success ? 'bg-green-900/50' : 'bg-yellow-900/50'}`}>
              <h3 className="font-bold mb-2">
                {results.postgres.success ? '✅' : '⚠️'} PostgreSQL Direct
              </h3>
              <p className="text-sm opacity-80">{results.postgres.message}</p>
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <h3 className="font-bold mb-2">📖 Instructions</h3>
          <ol className="text-sm space-y-2 opacity-80">
            <li>1. Make sure .env file exists with credentials</li>
            <li>2. Click "Run Tests" button</li>
            <li>3. Check browser console (F12) for detailed logs</li>
            <li>4. Green = Working, Red = Needs fixing</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default TestDatabase;
```

2. Update `src/App.jsx` to show test page (temporarily):

```javascript
import TestDatabase from './TestDatabase';

function App() {
  // Temporarily show test page
  return <TestDatabase />;
  
  // ... rest of your app code
}
```

3. Visit http://localhost:5173 and run tests

4. After confirming, revert App.jsx to normal

---

## ✅ What Each Test Does

### 1. **Supabase REST API Test**
- ✅ Verifies URL and anon key are correct
- ✅ Checks connection to database
- ✅ Counts existing AI children
- ✅ Tests write permissions (insert + delete)
- ✅ Tests real-time subscriptions

### 2. **PostgreSQL Direct Test**
- ✅ Validates connection string format
- ✅ Extracts project info
- ⚠️ Notes that direct connections work best server-side

---

## 🎯 Expected Results

### ✅ Success:
```
🧪 Testing Supabase Connection...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📡 URL: https://fkuupsqwllejhyiulorm.supabase.co
🔑 Key: eyJhbGciOiJIUzI1NiIs...

1️⃣ Testing basic connection...
✅ Connection successful!

2️⃣ Counting AI children in database...
✅ Total AI children: 0

3️⃣ Testing write permissions...
✅ Write permissions OK!
✅ Test record cleaned up

4️⃣ Testing real-time subscriptions...
✅ Real-time subscriptions working!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ ALL TESTS PASSED!
🌍 Supabase is properly configured and working!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### ❌ If it fails:

**Error: "Missing credentials"**
- Solution: Make sure .env file exists and has both URL and anon key

**Error: "Connection failed"**
- Solution: Check if URL is correct (no typos)
- Solution: Verify project is not paused (free tier pauses after 1 week inactivity)

**Error: "relation 'ai_dna_repository' does not exist"**
- Solution: Run the SQL from SUPABASE_SETUP.md in Supabase SQL Editor

**Error: "Insert failed"**
- Solution: Check table permissions in Supabase (should allow public inserts)

---

## 🔒 Security Best Practices

### ✅ DO:
- Use `VITE_SUPABASE_ANON_KEY` in browser (safe, has Row Level Security)
- Keep `.env` file in `.gitignore` (already done)
- Use Supabase REST API for all browser operations
- Reset your password after testing (since you shared it)

### ❌ DON'T:
- Use `VITE_DATABASE_URL` in browser code (exposes admin password!)
- Commit `.env` to git
- Share your connection string publicly (oops, too late - reset it!)
- Use `service_role` key in browser (full admin access)

---

## 📊 Connection Methods Comparison

| Method | Use Case | Security | Browser Safe |
|--------|----------|----------|--------------|
| **Supabase REST API** | Main app, browser | ✅ Row Level Security | ✅ Yes |
| **PostgreSQL Direct** | Server-side, scripts | ⚠️ Admin access | ❌ No |
| **Service Role** | Admin operations | ⚠️ Full access | ❌ No |

**Recommendation**: Use Supabase REST API (it's what we're already using!)

---

## 🚀 After Testing

Once tests pass:

1. ✅ **Remove test code** from App.jsx
2. ✅ **Delete TestDatabase.jsx** (or keep for future debugging)
3. ✅ **Complete the simulation** to test real usage
4. ✅ **Check Stage 5** to see if collective stats load
5. ✅ **Reset your database password** (security!)

---

## 🔄 Reset Password (Recommended)

1. Go to: https://app.supabase.com/project/fkuupsqwllejhyiulorm/settings/database
2. Find **Database password** section
3. Click **Reset database password**
4. Copy new password
5. Update `VITE_DATABASE_URL` in .env with new password
6. Restart dev server

**New connection string format:**
```bash
postgresql://postgres:NEW_PASSWORD_HERE@db.fkuupsqwllejhyiulorm.supabase.co:5432/postgres
```

---

## ❓ Troubleshooting

### Issue: Tests pass but Stage 5 shows "local-only"

**Solution**: The Supabase credentials are correct, but need to restart dev server:
```bash
# Stop server (Ctrl+C)
npm run dev
# Hard refresh browser (Ctrl+Shift+R)
```

### Issue: "Failed to fetch" errors

**Solution**: Check if Supabase project is paused:
1. Go to https://app.supabase.com
2. Check project status
3. If paused, click "Restore"

### Issue: Real-time not working

**Solution**: Enable Realtime in Supabase:
1. Go to Database > Replication
2. Enable replication for `ai_dna_repository` table
3. Save

---

## 📖 Next Steps

After confirming connection works:

1. ✅ Complete the full simulation
2. ✅ Check Stage 5 collective stats
3. ✅ Try from another browser/device
4. ✅ Verify real-time updates
5. ✅ Monitor Supabase Dashboard for incoming data

**Your database is ready! 🎉**

---

## 🆘 Need Help?

If tests fail, check:
- [ ] .env file exists and has correct values
- [ ] Anon key is copied correctly (long string)
- [ ] SQL from SUPABASE_SETUP.md was run
- [ ] Supabase project is active (not paused)
- [ ] Dev server was restarted after adding .env
- [ ] Browser console (F12) for detailed error messages

Check `SUPABASE_SETUP.md` for complete setup instructions!

