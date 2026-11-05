// Page template: layers
window.Pages = window.Pages || {};
window.Pages.layers = `<main class="pg" id="layers">
  <div class="ey">Step 3 · BigQuery</div>
  <h1>Bronze, Silver and Gold layers</h1>
  <p class="lead">Each layer is a BigQuery dataset. Analysts only query Gold, which is built for speed.</p>
  <div class="grid">
    <div class="main">
      <div class="c">
        <h2>Datasets</h2>
        <div class="tw"><table>
          <tr><th>TABLE</th><th>LAYER</th><th>ROWS</th><th>UPDATED</th></tr>
          <tr><td>bronze.raw_orders</td><td class="a">Raw</td><td>3,902,115</td><td>01:04</td></tr>
          <tr><td>silver.clean_orders</td><td>Cleaned</td><td>3,902,097</td><td>01:19</td></tr>
          <tr><td>gold.mart_sales_daily</td><td style="color:#8A6A00">Business</td><td>1,402</td><td>01:26</td></tr>
        </table></div>
      </div>
      <div class="c">
        <h2>Query optimization</h2>
        <table>
          <tr><th>SETTING</th><th>VALUE</th></tr>
          <tr><td>Partitioned by</td><td>order_date</td></tr>
          <tr><td>Clustered by</td><td>region</td></tr>
        </table>
      </div>
      <div class="c"><h2>Schema: gold.mart_sales_daily</h2><div class="tw"><table><tr><th>COLUMN</th><th>TYPE</th><th>NOTE</th></tr><tr><td>order_date</td><td>DATE</td><td>Partition key</td></tr><tr><td>region</td><td>STRING</td><td>Cluster key</td></tr><tr><td>total_orders</td><td>INT64</td><td>Orders per day</td></tr><tr><td>total_revenue</td><td>NUMERIC</td><td>Sum of total_amount</td></tr></table></div></div>
      <div class="c"><h2>Preview</h2><div class="tw"><table><tr><th>ORDER_DATE</th><th>REGION</th><th>TOTAL_ORDERS</th><th>TOTAL_REVENUE</th></tr><tr><td>2026-10-01</td><td>Jakarta</td><td>128</td><td>14,250,000</td></tr><tr><td>2026-10-01</td><td>Bandung</td><td>74</td><td>8,120,000</td></tr><tr><td>2026-10-02</td><td>Jakarta</td><td>141</td><td>15,980,000</td></tr></table></div></div>
    </div>
    <div class="side">
      <div class="dk"><div class="hd"><b>build_gold.sql</b><span>BigQuery</span></div>
<pre>CREATE TABLE gold.mart_sales_daily
PARTITION BY order_date
CLUSTER BY region AS
SELECT order_date, region,
  COUNT(*) AS total_orders,
  SUM(total_amount) AS total_revenue
FROM silver.clean_orders
GROUP BY order_date, region;</pre></div>
      <div class="c"><h2>Why it is faster</h2>
        <div class="li"><b>Partitions</b>Queries scan only the dates they need.</div>
        <div class="li"><b>Pre-aggregated</b>Gold holds summaries, not raw rows.</div>
      </div>
      <div class="c"><h2>Lineage</h2><div class="nodes"><span class="node">bronze</span><span class="arr">→</span><span class="node">silver</span><span class="arr">→</span><span class="node">gold</span></div><p class="cap">Gold is rebuilt from Silver after every passing run.</p></div>
    </div>
  </div>
  <p class="fn">Sample values shown for the mockup.</p>
</main>`;
