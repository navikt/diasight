# Stuff about deploy
The application is deployed to the labs cluster at nais for external access.

### Redis
Used as session-storage for `diasight-api`.

```
kubectl config use-context labs-gcp
kubectl -nhelseopplysninger apply -f .nais/redis.yaml
```

### Secrets
Github Secret Manager doesn't work for `labs-gcp`. Need to use Kubernetes secrets.

https://doc.nais.io/security/secrets/kubernetes-secrets/

```shell
# Switch to the right cluster
kubectl config use-context labs-gcp

# Delete and push a new secret
kubectl -nhelseopplysninger delete secret diasight
kubectl -nhelseopplysninger create secret generic diasight --from-env-file=.nais/secrets.env

# View secret
kubectl -nhelseopplysninger describe secrets/diasight


kubectl -nhelseopplysninger delete secret diasight-service-account
kubectl -nhelseopplysninger create secret generic diasight-service-account --from-file=.nais/service-account.json
# View secret
kubectl -nhelseopplysninger describe secrets/diasight-service-account


```


### Exec into the pod

```shell
kubectl -nhelseopplysninger get pods
kubectl -nhelseopplysninger exec -it diasight-api-bd4fb66bc-5dt2w  -- sh
```
