
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vynquhvtzfvsmkormkjz.supabase.co';
// The key provided appears to be non-standard. We wrap initialization to prevent crashes.
const supabaseAnonKey = 'sb_publishable_Kslslkjma2IFMHJDYsa8ng_8aIz-rA6';

let supabaseClient;

try {
    // Attempt to create the client. 
    // If the key format is strictly validated by the library and fails, we catch it.
    if (!supabaseAnonKey || !supabaseUrl) {
        throw new Error("Missing Supabase credentials");
    }
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
} catch (error) {
    console.warn("Supabase client failed to initialize. Using offline fallback.", error);
    
    // Mock client that returns empty data/errors without crashing the UI
    supabaseClient = {
        from: () => ({
            select: () => Promise.resolve({ data: null, error: { message: "Supabase not initialized" } }),
            insert: () => Promise.resolve({ data: null, error: { message: "Supabase not initialized" } }),
            update: () => Promise.resolve({ data: null, error: { message: "Supabase not initialized" } }),
            delete: () => Promise.resolve({ data: null, error: { message: "Supabase not initialized" } }),
            on: () => ({ subscribe: () => {} }),
        }),
        channel: () => ({
            on: () => ({ subscribe: () => {} }),
            subscribe: () => {},
            remove: () => {},
            unsubscribe: () => {}
        }),
        removeChannel: () => {},
    } as any;
}

export const supabase = supabaseClient;
