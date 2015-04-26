Eponyms 2 Server Installation
=============================

Provisions a box that can run the complete Eponyms 2 stack.
It installs:

- Couchbase Server (port `8091`) [🔹][couchbase-server]
- Couchbase Sync Gateway (port `4999`) [🔹][sync-gateway]
- _NOT YET:_ Eponyms 2 Python web app

By default, the provisioned machine is available on [192.168.88.22](http://192.168.88.22) from the host machine.
Couchbase server wil be running on default port [`8091`](http://192.168.88.22:8091).
The Sync gateway will be running on default port `4984`, externally available via Nginx on port [`4999`](http://192.168.88.22:4999).

### -> STILL NEEDS to setup supervisor to run the sync gateway


Installation
------------

1. Install [Vagrant][] and [Ansible][]
2. Install vagrant cachier plugin (doesn't seem to work correctly though):
        
        $ vagrant plugin install vagrant-cachier

3. Run:

        $ vagrant up

4. You can now configure Couchbase by going through the setup wizard on [192.168.88.22:8091](http://192.168.88.22:8091)


### Vagrant Basics

- `vagrant up`: Build and run the VM
- `vagrant provision`: Update VM
- `vagrant ssh`: SSH into the VM
- `vagrant halt`: Shut down gracefully
- `vagrant destroy`: Destroy entire VM


[sync-gateway]: http://developer.couchbase.com/mobile/develop/guides/sync-gateway/
[couchbase-server]: http://www.couchbase.com/nosql-databases/couchbase-server
[vagrant]: http://www.vagrantup.com/downloads
[ansible]: http://docs.ansible.com
