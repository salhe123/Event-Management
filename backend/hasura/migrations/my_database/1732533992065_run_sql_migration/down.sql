-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE TABLE public.transactions (
--     id SERIAL PRIMARY KEY,
--     event_id INTEGER NOT NULL,
--     user_id INTEGER NOT NULL,
--     amount NUMERIC NOT NULL,
--     checkout_url TEXT NOT NULL,
--     phoneNumber VARCHAR(20) NOT NULL,
--     tx_rf TEXT NOT NULL,
--     created_at TIMESTAMP DEFAULT NOW()
-- );