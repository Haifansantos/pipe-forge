"""Clean Bronze data and write it to the Silver layer."""
from datetime import datetime
import apache_beam as beam
from apache_beam.io.gcp.bigquery import ReadFromBigQuery, WriteToBigQuery


def cast_types(row):
    row["order_date"] = datetime.strptime(row["order_date"], "%Y-%m-%d").date().isoformat()
    row["total_amount"] = float(row["total_amount"])
    return row


def is_valid(row):
    return bool(row["order_id"]) and row["total_amount"] >= 0


def build(p):
    return (p
            | "Read" >> ReadFromBigQuery(table="my-gcp-project:bronze.raw_orders")
            | "Cast" >> beam.Map(cast_types)
            | "Validate" >> beam.Filter(is_valid)
            | "Dedupe" >> beam.Distinct()
            | "Write" >> WriteToBigQuery("my-gcp-project:silver.clean_orders"))
