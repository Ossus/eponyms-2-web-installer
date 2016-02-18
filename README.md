Eponyms 2 Server Installation
=============================

Provisions a box that can run the complete Eponyms 2 stack.
It installs:

- Couchbase Server (port `8091`) [🔹][couchbase-server]
- Couchbase Sync Gateway (port `4999`) [🔹][sync-gateway]
- _NOT YET:_ Eponyms 2 Python web app

By default, the provisioned machine is available on [192.168.10.22](http://192.168.10.22) from the host machine.
Couchbase server wil be running on default port [`8091`](http://192.168.10.22:8091).
The Sync gateway will be running on default port `4984`, externally available via Nginx on port [`4999`](http://192.168.10.22:4999).

### -> STILL NEEDS to setup supervisor to run the sync gateway


Configuration
-------------

Most important configuration variables, like admin username+password, live in `couchbase-server.yml`.


Installation
------------

1. Install [Vagrant][] (download) and [Ansible][] (as `pip install ansible`)
2. Install vagrant cachier plugin:
        
        $ vagrant plugin install vagrant-cachier

3. It's not currently possible to download sync gateway (1.2) without user
    interaction. Hence, download the _DEB_, as specified in `couchbase-sync-gateway.yml`, to the root directory. It will be copied to the VM.
4. Run:

        $ vagrant up
    
    If this fails at later steps (rebalancing or setting up buckets), you may be able to proceed with manual configuration.

5. You can now configure Couchbase by going through the setup wizard on [192.168.10.22:8091](http://192.168.10.22:8091)
6. The sync gateway is available on [192.168.10.22:4999](http://192.168.10.22:4999)


### Vagrant Basics

- `vagrant up`: Build, run and provision the VM
- `vagrant provision`: Update VM (re-run the ansible playbook)
- `vagrant ssh`: SSH into the VM
- `vagrant halt`: Shut down gracefully
- `vagrant destroy`: Destroy entire VM


[sync-gateway]: http://developer.couchbase.com/mobile/develop/guides/sync-gateway/
[couchbase-server]: http://www.couchbase.com/nosql-databases/couchbase-server
[vagrant]: https://www.vagrantup.com/downloads.html
[ansible]: http://docs.ansible.com
