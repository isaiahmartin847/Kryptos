


--@block
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

--@block
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'bitcoin_price';


--@block 
INSERT INTO bitcoin_price (id, price, market_cap, created_at, date, volume)
VALUES
    (1, 101275.337148142, 101275.337148142, NOW(), TO_TIMESTAMP(1737331200000 / 1000), 101275.337148142),
    (2, 101764.908601705, 101764.908601705, NOW(), TO_TIMESTAMP(1737417600000 / 1000), 101764.908601705);


--@block 
SELECT * FROM bitcoin_price