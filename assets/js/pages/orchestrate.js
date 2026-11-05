// Page template: orchestrate
window.Pages = window.Pages || {};
window.Pages.orchestrate = `<main class="pg" id="orchestrate">
  <div class="ey">Step 5 · Cloud Composer and Terraform</div>
  <h1>Automate and provision</h1>
  <p class="lead">Composer runs every step in order on a schedule. Terraform creates the cloud resources from code.</p>
  <div class="grid">
    <div class="main">
      <div class="c">
        <h2>DAG: business_data_pipeline</h2>
        <div class="two">
          <div><label for="cron">Schedule</label><input id="cron" value="0 1 * * *"></div>
          <div><label for="mail">Alert email</label><input id="mail" value="team@example.com"></div>
        </div>
        <button class="btn">Trigger DAG now</button>
      </div>
      <div class="c">
        <h2>Tasks</h2>
        <div class="tw"><table>
          <tr><th>TASK</th><th>AFTER</th><th>STATUS</th></tr>
          <tr><td>ingest</td><td>-</td><td class="g">● Success</td></tr>
          <tr><td>transform</td><td>ingest</td><td class="g">● Success</td></tr>
          <tr><td>quality_checks</td><td>transform</td><td class="g">● Success</td></tr>
          <tr><td>build_gold</td><td>quality_checks</td><td class="g">● Success</td></tr>
        </table></div>
      </div>
      <div class="c"><h2>Pipeline graph</h2><div class="nodes"><span class="node">ingest</span><span class="arr">→</span><span class="node">transform</span><span class="arr">→</span><span class="node">quality_checks</span><span class="arr">→</span><span class="node">build_gold</span></div></div>
      <div class="c"><h2>Recent runs</h2><div class="tw"><table><tr><th>RUN</th><th>DURATION</th><th>STATUS</th></tr><tr><td>2026-11-04 01:00</td><td>11 min 02 s</td><td><span class="g">● Success</span></td></tr><tr><td>2026-11-03 01:00</td><td>10 min 48 s</td><td><span class="g">● Success</span></td></tr><tr><td>2026-11-02 01:00</td><td>11 min 20 s</td><td><span class="g">● Success</span></td></tr></table></div></div>
    </div>
    <div class="side">
      <div class="dk"><div class="hd"><b>main.tf</b><span>Terraform</span></div>
<pre>resource "google_bigquery_dataset" "gold" {
  dataset_id = "gold"
  location   = "asia-southeast2"
}

resource "google_composer_environment" "main" {
  name = "pipeline-env"
}</pre></div>
      <div class="c"><h2>Infrastructure</h2>
        <div class="li"><b>Repeatable</b>One command rebuilds the whole setup.</div>
      </div>
      <div class="c"><h2>Provisioned resources</h2><div class="tw"><table><tr><th>RESOURCE</th><th>STATE</th></tr><tr><td>storage_bucket.raw_data</td><td><span class="g">● Created</span></td></tr><tr><td>bigquery_dataset.bronze</td><td><span class="g">● Created</span></td></tr><tr><td>bigquery_dataset.silver</td><td><span class="g">● Created</span></td></tr><tr><td>bigquery_dataset.gold</td><td><span class="g">● Created</span></td></tr><tr><td>composer_environment.main</td><td><span class="g">● Created</span></td></tr></table></div></div>
    </div>
  </div>
  <p class="fn">Sample values shown for the mockup.</p>
</main>`;
