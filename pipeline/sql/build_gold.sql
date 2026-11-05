CREATE TABLE gold.mart_sales_daily
PARTITION BY order_date
CLUSTER BY region AS
SELECT order_date, region,
  COUNT(*) AS total_orders,
  SUM(total_amount) AS total_revenue
FROM silver.clean_orders
GROUP BY order_date, region;
