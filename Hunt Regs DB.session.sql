

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
SELECT * FROM test