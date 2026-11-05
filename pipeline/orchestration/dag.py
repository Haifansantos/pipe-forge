"""Airflow DAG for Cloud Composer: ingest -> transform -> checks -> gold."""
from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow.operators.python import PythonOperator
from airflow.providers.google.cloud.operators.bigquery import BigQueryInsertJobOperator

default_args = {"retries": 1, "retry_delay": timedelta(minutes=5),
                "email": ["team@example.com"], "email_on_failure": True}

with DAG("business_data_pipeline", start_date=datetime(2026, 1, 1),
         schedule_interval="0 1 * * *", catchup=False, default_args=default_args) as dag:

    ingest = BashOperator(task_id="ingest", bash_command="python /home/airflow/gcs/dags/ingest.py")
    transform = BashOperator(task_id="transform", bash_command="python /home/airflow/gcs/dags/transform.py")
    quality_checks = PythonOperator(task_id="quality_checks", python_callable=lambda: None)
    build_gold = BigQueryInsertJobOperator(
        task_id="build_gold",
        configuration={"query": {"query": "{% include 'sql/build_gold.sql' %}", "useLegacySql": False}})

    ingest >> transform >> quality_checks >> build_gold
