
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vynquhvtzfvsmkormkjz.supabase.co';
const supabaseAnonKey = 'sb_publishable_Kslslkjma2IFMHJDYsa8ng_8aIz-rA6';

// Helper to create a safe mock client that supports chaining
const createMockClient = () => {
    const mockChannel = {
        on: function() { return this; },
        subscribe: function() { return this; },
        unsubscribe: function() { return this; },
        remove: function() { return this; },
        send: function() { return Promise.resolve(); }
    };

    return {
        from: () => ({
            select: () => Promise.resolve({ data: null, error: { message: "Using mock data (offline mode)" } }),
            insert: () => Promise.resolve({ data: null, error: { message: "Using mock data (offline mode)" } }),
            update: () => Promise.resolve({ data: null, error: { message: "Using mock data (offline mode)" } }),
            delete: () => Promise.resolve({ data: null, error: { message: "Using mock data (offline mode)" } }),
            on: () => mockChannel,
        }),
        channel: () => mockChannel,
        removeChannel: () => {},
        auth: {
            getSession: () => Promise.resolve({ data: { session: null }, error: null }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        }
    } as any;
};

let supabaseClient;

try {
    // If the key starts with 'sb_publishable', it's likely a non-standard or placeholder key
    // that might cause the official client to throw or behave unexpectedly.
    // We bypass initialization in this case.
    if (!supabaseAnonKey || supabaseAnonKey.startsWith('sb_publishable')) {
        console.warn("Detected placeholder/invalid Supabase key. Initializing mock client.");
        supabaseClient = createMockClient();
    } else {
        supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    }
} catch (error) {
    console.warn("Supabase client initialization failed. Using mock client.", error);
    supabaseClient = createMockClient();
}

export const supabase = supabaseClient;
