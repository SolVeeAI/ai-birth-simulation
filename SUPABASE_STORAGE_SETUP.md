# 🖼️ Supabase Storage Setup for AI Avatars

## 📝 Overview

This guide shows you how to create a storage bucket in Supabase for AI avatar images.

---

## 🚀 Step-by-Step Setup

### **Step 1: Go to Supabase Dashboard**

1. Open: https://supabase.com/dashboard
2. Select your project (the one you created earlier)
3. Click on **Storage** in the left sidebar (🗄️ icon)

---

### **Step 2: Create a Storage Bucket**

1. Click the **"New bucket"** button (top right)

2. Configure the bucket:
   ```
   Name: ai-avatars
   Public bucket: ✅ YES (check this box)
   File size limit: 5 MB
   Allowed MIME types: image/png, image/jpeg, image/webp
   ```

3. Click **"Create bucket"**

---

### **Step 3: Set Storage Policies** ⭐ IMPORTANT

You need to allow public read access and authenticated uploads.

#### **Method 1: Using Supabase UI (Easiest)**

1. Click on your **"ai-avatars"** bucket
2. Click **"Policies"** tab
3. Click **"New policy"**
4. Select **"For full customization"**

**Policy 1: Public Read Access**
```sql
Policy name: Public Avatar Read
Allowed operation: SELECT
Target roles: public
USING expression: true
```

Click **"Review"** → **"Save policy"**

**Policy 2: Public Upload Access** (for now, will secure later)
```sql
Policy name: Public Avatar Upload
Allowed operation: INSERT
Target roles: public
WITH CHECK expression: true
```

Click **"Review"** → **"Save policy"**

**Policy 3: Public Update Access**
```sql
Policy name: Public Avatar Update
Allowed operation: UPDATE
Target roles: public
USING expression: true
WITH CHECK expression: true
```

Click **"Review"** → **"Save policy"**

---

#### **Method 2: Using SQL Editor (Advanced)**

1. Go to **SQL Editor** in Supabase
2. Run this SQL:

```sql
-- Enable public read access
CREATE POLICY "Public Avatar Read"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'ai-avatars');

-- Enable public upload
CREATE POLICY "Public Avatar Upload"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'ai-avatars');

-- Enable public update
CREATE POLICY "Public Avatar Update"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'ai-avatars')
WITH CHECK (bucket_id = 'ai-avatars');

-- Enable public delete (optional, for image replacement)
CREATE POLICY "Public Avatar Delete"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'ai-avatars');
```

---

### **Step 4: Update Database Schema**

Add avatar URL field to your `ai_dna_repository` table:

1. Go to **SQL Editor**
2. Run this SQL:

```sql
-- Add avatar columns to ai_dna_repository table
ALTER TABLE ai_dna_repository
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS avatar_uploaded_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS generated_prompt TEXT,
ADD COLUMN IF NOT EXISTS prompt_metadata JSONB;

-- Add index for faster avatar queries
CREATE INDEX IF NOT EXISTS idx_avatar_url ON ai_dna_repository(avatar_url);

-- Add comment
COMMENT ON COLUMN ai_dna_repository.avatar_url IS 'Supabase storage URL for AI avatar image';
COMMENT ON COLUMN ai_dna_repository.avatar_uploaded_at IS 'Timestamp when avatar was uploaded';
COMMENT ON COLUMN ai_dna_repository.generated_prompt IS 'AI-generated prompt for avatar creation';
COMMENT ON COLUMN ai_dna_repository.prompt_metadata IS 'Metadata about the prompt (category, personality, etc.)';
```

---

### **Step 5: Get Your Storage URL**

Your storage URL will be:
```
https://[YOUR_PROJECT_ID].supabase.co/storage/v1/object/public/ai-avatars/[filename]
```

You can find your project ID in the Supabase dashboard URL:
```
https://supabase.com/dashboard/project/[YOUR_PROJECT_ID]
```

---

## 🧪 Test Upload (Optional)

### **Test via Supabase UI:**

1. Go to **Storage** → **ai-avatars** bucket
2. Click **"Upload file"**
3. Upload a test image
4. Click on the uploaded file
5. Click **"Get URL"** to see the public URL
6. Try opening the URL in a new tab - it should work!

---

## ✅ Verification Checklist

- [ ] Storage bucket "ai-avatars" created
- [ ] Public bucket setting enabled
- [ ] Read policy created (public can view)
- [ ] Upload policy created (public can upload)
- [ ] Update policy created (public can replace)
- [ ] Database schema updated (avatar_url column added)
- [ ] Test upload successful
- [ ] Test URL accessible

---

## 🔐 Security Notes

**Current Setup:** Public uploads allowed (anyone can upload)

**For Production:** You should add authentication later:

```sql
-- Secure upload policy (only authenticated users)
DROP POLICY IF EXISTS "Public Avatar Upload" ON storage.objects;

CREATE POLICY "Authenticated Avatar Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'ai-avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

This ensures users can only upload to their own folder.

**For now:** Public is fine for testing. Secure it later when you add user authentication.

---

## 📊 Storage Limits (Free Tier)

- **Storage:** 1 GB free
- **Bandwidth:** 2 GB/month free
- **File size:** Up to 50 MB per file (we set 5 MB limit)

**How many avatars?**
- Average image: ~500 KB
- 1 GB = ~2,000 avatars
- **Plenty for testing!**

---

## 🛠️ Troubleshooting

### **Upload fails with "403 Forbidden"**
→ Storage policies not set correctly. Re-check Step 3.

### **Can't view uploaded images**
→ Bucket not set to "Public". Go to bucket settings and enable public access.

### **"Bucket not found" error**
→ Bucket name must be exactly: `ai-avatars` (lowercase, with hyphen)

### **CORS errors in browser**
→ Supabase handles CORS automatically for storage. If you see errors, check your bucket is public.

---

## 🎨 File Organization

Recommended structure:
```
ai-avatars/
  ├── abc123def456.png  (generation_id as filename)
  ├── ghi789jkl012.png
  ├── mno345pqr678.webp
  └── ...
```

Use generation_id as the filename to avoid duplicates and make URLs predictable.

---

## ✅ You're Ready!

Once you complete these steps:
1. ✅ Storage bucket is ready
2. ✅ Database schema updated
3. ✅ App can upload avatars
4. ✅ Images are publicly accessible

**Next:** The app will handle uploads automatically through the UI!

---

*Need help? Check Supabase docs: https://supabase.com/docs/guides/storage*

