import { createClient } from "@supabase/supabase-js";

const supabaseUrl="https://mfuebrycyqhxalhhwptu.supabase.co"
const supabaseKey="sb_publishable_k7AQ1RKuuHHarDMCD4QffA_dr2Yytc1"

export const supabase=createClient(supabaseUrl, supabaseKey)