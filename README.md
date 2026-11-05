# Pipeforge · GCP Data Engineering Pipeline

Open `index.html` in a browser. No install or server needed.

```
index.html
assets/
  css/   base, layout, components, responsive
  js/    router.js, app.js
  js/pages/   ingest, transform, layers, quality, orchestrate
pipeline/
  ingestion/       ingest.py          (Apache Beam)
  transformation/  transform.py       (Dataflow)
  sql/             build_gold.sql     (BigQuery)
  quality/         checks.py          (Python)
  orchestration/   dag.py             (Cloud Composer)
  terraform/       main.tf, variables.tf
```

The web pages are a visual mockup. The `pipeline/` files are reference code
and are not needed to open the pages.
