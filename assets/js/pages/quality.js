// Page template: quality
window.Pages = window.Pages || {};
window.Pages.quality = `<main class="pg" id="quality">
  <div class="ey">Step 4 · Data validation</div>
  <h1>Check the data before Gold</h1>
  <p class="lead">Checks run after Silver. If a check fails, Gold is not built and the team is alerted.</p>
  <div class="grid">
    <div class="main">
      <div class="c">
        <h2>Latest run</h2>
        <div class="tw"><table>
          <tr><th>CHECK</th><th>TABLE</th><th>RESULT</th></tr>
          <tr><td>Key columns not null</td><td>clean_orders</td><td class="g">● Pass</td></tr>
          <tr><td>Unique order_id</td><td>clean_orders</td><td class="g">● Pass</td></tr>
          <tr class="wa"><td>Parent customer exists</td><td>clean_orders</td><td class="a">▲ 143 rows</td></tr>
          <tr class="fa"><td>Row counts match</td><td>bronze → silver</td><td class="r">■ Mismatch</td></tr>
        </table></div>
        <button class="btn">Re-run checks</button>
      </div>
      <div class="c"><h2>Rules</h2><div class="two"><div><label for="nl">Max null share</label><input id="nl" value="0.1%"></div><div><label for="av">Allowed status values</label><input id="av" value="new, paid, shipped, done, cancelled"></div></div><button class="btn s">Save rules</button></div>
      <div class="c"><h2>Last 14 runs</h2><div class="sqs"><span class="sq "></span><span class="sq "></span><span class="sq "></span><span class="sq "></span><span class="sq w"></span><span class="sq "></span><span class="sq "></span><span class="sq "></span><span class="sq "></span><span class="sq f"></span><span class="sq "></span><span class="sq "></span><span class="sq "></span><span class="sq "></span></div><p class="cap">Green passed, amber had warnings, red failed.</p></div>
    </div>
    <div class="side">
      <div class="dk"><div class="hd"><b>checks.py</b><span>Python</span></div>
<pre>def check_unique(df, col):
    dupes = df[col].duplicated().sum()
    return dupes == 0

assert check_unique(silver_orders, 'order_id')</pre></div>
      <div class="c"><h2>Gate</h2>
        <div class="li"><b>Fail</b>Gold build is skipped.</div>
        <div class="li"><b>Pass</b>Gold is refreshed.</div>
      </div>
      <div class="c"><h2>Alerts</h2><div class="li"><b>Email</b>team@example.com is notified when a check fails.</div><div class="li"><b>Log</b>Every run is saved with its results.</div></div>
    </div>
  </div>
  <p class="fn">Sample values shown for the mockup.</p>
</main>`;
