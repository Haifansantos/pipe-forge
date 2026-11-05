// Page template: ingest
window.Pages = window.Pages || {};
window.Pages.ingest = `<main class="pg" id="ingest">
  <div class="ey">Step 1 · Python and Apache Beam</div>
  <h1>Bring in the raw data</h1>
  <p class="lead">Choose where the raw business data comes from and where it lands. Files are read with Apache Beam and written untouched to the Bronze layer in BigQuery.</p>
  <div class="grid">
    <div class="main">
      <div class="c">
        <h2>New ingestion</h2>
        <div class="drop">Drop CSV or JSON files here, or <b>browse</b></div>
        <div class="two">
          <div><label for="src">Source type</label><select id="src"><option>CSV files in Cloud Storage</option><option>JSON files in Cloud Storage</option></select></div>
          <div><label for="sch">Schedule</label><select id="sch"><option>Daily at 01:00</option><option>Hourly</option></select></div>
        </div>
        <label for="path">Source path</label><input id="path" value="gs://raw-business-data/orders/*.csv">
        <label for="tgt">Target table</label><input id="tgt" value="bronze.raw_orders">
        <button class="btn">Run ingestion</button><button class="btn s">Save as pipeline task</button>
      </div>
      <div class="c">
        <h2>Recent loads</h2>
        <div class="tw"><table>
          <tr><th>FILE</th><th>ROWS</th><th>STATUS</th></tr>
          <tr><td>orders_2026_10_31.csv</td><td>18,204</td><td class="g">● Loaded</td></tr>
          <tr><td>orders_2026_11_01.csv</td><td>17,951</td><td class="g">● Loaded</td></tr>
        </table></div>
      </div>
    </div>
    <div class="side">
      <div class="dk"><div class="hd"><b>ingest.py</b><span>Apache Beam</span></div>
<pre>with beam.Pipeline(options=opts) as p:
    (p
     | beam.io.ReadFromText('gs://raw-business-data/orders/*.csv')
     | beam.Map(parse_row)
     | beam.io.WriteToBigQuery('bronze.raw_orders'))</pre></div>
      <div class="c"><h2>What happens next</h2>
        <div class="li"><b>Bronze</b>Rows are stored exactly as received.</div>
        <div class="li"><b>Transform</b>Dataflow cleans them into the Silver layer.</div>
      </div>
    </div>
  </div>
  <p class="fn">Sample values shown for the mockup.</p>
</main>`;
