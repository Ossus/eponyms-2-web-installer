Eponyms 2 Server Installation
=============================

Provisions a box that can run the complete Eponyms 2 stack.
It installs:

- Couchbase Server [🔹][couchbase-server]
- Couchbase Sync Gateway [🔹][sync-gateway]
- _NOT YET:_ Eponyms 2 Python web app


Installation
------------

1. Install [Vagrant][] and [Ansible][]
2. Install vagrant plugins:
        
        $ vagrant plugin install vagrant-cachier

3. Run:

        $ vagrant up

By default, the provisioned machine is now available on [192.168.88.22]() from the host machine.


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
