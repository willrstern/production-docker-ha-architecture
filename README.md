# Running a Production High Availability Service on CoreOS using Docker, Fleet, Flannel, Etcd, Confd & Nginx

- View the diagram of what's going on: https://drive.google.com/file/d/0B74l6vUHf9HrMzNrYUlyMm40RWs/view?usp=sharing

## Tools used:
- coreos: server machine clustering via a shared cloud-config.yml
- etcd: key value store for service registration and discovery
- fleet: scheduling/failover of docker containers across coreos cluster
- flannel: Gives each docker container a unique ip that allows you to access the internal port (i.e. port 80 not 32679)
- confd: watch etcd for nodes arriving/leaving - template nginx configuration files / reload nginx on change
