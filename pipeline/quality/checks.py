"""Data quality checks that run after Silver and before Gold."""
import pandas as pd


def check_not_null(df: pd.DataFrame, cols) -> bool:
    return not df[cols].isna().any().any()


def check_unique(df: pd.DataFrame, col: str) -> bool:
    return df[col].duplicated().sum() == 0


def check_row_count(bronze_rows: int, silver_rows: int, tolerance: float = 0.001) -> bool:
    return abs(bronze_rows - silver_rows) / bronze_rows <= tolerance


def run_all(silver_orders: pd.DataFrame, bronze_rows: int) -> dict:
    return {
        "key_columns_not_null": check_not_null(silver_orders, ["order_id", "customer_id"]),
        "unique_order_id": check_unique(silver_orders, "order_id"),
        "row_counts_match": check_row_count(bronze_rows, len(silver_orders)),
    }
