INSERT INTO product (name, description, brand, price, category, release_date, available, stock_quantity) VALUES
('iPhone 15', 'Latest Apple smartphone', 'Apple', 79999.00, 'Electronics', '2023-09-15', TRUE, 10),
('Galaxy S23', 'Flagship Samsung phone', 'Samsung', 74999.00, 'Electronics', '2023-02-01', TRUE, 15),
('MacBook Air M2', 'Lightweight laptop', 'Apple', 119999.00, 'Computers', '2022-07-01', TRUE, 5),
('Sony WH-1000XM5', 'Noise cancelling headphones', 'Sony', 29999.00, 'Accessories', '2022-05-20', TRUE, 20);

select * from product;

DESC product;