---


title: SSH auto-login with shared key fails
date: 2012-05-07 11:40:37



type: post

---
I recently had trouble when my SSH auto-login via shared key failed and
it took a while to figure out what was wrong. I've made some notes for
posterity. It turned out to be SSH not being happy with the
directory/file ownership and permission on both the target and client.

Finding the problem
-------------------

When running Centos it's important to ensure that SSHD logging is on so
you can discover what's wrong and also track login attempts.

Enable logging for sshd by editing the config file

    $ nano /etc/ssh/sshd_config

Locate the following and make the
changes:

    # Logging
     # obsoletes QuietMode and FascistLogging
     SyslogFacility AUTH
     #SyslogFacility AUTHPRIV
     LogLevel INFO

Don't forget to restart the service to apply the changes

    $ /etc/init.d/sshd restart

**Check the logs**

With logging enabled you can now watch the end of the *messages* log
where you should find the error messages. I did this with 2 boxes open.
Box 1 was logged into the target and watching the logs while Box 2
attempt to login.

    $ tail -f -n 100 /var/log/messages

In my scenario this immediately presented the following
message:

     Authentication
refused: bad ownership or modes for directory /root

**Fixing The Problem**
----------------------

It turns out something had changed the owner and permissions on my
*/root* directory and SSH didn't like it. I have yet to find out how &
when this happened but I suspect a system wide update via 'yum update'
did it.

Here's the commands I ran on the
target:

    $ chown root:root /root

    $ chmod 755 /root

This immediately produced a new error on the client side when attempting
the SSH


    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @
WARNING: UNPROTECTED PRIVATE KEY FILE! @
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    Permissions 0755 for '/root/.ssh/id_rsa' are too open.
    It is recommended that your private key files are NOT accessible by others.
    This private key will be ignored.

This simple error was fixed on the client by
issuing:

    $ chmod 700 /root/.ssh/id_rsa

Fixing the above problems on the target and client enabled me to
auto-login on SSH using shared RSA keys.
Note: these fixes didn't require any changes to the keys as they were purely down to permissions and ownership.

 


