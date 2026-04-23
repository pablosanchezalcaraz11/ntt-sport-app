import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

// Este es el objeto que usaremos para hablar con la base de datos
export const supabase = createClient(supabaseUrl, supabaseKey);