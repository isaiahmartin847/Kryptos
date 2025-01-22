

--@block
CREATE TABLE test (
    id SERIAL PRIMARY KEY,
    test BOOLEAN,
    auto_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


--@block 
INSERT INTO test (test) VALUES
(true),
(false),
(true),
(false),
(true);


--@block 
SELECT * FROM sessions


--@block 
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';

--@block 
SELECT * FROM users;
SELECT * FROM sessions;
SELECT * FROM states;
SELECT * FROM species;
SELECT * FROM hunting_units;

--@block
TRUNCATE sessions;

--@block
DROP TABLE "users"

--@block 
DROP TABLE "sessions"

--@block
-- Add a new UUID column with a default value
ALTER TABLE sessions ADD COLUMN new_id UUID DEFAULT gen_random_uuid();

-- Drop the old BIGINT column
ALTER TABLE sessions DROP COLUMN id;

-- Rename the new UUID column to 'id'
ALTER TABLE sessions RENAME COLUMN new_id TO id;


--@block 
-- DROP TABLE IF EXISTS "states" CASCADE;
-- DROP TABLE IF EXISTS "species" CASCADE;
-- DROP TABLE IF EXISTS "hunting_units" CASCADE;



--@block 
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'hunting_units';

--@block 
INSERT INTO states (full_name, name_abbreviation) VALUES
('Montana', 'MT'),
('Colorado', 'CO');


--@block 
INSERT INTO species (name, state_id) VALUES 
('deer', 1), 
('elk', 1),
('deer', 2), 
('elk', 2);

--@block 
INSERT INTO hunting_units (name, species_id) VALUES
('300', 1),
('300', 2),
('400', 1),
('400', 2),
('50', 3),
('50', 4),
('65', 3),
('65', 4);
