---
layout: post
author: gamelinchpin
title: Installing Jenkins as Continuous Integration builder on Windows
date: 2012-04-14 12:37:03
categories: web development

status: publish
type: post
published: true
---
While most of my work is Mac/Unix based some of my business work is
built on VB.NET/ASP.NET inside a Windows development. While striving for
more robust, predictable code I chose to implement
a Continuous Integration (CI) system. I had already used CI in large
scale game production environments with great success following the TDD
model.

Setting up a Continuous Integration server was the 1st task and I chose
[Jenkins](http://jenkins-ci.org/) for the task in hand. This had to be setup on a Windows system so that it could invoke Visual Studio 2010 in order to build the required projects parts that were a mix of VB applications and ASP.NET web services. We also had a requirement to use Perforce as the SCM of choice.



 I'm assuming you already have a working build of your product on a host
machine with your VS2010 build already cleanly building via a solution
file.

Here's how I did
it:

### Install Java Runtime Edition (JRE)

Jenkins requires Java so you're going to have to ensure you have that
installed before you can go much further. Oracle maintain the JRE so go
there now and pop back when you've got it installed.
 <http://www.oracle.com/technetwork/java/javase/downloads/index.html>

### Download and install Jenkins

Once again, there's a nice handy page over at Jenkins HQ that includes
all the info you need on how to get Jenkins installed. Don't forget to
come back for more settings.

<https://wiki.jenkins-ci.org/display/JENKINS/Meet+Jenkins#MeetJenkins-Installation>

### Jenkins Setup

Within our organisation we typically keep all of our development files
in a common directory regardless of host machine that maps straight into
the Perforce Depot at a consistent point. This ensures we can get
developers up & running very quickly. In our case, it's:

    C:\dev

Firstly, we'll relocate Jenkins into that directory so we can maintain
it inside our Perforce Depot. So locate your downloaded & unpacked
'jenkins.war' and move it
to:

    C:\dev\Build\jenkins\jenkins.war

To test our setup, we're going to start a static server via the command
prompt so we can see all the various messages it produces. This will
help us spot errors and get to know how Jenkins works. Inside your
Command Prompt
issue:

    java -jar C:\dev\Build\jenkins\jenkins.war

If this all looks good, then check the Jenkins web service is running by
visiting the default web browser location <http://localhost:8080/>. Remember this is a *localhost* setting so it'll only work if Jenkins is running properly. We'll be running [Jenkins as a Windows
Service](https://wiki.jenkins-ci.org/display/JENKINS/Installing+Jenkins+as+a+Windows+service) once we're happy everything is running OK and we can trust it to work cleanly in the background and startup when the system starts.

### Install MSBuild plugin for Jenkins

#### Here's a link to the plugin you're looking to setup
locally: <https://wiki.jenkins-ci.org/display/JENKINS/MSBuild+Plugin> . You'll notice there's no download link on there as plugins are installed through the local Jenkins browser interface. {style="color: #333333; font-style: normal;"}

![](assets/Screen-Shot-2012-04-13-at-18.19.41-300x215.png "Jenkins Plugin Manager Available")

Inside the Jenkins browser you'll be installing the *MSBuild* plugin via
*Jenkins>Manage Plugins>Available* then you'll find the *MSBuild* in
the '*Build Tools*' section.

**NOTE**: This page should be populated with available plugins, however
if you've just installed Jenkins and got to this point quickly then it's
likely that the list will be empty. If so then try 2 things. (a) wait
for the repository to download but we warned there's no indicators for
this (b) restart Jenkins service to populate the list.

#### Configure location of MSBuild.exe

Go to your local *Jenkins Configuration* via
<http://localhost:8080/configure>
 Navigate down that page to *MSBuild* section
 click '*Add MSBuild*'

-   **Name**: .NET 4.0
-   **Path** : C:\\Windows\\Microsoft.NET\\Framework\\v4.0.30319
-   **Default Params**: *empty*

![](assets/Jenkins-W7.png "Jenkins Config MSBuild Command")

You should now have the prerequisites to be able to make a build Job via
Jenkins.

Build Job
---------

### Add a new Build Job

-- **New Job** http://localhost:8080/view/All/newJob
 -- **Job Name**: *ProjectName*
 -- **Type**: Build a free-style software project
 -- **OK**

![](assets/Jenkins-W7.jpg "Jenkins New Job")
 Setup your Job to execute a **MSBuild** script:
 Navigate down through *Build -> Add Build Step -> Build a Visual
Studio project*
 -- **MsBuild Version**: .NET 4.0
 -- **MsBuild Build File**:
C:\\dev\\Projects\\*ProjectName*\\*Project.vbproj*

![](assets/Jenkins-W7-2.png "Jenkins New Job Build MSBuild")

That's it for the basic build. You should now be able to get Jenkins to
run your build job and have it build locally without errors. If it's not
working right, sort it out now before adding in SCM.

Continuous Integration via Perforce
-----------------------------------

Now you've got a working build (if not then read up and come back) it's
time to connect your local build to the Perforce depot so we can get
your build system automatically syncing & building your project when
anything changes in Perforce.

### Install Perforce plugin

Install *Perforce* plugin for Jenkins in a similar way to how we
installed the *MSBuild* plugin via *Jenkins -> Manage Plugins ->
Available*

### Configure Perforce

We're now going to configure the default Perforce command for the whole
of Jenkins.

Go to <http://localhost:8080/configure> and navigate down to *Perforce* section of the configuration click '*Add Perforce*'
 -- **Name**: p4
 -- **Path**: C:\\Program Files\\Perforce\\p4.exe

The system wide default Perforce command is now installed and ready for
connection to a Job.

### Add Perforce to Job

Next we're going to join the command into the job so they execute when
appropriate.

Go to the job configuration page for the Job you're setting up
and locate '*Source Code Management*' and select '*Perforce*'
 --- **P4PORT**: *your perforce server IP*:1666
 --- **username**: *your perforce username*
 --- **workspace**: jenkins

Ensure the perforce workspace/view mappings are accurate inside the
Job -> Perforce settings. A good way is to copy the view from a working
p4 workspace inside the p4v application itself and replace the original
workspace name with 'jenkins'

### Check Perforce Works

<div>

 It's now time to see if you're done everything right. Starting a Build
for the Job inside Jenkins should work smoothly now. But we're not done
yet, we've still got to setup the triggers to complete the CI process.

</div>

### Poll SCM

So now you've got a working installation of Jenkins, you've got your
build working cleanly and it now *Integrates* your project from Perforce
when you initiate a build. It's all good but it's not very
*Continuous.* To make this work we're going to get Jenkins to poll
Perforce every 1 minute for changes and then automatically start the Job
we already setup.
 Find the setup portion inside Job -> Configure -> Build Triggers
 -- [x] **Poll SCM** (checked)
 -- **Schedule** :

    # every minute
    * * * * *

Done
----

Well, that's it. You've now built yourself a *Continuous Integration*
server to watch over you and make sure your builds are consistently
building and you've not forgotten to add something to the repository,
submit a complete working build or a myriad of other reasons.

You may want to install some desktop notifications for clients, setup
some NUnit tests and really start building on the good foundations
you've setup.
