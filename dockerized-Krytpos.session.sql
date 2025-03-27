


--@block
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';


--@block
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'users';

--@block 
SELECT * FROM users
-- SELECT * from saved_stock
-- DElETE FROM saved_stock
-- DROP TABLE saved_stock

--@block 
-- SELECT * FROM signed_terms
DElETE FROM signed_terms




--@block
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'saved_stock' 
AND indexname = 'idx_stock_user';


--@block 
SELECT * from price_forecast

--@block 
SELECT * FROM saved_stock WHERE user_id = 'user_2uabclBU1y3lea8xEqm9bJpKMis';


--@block 
UPDATE daily_price
SET percent_change = 0.10
WHERE id = 30
--@block 
SELECT 
    price_forecast.price AS forecasted_price, 
    daily_price.price AS real_price, 
    daily_price.date
FROM 
    daily_price
JOIN 
    stock ON stock.id = daily_price.stock_id
JOIN 
    price_forecast ON price_forecast.stock_id = stock.id 
                   AND DATE(price_forecast.date) = DATE(daily_price.date)
WHERE 
    stock.ticker = 'BTC';


--@block 
INSERT INTO daily_price (price, date, market_cap, created_at, volume, stock_id)
VALUES 
(50000, '2024-03-01 00:00:00+00', 900000000000, 1710000000, 35000, 1),
(51000, '2024-03-02 00:00:00+00', 910000000000, 1710086400, 36000, 1);

--@block 
INSERT INTO price_forecast (price, date, created_at, stock_id)
VALUES 
(50500, '2024-03-01 00:00:00+00', '2024-02-28 12:00:00+00', 1),
(51500, '2024-03-02 00:00:00+00', '2024-03-01 12:00:00+00', 1);


--@block 
SELECT 
    price_forecast.price AS forecasted_price, 
    daily_price.price AS real_price, 
    daily_price.date
FROM 
    daily_price
JOIN 
    stock ON stock.id = daily_price.stock_id
JOIN 
    price_forecast ON price_forecast.stock_id = stock.id 
                   AND price_forecast.date = daily_price.date
WHERE 
    stock.ticker = 'BTC';


--@block
INSERT INTO daily_price (price, market_cap, created_at, date, volume, stock_id)
VALUES
(96635, 1915093756057, 1738886400000, '2023-11-10', 44462180396, 1),
(96558, 1911296376425, 1738972800000, '2023-11-11', 57077722340, 1),
(96558, 1914211835440, 1739059200000, '2023-11-12', 20760850644, 1),
(96548, 1913068773356, 1739145600000, '2023-11-13', 25457107581, 1),
(97399, 1930742951090, 1739232000000, '2023-11-14', 37054987393, 1),
(95739, 1898788887978, 1739318400000, '2023-11-15', 36454577154, 1),
(97836, 1936842454814, 1739404800000, '2023-11-16', 47115618235, 1),
(96561, 1914315097486, 1739491200000, '2023-11-17', 29084371910, 1),
(97488, 1931656846871, 1739577600000, '2023-11-18', 32289906944, 1),
(97569, 1934308378710, 1739664000000, '2023-11-19', 14215311318, 1),
(96149, 1905012222220, 1739750400000, '2023-11-20', 13634794998, 1),
(95776, 1898997753781, 1739836800000, '2023-11-21', 25324374113, 1),
(95495, 1892702154844, 1739923200000, '2023-11-22', 38311133144, 1),
(96554, 1914337919659, 1740009600000, '2023-11-23', 27703222487, 1),
(98384, 1950376106325, 1740096000000, '2023-11-24', 24175261969, 1),
(96135, 1906058197506, 1740182400000, '2023-11-25', 42477472950, 1),
(96564, 1915260330870, 1740268800000, '2023-11-26', 18464415570, 1),
(96327, 1909625674815, 1740355200000, '2023-11-27', 16643044374, 1),
(91396, 1814176779160, 1740441600000, '2023-11-28', 45539703844, 1),
(88755, 1759750360550, 1740528000000, '2023-11-29', 96742453402, 1),
(83900, 1664314955447, 1740614400000, '2023-11-30', 69277430795, 1),
(84709, 1679555320077, 1740700800000, '2023-12-01', 305190442156, 1),
(84441, 1674754437110, 1740787200000, '2023-12-02', 80695237175, 1),
(86005, 1705564098300, 1740873600000, '2023-12-03', 30634474722, 1),
(94261, 1868321705444, 1740960000000, '2023-12-04', 61859112550, 1),
(86124, 1708198960874, 1741046400000, '2023-12-05', 68715362745, 1),
(87310, 1731441668069, 1741132800000, '2023-12-06', 65863356680, 1),
(90604, 1797706868227, 1741219200000, '2023-12-07', 51606642859, 1),
(90001, 1782785866811, 1741305600000, '2023-12-08', 47555759124, 1),
(86809, 1724855455204, 1741307783000, '2023-12-08', 42482795375, 1);



--@block 
INSERT INTO stock (color, name, ticker, icon_type)  
VALUES  
    ('#FFA500', 'Bitcoin', 'BTC', 'SiBitcoin');


--@block
DROP TABLE bitcoin_prediction




--@block 
SELECT * FROM stock

--@block 
DElETE FROM stock WHERE id = 1
