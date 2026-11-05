variable "project_id" {
  type        = string
  description = "Google Cloud project that hosts the pipeline"
}

variable "region" {
  type    = string
  default = "asia-southeast2"
}
