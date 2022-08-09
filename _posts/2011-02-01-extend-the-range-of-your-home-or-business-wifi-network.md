---
title: Extend the Range of your Home or Business Wifi Network
date: 2011-02-01 11:32:45

description:

slider_style: sample.css
slide_redirect_url: http://ringalpha.com/blog/extend-the-range-of-your-home-or-business-wifi-network/
---

I am sometimes asked how to extend the range of your home or business
Wifi network using cheap hardware and the ADSL Router your ISP gave you
for free and I wanted to share with you my tips.

<div style="float: left;">

</div>

<div style="float: left;">

</div>

<div style="clear:both">

</div>

<div class="note">

**UPDATE:** This also works with the [D-Link DAP-1160 Wireless G Open Source Access
Point/Router](http://www.amazon.co.uk/gp/product/B000VS08QC/ref=as_li_ss_tl?ie=UTF8&tag=gamedevelcons-21&linkCode=as2&camp=1634&creative=19450&creativeASIN=B000VS08QC), although the control panel interface is different the principles still
apply.

</div>

Extending your home or business Wifi network can be a great solution to
connect a remote set of devices like printers, home consoles, desktop
computers to a Wifi enabled router that sits in another room.

I have used this solution to extend physical networks into remote
offices and also connecting home computers and even XBox 360 to a
broader network.

The key to all of this is the amazing [D-Link
DWL-2100AP](http://www.amazon.co.uk/gp/product/B00019EYVG?ie=UTF8&tag=gamedevelcons-21&linkCode=as2&camp=1634&creative=19450&creativeASIN=B00019EYVG), which you can pickup for about £55 and it's a much cheaper and tidier alternative to running cables around and also using the ethernet over power devices.

The [D-Link
DWL-2100AP](http://www.amazon.co.uk/gp/product/B00019EYVG?ie=UTF8&tag=gamedevelcons-21&linkCode=as2&camp=1634&creative=19450&creativeASIN=B00019EYVG) is a great little device and I'll take you through how I connected a remote home office at the bottom of a garden to the BT Homehub back in the house.

To extend the range of a BT Homehub you need a few
things:

- D-Link 2100AP with firmware 2.2eu, the one it usually comes out of a
  box with.
- BT Homehub v1 - the white one. **NOTE**: This does not work with the
  black v2 Homehubs as BT disabled the WDS feature that you need
- Your network needs to all be running on the same sub-net, the
  simplest way to do this is to simply change your netmask on
  everthing to 255.255.0.0.

The trick is in configuring the software correctly \*AND\* not upgrading
the firmware beyond the build-in v2.2eu as the newer versions tend to
cause more incompatibilities and they don't add or fix any problems
you'll have with this configuration. **Stick with firmware v2.2eu.**

### 1. D-Link 2100AP

- Setup your D-Link and connect via the web management interface,
  usually found at <http://192.168.0.50>
- Navigate your way through the menus to **Home->Wireless**
- Select **Mode: AP Repeater**
- Under **Site Survey, hit Scan** to find all the devices on your home
  network.
- You should now see your regular home network listed, **select your
  network** and you will see the information be copied above into the
  'Root AP MAC Address' and 'SSID'
- **Make sure your Authentication details are identical to your
  Homehub**, if they're not then it simply won't work.
- Select '**Apply**' and then you're done here

![](/assets/img/Dl-WifiRepeater.jpg "Dl-WifiRepeater")

### 2. Homehub

- \*\* at <http://192.168.1.254>
- Go through the menus: **Advanced -> Configuration -> Wireless ->
  Repeater**
- **Scan for wireless access points** to discover all of the
  Accessible Access Points
- **Tick the box next to your network** in the Accessible Access
  Points list
- Hit **Apply** and thats that.

![](/assets/img/BT-WifiRepeater.jpg "BT-WifiRepeater")

That's it, once your devices have rebooted themselves your 2 networks
should be able to see each other. I've done this a few times now and
it's worked like a charm every time.

This has failed for me if I've tried to change settings or upgrade
firmware (v2.3, v2.4, v2.5) and all have caused me much grief. Stick
with firmware v2.2 and it's a breeze.

### Hardware You'll Need

- [D-Link DWL-2100AP - 108Mbps Super G 802.11G Wireless Access
  Point](http://www.amazon.co.uk/gp/product/B00019EYVG?ie=UTF8&tag=gamedevelcons-21&linkCode=as2&camp=1634&creative=19450&creativeASIN=B00019EYVG)
- **OPTIONAL - Netgear GS108 8-port Gigabit Hub**
  The 2100AP sadly only has 1 network port so you'll need a little
  network hub if you want to connect more than 1 device to the
  endpoint.
  I've had great success with the small but fast 8-port hub.
- **Alternative to 2100AP**: [D-Link DAP-1160 Wireless G Open Source
  Access
  Point/Router](http://www.amazon.co.uk/gp/product/B000VS08QC/ref=as_li_ss_tl?ie=UTF8&tag=gamedevelcons-21&linkCode=as2&camp=1634&creative=19450&creativeASIN=B000VS08QC)
