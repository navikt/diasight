gcloud healthcare fhir-stores import gcs external-promo \
  --dataset=diasight \
  --location=europe-west3 \
  --gcs-uri=gs://diasight-data/patients.ndjson \
  --content-structure=resource
