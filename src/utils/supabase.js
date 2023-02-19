import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://lfnhxmfjaemosamxawbu.supabase.co";
const supabaseAnnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxmbmh4bWZqYWVtb3NhbXhhd2J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY1MjUzNzMsImV4cCI6MTk5MjEwMTM3M30.tjJ-tvkp5j-pTn3_C2y6L0c2_bQKObrLvwSL0oejzRA";

export const supabase = createClient(supabaseURL, supabaseAnnonKey);

