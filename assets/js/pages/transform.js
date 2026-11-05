// Page template: transform
window.Pages = window.Pages || {};
window.Pages.transform = `<main class="pg" id="transform">
  <div class="ey">Step 2 · Cloud Dataflow</div>
  <h1>Clean and transform</h1>
  <p class="lead">A Dataflow job reads Bronze, fixes the data and writes Silver. Set the input and output, then run the job.</p>
  <div class="grid">
    <div class="main">
      <div class="c">
        <h2>Job parameters</h2>
        <div class="two">
          <div><label for="in">Input table</label><input id="in" value="bronze.raw_orders"></div>
          <div><label for="out">Output table</label><input id="out" value="silver.clean_orders"></div>
        </div>
        <button class="btn">Run Dataflow job</button>
      </div>
      <div class="c">
        <h2>Job steps</h2>
        <div class="tw"><table>
          <tr><th>STEP</th><th>ROWS IN</th><th>ROWS OUT</th><th>STATUS</th></tr>
          <tr><td>Read bronze</td><td>3,902,115</td><td>3,902,115</td><td class="g">● Done</td></tr>
          <tr><td>Remove duplicates</td><td>3,902,115</td><td>3,902,097</td><td class="g">● Done</td></tr>
          <tr><td>Cast types</td><td>3,902,097</td><td>3,902,097</td><td class="g">● Done</td></tr>
          <tr><td>Write silver</td><td>3,902,097</td><td>3,902,097</td><td class="g">● Done</td></tr>
        </table></div>
      </div>
      <div class="c"><h2>Job graph</h2><div class="nodes"><span class="node">Read bronze</span><span class="arr">→</span><span class="node">Remove duplicates</span><span class="arr">→</span><span class="node">Cast types</span><span class="arr">→</span><span class="node">Write silver</span></div><p class="cap">Every step finished without errors.</p></div>
      <div class="c"><h2>Job log</h2><pre class="log">01:07:12  Job transform-orders started
01:09:48  Removed 18 duplicate order_id values
01:11:25  Wrote 3,902,097 rows to silver.clean_orders
01:11:25  Job finished with state: Succeeded</pre></div>
    </div>
    <div class="side">
      <div class="dk"><div class="hd"><b>transform.py</b><span>Apache Beam</span></div>
<pre>(p
 | 'Read' &gt;&gt; ReadFromBigQuery(table='bronze.raw_orders')
 | 'Dedupe' &gt;&gt; beam.Distinct()
 | 'Cast' &gt;&gt; beam.Map(cast_types)
 | 'Write' &gt;&gt; WriteToBigQuery('silver.clean_orders'))</pre></div>
      <div class="c"><h2>Why Dataflow</h2>
        <div class="li"><b>Scales out</b>Workers are added automatically for large tables.</div>
      </div>
      <div class="c"><h2>Job details</h2><div class="tw"><table><tr><th>SETTING</th><th>VALUE</th></tr><tr><td>Job name</td><td>transform-orders</td></tr><tr><td>Type</td><td>Batch</td></tr><tr><td>Region</td><td>asia-southeast2</td></tr><tr><td>Status</td><td><span class="g">● Succeeded</span></td></tr><tr><td>Duration</td><td>4 min 13 s</td></tr></table></div></div>
    </div>
  </div>
  <p class="fn">Sample values shown for the mockup.</p>
</main>`;
