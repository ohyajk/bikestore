import { createClient } from "@supabase/supabase-js";
import { useRef, useState } from "react";

// Add clerk to Window to avoid type errors
declare global {
    interface Window {
        Clerk: any;
    }
}

function createClerkSupabaseClient() {
    return createClient(
        import.meta.env.VITE_SUPABASE_URL!,
        import.meta.env.VITE_ANON_KEY!,
        {
            global: {
                // Get the Supabase token with a custom fetch method
                fetch: async (url, options = {}) => {
                    const clerkToken = await window.Clerk.session?.getToken({
                        template: "supabase",
                    });

                    // Construct fetch headers
                    const headers = new Headers(options?.headers);
                    headers.set("Authorization", `Bearer ${clerkToken}`);

                    // Now call the default fetch
                    return fetch(url, {
                        ...options,
                        headers,
                    });
                },
            },
        }
    );
}

const client = createClerkSupabaseClient();

export default function Supa() {
    const [addresses, setAddresses] = useState<any>();
    const listAddresses = async () => {
        // Fetches all addresses scoped to the user
        // Replace "Addresses" with your table name
        const { data, error } = await client.from("user").select();
        if (!error) setAddresses(data);
    };

    const inputRef = useRef<HTMLInputElement>(null);
    const sendAddress = async () => {
        if (!inputRef.current?.value) return;
        await client.from("user").insert({
            // Replace content with whatever field you want
            content: inputRef.current?.value,
        })
    };

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <input
                    onSubmit={sendAddress}
                    style={{ color: "black" }}
                    type="text"
                    ref={inputRef}
                />
                <button onClick={sendAddress}>Send Address</button>
                <button onClick={listAddresses}>Fetch Addresses</button>
            </div>
            <h2>Addresses</h2>
            {!addresses ? (
                <p>No addresses</p>
            ) : (
                <ul>
                    {addresses.map((address: any) => (
                        <li key={address.id}>{address.content}</li>
                    ))}
                </ul>
            )}
        </>
    );
}