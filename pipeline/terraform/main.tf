provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_storage_bucket" "raw_data" {
  name     = "${var.project_id}-raw-business-data"
  location = var.region
}

resource "google_bigquery_dataset" "layers" {
  for_each   = toset(["bronze", "silver", "gold"])
  dataset_id = each.key
  location   = var.region
}

resource "google_composer_environment" "main" {
  name   = "pipeline-env"
  region = var.region
}
