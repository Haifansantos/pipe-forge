"""Read raw CSV files from Cloud Storage and load them into the Bronze layer."""
import apache_beam as beam
from apache_beam.options.pipeline_options import PipelineOptions

SOURCE = "gs://raw-business-data/orders/*.csv"
TARGET = "my-gcp-project:bronze.raw_orders"
SCHEMA = "order_id:STRING,customer_id:STRING,order_date:STRING,status:STRING,total_amount:STRING"


def parse_row(line):
    order_id, customer_id, order_date, status, total = line.split(",")
    return {"order_id": order_id, "customer_id": customer_id,
            "order_date": order_date, "status": status, "total_amount": total}


def run():
    opts = PipelineOptions(runner="DataflowRunner", region="asia-southeast2")
    with beam.Pipeline(options=opts) as p:
        (p
         | "Read" >> beam.io.ReadFromText(SOURCE, skip_header_lines=1)
         | "Parse" >> beam.Map(parse_row)
         | "Write" >> beam.io.WriteToBigQuery(
             TARGET, schema=SCHEMA,
             write_disposition=beam.io.BigQueryDisposition.WRITE_APPEND))


if __name__ == "__main__":
    run()
