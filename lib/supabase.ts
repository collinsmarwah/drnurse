
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vynquhvtzfvsmkormkjz.supabase.co';
const supabaseAnonKey = 'sb_publishable_Kslslkjma2IFMHJDYsa8ng_8aIz-rA6';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
