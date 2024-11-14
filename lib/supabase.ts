import { Database } from '@/database.types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://wnmactmpygyrsfqgqxis.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndubWFjdG1weWd5cnNmcWdxeGlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1NzE1NTMsImV4cCI6MjA0NzE0NzU1M30.OU1abomYOxv9Xqu-dbo8LntI0CQ4Tz511QqiVy6VkVE"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})