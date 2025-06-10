


--@block
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';


--@blockgs
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'terms_and_conditions';

--@block
INSERT INTO terms_and_conditions (version, content) 
VALUES 
('1.0', 'These Terms and Conditions ("Terms") govern your use of the Kryptos web and mobile application ("App"), including the features, services, and content provided through the App. By accessing or using the App, you agree to be bound by these Terms and our Privacy Policy. If you do not agree with these Terms, you should not use the App.

1. General Use
1.1 License to Use the App: Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, and revocable license to use the App on your personal devices for your personal use. You may not use the App for any unlawful or prohibited purpose.

1.2 Account Registration: To access certain features of the App, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to keep your account information up to date.

2. Services Provided
2.1 Stock Data: The App provides real-time and historical stock market data, as well as forecasts related to stock performance. This data is aggregated from third-party sources and is intended for informational purposes only. While we strive to ensure the accuracy of the information provided, we do not guarantee its accuracy, completeness, or reliability.

2.2 Forecasts: The App provides stock forecasts based on historical data and algorithms. These forecasts are purely for informational purposes and are not guarantees of future performance. We do not warrant that the predictions will be accurate, complete, or reliable.

2.3 Third-Party Content: The App may include links to third-party websites or services that are not owned or controlled by Kryptos. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.

3. Financial Disclaimer
3.1 Not Financial Advice: The content provided by the App, including but not limited to stock data, forecasts, or analysis, is for informational purposes only. It is not intended as financial, investment, or trading advice. You should not rely on any of the information presented in the App to make any investment decisions.

3.2 Investment Risk: Investing in stocks and other financial instruments involves significant risk. You should consult with a qualified financial advisor before making any investment decisions. Kryptos is not responsible for any financial losses or damages arising from your use of the App or reliance on any information provided.

4. User Responsibilities
4.1 Account Security: You are responsible for maintaining the confidentiality of your account and password. You agree to notify us immediately if you suspect any unauthorized access to your account.

4.2 Prohibited Use: You may not use the App in any way that violates any applicable local, state, national, or international law or regulation. You may not attempt to gain unauthorized access to any part of the App, or interfere with or disrupt the functioning of the App.

5. Privacy and Data Collection
5.1 Privacy Policy: Your use of the App is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information. By using the App, you consent to the collection and use of your data as outlined in the Privacy Policy.

5.2 Data Storage: We may collect and store certain information about your use of the App, including browsing activity, user preferences, and other data. We are committed to securing your data and complying with applicable data protection laws.

6. Limitation of Liability
6.1 No Liability for Losses: Kryptos shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of your use or inability to use the App, including but not limited to damages for loss of profits, goodwill, use, data, or other intangible losses.

6.2 No Warranty: The App is provided "as is" and "as available," without any warranties, express or implied. Kryptos does not warrant that the App will be uninterrupted, error-free, or secure. We disclaim all warranties to the fullest extent permitted by law.

7. Modifications to the Terms
7.1 Amendments: Kryptos reserves the right to modify or update these Terms at any time. We will notify users of any significant changes to these Terms via email or through a prominent notice in the App.

8. Intellectual Property
8.1 Ownership: All content, features, and functionality available on the App, including but not limited to text, graphics, logos, images, and software, are the property of Kryptos and are protected by applicable intellectual property laws. You may not copy, modify, distribute, or otherwise use any part of the App without the express written permission of Kryptos.');

--@block 
SELECT * FROM users
-- SELECT * from saved_stock
-- DElETE FROM saved_stock
-- DROP TABLE saved_stock

--@block 
-- SELECT * FROM signed_terms
DElETE FROM signed_terms

--@block
SELECT * FROM price_forecast




--@block
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'saved_stock' 
AND indexname = 'idx_stock_user';


--@block 
SELECT * from stock

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
(50500, '2024-03-01 00:00:00+00', '2024-02-28 12:00:00+00', 2),
(51500, '2024-03-02 00:00:00+00', '2024-03-01 12:00:00+00', 2);


--@block 
DELETE FROM daily_price
WHERE stock_id = 2;
--@block
DELETE FROM price_forecast
WHERE price IN (1830.70, 1833.70)
  AND date IN ('2024-03-01 00:00:00+00', '2024-03-02 00:00:00+00')
  AND stock_id = 2;


--@block
DELETE FROM daily_price
WHERE id IN (32, 33);

--@block
SELECT * From price_forecast

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
-- Match the third forecast date (2025-05-06)
(96635.25, 570030000000, 1746393600000, '2025-05-06', 25000000000, 1);


--@block
INSERT INTO daily_price (price, market_cap, created_at, date, volume, stock_id)
VALUES
(96635, 1915093756057, 1738886400000, '2023-11-10', 44462180396, 2),
(96558, 1911296376425, 1738972800000, '2023-11-11', 57077722340, 2),
(96558, 1914211835440, 1739059200000, '2023-11-12', 20760850644, 2),
(96548, 1913068773356, 1739145600000, '2023-11-13', 25457107581, 2),
(97399, 1930742951090, 1739232000000, '2023-11-14', 37054987393, 2),
(95739, 1898788887978, 1739318400000, '2023-11-15', 36454577154, 2),
(97836, 1936842454814, 1739404800000, '2023-11-16', 47115618235, 2),
(96561, 1914315097486, 1739491200000, '2023-11-17', 29084371910, 2),
(97488, 1931656846871, 1739577600000, '2023-11-18', 32289906944, 2),
(97569, 1934308378710, 1739664000000, '2023-11-19', 14215311318, 2),
(96149, 1905012222220, 1739750400000, '2023-11-20', 13634794998, 2),
(95776, 1898997753781, 1739836800000, '2023-11-21', 25324374113, 2),
(95495, 1892702154844, 1739923200000, '2023-11-22', 38311133144, 2),
(96554, 1914337919659, 1740009600000, '2023-11-23', 27703222487, 2),
(98384, 1950376106325, 1740096000000, '2023-11-24', 24175261969, 2),
(96135, 1906058197506, 1740182400000, '2023-11-25', 42477472950, 2),
(96564, 1915260330870, 1740268800000, '2023-11-26', 18464415570, 2),
(96327, 1909625674815, 1740355200000, '2023-11-27', 16643044374, 2),
(91396, 1814176779160, 1740441600000, '2023-11-28', 45539703844, 2),
(88755, 1759750360550, 1740528000000, '2023-11-29', 96742453402, 2),
(83900, 1664314955447, 1740614400000, '2023-11-30', 69277430795, 2),
(84709, 1679555320077, 1740700800000, '2023-12-01', 305190442156, 2),
(84441, 1674754437110, 1740787200000, '2023-12-02', 80695237175, 2),
(86005, 1705564098300, 1740873600000, '2023-12-03', 30634474722, 2),
(94261, 1868321705444, 1740960000000, '2023-12-04', 61859112550, 2),
(86124, 1708198960874, 1741046400000, '2023-12-05', 68715362745, 2),
(87310, 1731441668069, 1741132800000, '2023-12-06', 65863356680, 2),
(90604, 1797706868227, 1741219200000, '2023-12-07', 51606642859, 2),
(90001, 1782785866811, 1741305600000, '2023-12-08', 47555759124, 2),
(86809, 1724855455204, 1741307783000, '2023-12-08', 42482795375, 2);

--@block

INSERT INTO daily_price (price, market_cap, created_at, date, volume, stock_id) VALUES
(1830.70, 224430000000, 1746220800000, '2025-05-04', 243860000, 2),
(1833.93, 225520000000, 1746134400000, '2025-05-03', 251340000, 2),
(1842.06, 225020000000, 1746048000000, '2025-05-02', 464790000, 2),
(1838.32, 219520000000, 1745961600000, '2025-05-01', 606440000, 2),
(1793.58, 220090000000, 1745875200000, '2025-04-30', 533700000, 2),
(1798.47, 220300000000, 1745788800000, '2025-04-29', 537560000, 2),
(1799.24, 219280000000, 1745702400000, '2025-04-28', 681190000, 2),
(1800.00, 222900000000, 1745616000000, '2025-04-27', 500000000, 2),
(1810.50, 218550000000, 1745529600000, '2025-04-26', 520000000, 2),
(1820.75, 216660000000, 1745443200000, '2025-04-25', 530000000, 2),
(1830.60, 219770000000, 1745356800000, '2025-04-24', 540000000, 2),
(1840.20, 215020000000, 1745270400000, '2025-04-23', 550000000, 2),
(1850.35, 193310000000, 1745184000000, '2025-04-22', 560000000, 2),
(1860.50, 194240000000, 1745097600000, '2025-04-21', 570000000, 2),
(1870.65, 197360000000, 1745011200000, '2025-04-20', 580000000, 2),
(1880.80, 194400000000, 1744924800000, '2025-04-19', 590000000, 2),
(1890.95, 193800000000, 1744838400000, '2025-04-18', 600000000, 2),
(1901.10, 193010000000, 1744752000000, '2025-04-17', 610000000, 2),
(1911.25, 194410000000, 1744665600000, '2025-04-16', 620000000, 2),
(1921.40, 198710000000, 1744579200000, '2025-04-15', 630000000, 2),
(1931.55, 195450000000, 1744492800000, '2025-04-14', 640000000, 2),
(1941.70, 201160000000, 1744406400000, '2025-04-13', 650000000, 2),
(1951.85, 191640000000, 1744320000000, '2025-04-12', 660000000, 2),
(1962.00, 186190000000, 1744233600000, '2025-04-11', 670000000, 2),
(1972.15, 204240000000, 1744147200000, '2025-04-10', 680000000, 2),
(1982.30, 180150000000, 1744060800000, '2025-04-09', 690000000, 2),
(1992.45, 189980000000, 1743974400000, '2025-04-08', 700000000, 2),
(2002.60, 193310000000, 1743888000000, '2025-04-07', 710000000, 2),
(2012.75, 220910000000, 1743801600000, '2025-04-06', 720000000, 2),
(2022.90, 222260000000, 1743715200000, '2025-04-05', 730000000, 2),
(2033.05, 222270000000, 1743628800000, '2025-04-04', 740000000, 2);

--@block


--@block 
INSERT INTO stock (color, name, ticker, icon_type)  
VALUES  
    ('#000000', 'Ethereum', 'ETH', 'SiEthereum');


--@block
DELETE FROM stock
WHERE id = 3;

--@block
INSERT INTO daily_price (price, market_cap, created_at, date, volume, stock_id) VALUES
(2.14, 224430000000, 1746220800000, '2025-05-05', 243860000, 3);


--@block
INSERT INTO price_forecast (price, date, created_at, stock_id)
VALUES 
(2.10, '2024-03-01 00:00:00+00', '2024-05-05 12:00:00+00', 3);




--@block 
SELECT * FROM stock

--@block 
DElETE FROM stock WHERE id = 1

--@block
SELECT price_forecast.price AS forecasted_price, daily_price.price, daily_price.date
FROM daily_price
JOIN stock ON stock.id = daily_price.stock_id
JOIN price_forecast ON price_forecast.stock_id = stock.id AND DATE(price_forecast.date) = DATE(daily_price.date)
WHERE stock.ticker = 'ETH'
ORDER BY daily_price.date ASC

--@block
DElETE FROM price_forecast
WHERE stock_id = 6

--@block
DElETE FROM daily_price
WHERE stock_id = 6

--@block
DELETE FROM stock
WHERE id = 6


--@block
SELECT * FROM stock;



----------------------------- For Prod DB

--@block 
INSERT INTO stock (id, color, name, ticker, icon_type)  
VALUES  
    (2, '#627EEA', 'Ethereum', 'ETH', 'SiEthereum'),
    (3, '#3C3C3D', 'XRP', 'XRP', 'SiXrp');


--@block 
SELECT * FROM stock  


--@block 
INSERT INTO daily_price (price, market_cap, created_at, date, volume, stock_id) VALUES
(1821.73, 222460000000, 1746624000000, '2025-05-07', 16330000000, 2),
(1816.17, 219770000000, 1746537600000, '2025-05-06', 10545000000, 2),
(1820.00, 218220000000, 1746451200000, '2025-05-05', 7479800000,  2),
(1808.16, 221490000000, 1746364800000, '2025-05-04', 6705000000,  2),
(1834.50, 222270000000, 1746278400000, '2025-05-03', 11686000000, 2),
(1841.43, 221970000000, 1746192000000, '2025-05-02', 14310000000, 2),
(1838.85, 216620000000, 1746105600000, '2025-05-01', 13644000000, 2),
(1794.05, 216590000000, 1746019200000, '2025-04-30', 13994000000, 2),
(1796.97, 217260000000, 1745932800000, '2025-04-29', 16777000000, 2),
(1799.50, 216530000000, 1745846400000, '2025-04-28', 9632000000,  2),
(1793.69, 219830000000, 1745760000000, '2025-04-27', 10293000000, 2),
(1821.27, 215950000000, 1745673600000, '2025-04-26', 15657000000, 2),
(1788.80, 213590000000, 1745587200000, '2025-04-25', 12923000000, 2),
(1769.39, 216570000000, 1745500800000, '2025-04-24', 22099000000, 2),
(1793.97, 212580000000, 1745414400000, '2025-04-23', 24272000000, 2),
(1759.71, 190380000000, 1745328000000, '2025-04-22', 15275000000, 2),
(1577.45, 191370000000, 1745241600000, '2025-04-21', 6696000000,  2),
(1585.46, 194950000000, 1745155200000, '2025-04-20', 5149000000,  2),
(1615.05, 191860000000, 1745068800000, '2025-04-19', 5254000000,  2),
(1589.15, 191140000000, 1744982400000, '2025-04-18', 9437000000,  2),

-- XRP prices, now using stock_id = 3
(2.1277, 124430000000, 1746624000000, '2025-05-07', 278780000, 3),
(2.1544, 125000000000, 1746537600000, '2025-05-06', 332100000, 3),
(2.1321, 124000000000, 1746451200000, '2025-05-05', 366030000, 3),
(2.1566, 126000000000, 1746364800000, '2025-05-04', 191180000, 3),
(2.1879, 127500000000, 1746278400000, '2025-05-03', 160580000, 3),
(2.2092, 128000000000, 1746192000000, '2025-05-02', 278800000, 3),
(2.2128, 129000000000, 1746105600000, '2025-05-01', 294230000, 3),
(2.1910, 128500000000, 1746019200000, '2025-04-30', 472410000, 3),
(2.2383, 130000000000, 1745932800000, '2025-04-29', 337430000, 3),
(2.2946, 131000000000, 1745846400000, '2025-04-28', 530090000, 3),
(2.2521, 130500000000, 1745760000000, '2025-04-27', 468690000, 3),
(2.1910, 129000000000, 1745673600000, '2025-04-26', 254110000, 3),
(2.1815, 128000000000, 1745587200000, '2025-04-25', 385530000, 3),
(2.2053, 129500000000, 1745500800000, '2025-04-24', 521160000, 3),
(2.2187, 130000000000, 1745414400000, '2025-04-23', 641970000, 3),
(2.2129, 129000000000, 1745328000000, '2025-04-22', 580850000, 3),
(2.0855, 121000000000, 1745241600000, '2025-04-21', 500000000, 3),
(2.1564, 124000000000, 1745155200000, '2025-04-20', 480000000, 3),
(2.1950, 125500000000, 1745068800000, '2025-04-19', 520000000, 3),
(2.1077, 120000000000, 1744982400000, '2025-04-18', 450000000, 3);


--@block
-- Forecasts for Ethereum (2) and XRP (3)
INSERT INTO price_forecast (price, date, created_at, stock_id)
VALUES 
(1807, '2025-05-06 00:00:00+00', '2025-05-05 12:00:00+00', 2),
(1795, '2025-05-07 00:00:00+00', '2025-05-06 12:00:00+00', 2),
(2.2277, '2025-05-06 00:00:00+00', '2025-05-05 12:00:00+00', 3),
(2.03, '2025-05-07 00:00:00+00', '2025-05-06 12:00:00+00', 3);


--@block
SELECT * 
FROM price_forecast 
WHERE price_forecast.date IN ('2025-03-28', '2025-03-24', '2025-05-05');

--@block
INSERT INTO price_forecast (price, date, stock_id) 
VALUES 
  (100000, '2025-03-24', 1),
  (100000, '2025-03-28', 1),
  (100000, '2025-05-05', 1);