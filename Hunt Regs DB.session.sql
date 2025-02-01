

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
-- SELECT * FROM sessions;
-- SELECT * FROM states;
-- SELECT * FROM species;
-- SELECT * FROM hunting_units;
-- SELECT * FROM base_regulations

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
UPDATE hunting_units
SET base_regulation_id = '48d67ab9-2ff1-4ec7-bd3a-1bc97b93b709'
WHERE id = 2;

--@block 
SELECT column_name,
       data_type,
       character_maximum_length,
       is_nullable,
       column_default
FROM information_schema.columns
WHERE table_schema = 'public'  -- Use the schema name, typically 'public'
  AND table_name   = 'base_regulations';  -- Replace with your actual table name

--@block 
INSERT INTO states (full_name, name_abbreviation) VALUES
('Montana', 'MT'),
('Colorado', 'CO');

--@block
INSERT INTO base_regulations (id, name, weapon, hunter_orange, shooting_light, start_date, end_date, harvest_report, private_land_rule, blm_map)
VALUES 
  ('48d67ab9-2ff1-4ec7-bd3a-1bc97b93b709', 'HD 320', 'Rifle', true, 30, '03/01', '12/31', 'Must validate tags right away', 'Only with owners permission', 'map_url_png');


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
