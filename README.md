# rating-sample

An event-driven study project to rate restaurant's orders

# Setup ingress

1. Edit your local `/etc/host` to add a host entry pointing to 127.0.0.1 - e.g. `127.0.0.1 restaurant.test`
2. Apply provider specific steps according with this guide: https://kubernetes.github.io/ingress-nginx/deploy/#provider-specific-steps
   `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.47.0/deploy/static/provider/cloud/deploy.yaml`
3. You should be able to access the application by using the alias created on `/etc/host` - e.g. https://restaurant.test/api/orders
