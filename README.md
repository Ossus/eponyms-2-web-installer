Eponyms 2 Server Installation
=============================

Provisions a box that can run the complete Eponyms 2 stack.
It installs:

- Couchbase Server [🔹][couchbase-server]
    + ports `8091` and `8092`
- Couchbase Sync Gateway [🔹][sync-gateway]
    + port `4984` open on localhost
    + admin port `4985` open on localhost
- Eponyms 2 Python web app [🔹][web-app]
    + port `8000` (via gunicorn) open on localhost
- nginx [🔹][nginx]
    + port [`4999`](http://192.168.10.22:4999) open to world, forwarded to `4984`
    + port [`80`](http://192.168.10.22) open to world, forwarded to `8000`

By default, the provisioned machine is available on [192.168.10.22](http://192.168.10.22) from the host machine.

The auto-bucket-creation is currently disabled since it's not quite clear to me why I can initialize a cluster with Ansible, but then am still prompted to create a bucket when accessing the web interface the first time.

Also, you must restart _sync_gateway_ after booting the machine since it seems to fail to wait for couchbase to be running.
SSH into your VM and issue: `sudo start sync_gateway`


Configuration
-------------

Most important configuration variables, like admin username+password, live in `couchbase-server.yml`.
The defaults provision a machine with 2GB of RAM, 1GB dedicated to the bucket.


Installation
------------

1. Install [Vagrant][] (download) and [Ansible][] (as `pip install ansible`)
2. Install vagrant cachier plugin:
        
        $ vagrant plugin install vagrant-cachier

3. Run:

        $ vagrant up
    
    If this fails at later steps (rebalancing or setting up buckets), you may be able to proceed with manual configuration.

4. You can now configure Couchbase by going through the setup wizard on [192.168.10.22:8091](http://192.168.10.22:8091)
5. The sync gateway is available on [192.168.10.22:4999](http://192.168.10.22:4999)
6. The [web app][web-app] is available on [192.168.10.22](http://192.168.10.22)


### Vagrant Basics

- `vagrant up`: Build, run and provision the VM
- `vagrant provision`: Update VM (re-run the ansible playbook)
- `vagrant ssh`: SSH into the VM
- `vagrant halt`: Shut down gracefully
- `vagrant destroy`: Destroy entire VM


Helpful Articles
----------------

- [Couchbase Server and Sync Gateway Explained](http://ti.eng.br/configuring-your-very-first-couchbase-mobile-sync-backend/)
- [Flask, gunicorn and nginx on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-serve-flask-applications-with-gunicorn-and-nginx-on-ubuntu-14-04)


[sync-gateway]: http://developer.couchbase.com/mobile/develop/guides/sync-gateway/
[couchbase-server]: http://www.couchbase.com/nosql-databases/couchbase-server
[web-app]: https://github.com/Ossus/eponyms-2-web
[nginx]: http://nginx.org
[vagrant]: https://www.vagrantup.com/downloads.html
[ansible]: http://docs.ansible.com
