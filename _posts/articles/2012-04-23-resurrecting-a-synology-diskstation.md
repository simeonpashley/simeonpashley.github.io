---


title: Resurrecting a Synology DiskStation
date: 2012-04-23 21:08:29



type: post

---
I walked into a minefield of problems when attempting to connect back to
my Synology DS210j after a regular firmware update. The approved desktop
application **DSAssistant** was used to upload and apply the firmware
but something just went wrong. DSAssistant claimed the IP address was
set, but the device wouldn’t accept web connections. I eventually found
a solution that helped me get the device back up & running.

### Background

I retried to apply the firmware but during installing DSAssistant
claimed to be unable to update the status and simply gave up. It advised
me to check error logs via telnet but the default password is **
(despite setting this in the setup). A password won’t be accepted by
telnet so that just wouldn’t work.

I tried different firmware versions, re-downloaded old ones to remove
the possibility of it being a corrupt firmware download.

Nothing worked.

In hindsight, I can only assume the system software on the drives had
become corrupt or badly configured and as the system was setup in RAID1
(mirror) it meant both drives had identical corruption.

### My Setup {#mysetup}

To give some context I have the following
setup:

-   [Synology DS210j](http://amzn.to/IlOjvH) - should work on various
    models
-   2x [2Tb WD Green Caviar](http://amzn.to/HWPzmz)
-   temporary SATA drive, tiny capacity is fine.
-   [Synology Assistant](http://www.synology.com/support/download.php)
    (a.k.a *DSAssistant*) software

In my case, there’s no data on the system as I’d previously moved it off
so everything could be reformatted.

### Solution

After reading around the ’net, there wasn’t one solution but this one
worked for me.
 I’ll list the process as-is but be aware that the firmware software
changes so things may move around a little.

***BEWARE*** this process destroys all your data

-   Physically remove the existing SATA drives and put them to one side
-   Install a single different old sacrificial SATA drive to force
    reinstall. I assume that this mustn’t have been already used without
    being reformatted to remove existing data. This **must be**
    installed in the upper slot as this has priority over the lower slot
    and the system will boot from it’s contents.
-   DSAssistant now installs the firmware properly
-   Connect over the web interface for the device
-   Leave the system to create a volume on the old SATA drive as we’re
    going to need a working boot drive. It will contain the seed we’ll
    use to resurrect the drives.
-   It’s worth ensuring that your admin password isn’t blank or you
    won’t be able to get in via SSH/Telnet incase of emergencies. Enable
    SSH & Telnet services to ensure we can connect incase of
    emergencies. Enable the required services under *Control Panel* ->
    *Terminal*
-   When the default volume is setup, power off the system.
-   Leaving the old drive in the upper slow, install the 1st of your
    desired drives in the lower slot. This will enable the system to
    boot and connect to the new drive
-   Remove any existing Disk Groups & Volumes. This will include
    removing the one that was setup a few clicks ago.
-   Create a new Disk Group and set to RAID1 to mirror the data from the
    older drive to the newer drive
-   Create a new volume with the previously generated Disk Group
-   Wait for the volume to build
-   Shutdown
-   Remove the old drive and move the newer drive up from the lower slot
    to the upper Slot 0 so it becomes the boot drive. Pop the 2nd drive
    in the lower slot. Power On.
-   The system will beep when beeping indicating a RAID failure, which
    is expected as we’ve just intentionally removed 50% of it. When you
    arrive in the web interface you will see the volume has been
    degraded. You’ll see the Storage Manager and you can press the ‘Beep
    Off’ button to shut it up while you work. :)
-   To establish a RAID with the newly added drive go to Disk Group >
    Manage > Repair and let it do it’s thing. Be aware that this can
    take a very long time.
-   It’s likely that the volume size isn’t what you’d like and you can
    now setup your system as you desire.

### Summary

Hopefully this guide will help you resurrect a Synology disk station and
get your system back up & running
