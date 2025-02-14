---
title: "New Teams optimizations for VDI in Citrix"
meta_title: ""
description: ""
date: 2025-02-11T10:00:00-05:00
image: "/images/blog/teams/teams_optimization_vdi_citrix_ga_thumbnail.png"
categories: ["Teams"]
author: "Maxime Hiez"
tags: ["Citrix", "VDI"]
draft: false
---
---

##### Introduction
Microsoft recently announced a major breakthrough in optimizing Microsoft Teams for virtual desktop environments (VDI) in Citrix. This new architecture, based on the *SlimCore* multimedia engine, is now 100% available and marks an important step for both companies. Here's an overview of what's new and what it means for users and administrators.

---

##### Key components of the new optimization
The new optimization is based on four main components that work together to provide an improved user experience:
- Virtual channel : The solution uses three custom virtual channels, which are crucial to allow in Citrix Studio. This configuration is unique but essential for proper operation.
- Plugin : This small DLL file (220 KB) is installed in the same folder as Citrix Workspace App (CWA) and is responsible for establishing the client-side virtual channel and downloading the new media engine, SlimCore. The plugin can be deployed in several ways, including through the CWA installer, Global App Config Service, Plugin Download Manager (great for personal devices), and even through Intune/SCCM.
- New version of Teams : Make sure you are using the latest version of Teams (24295.605.3225.8804) and client version (24110115722). This is crucial not only for the functionality to work properly, but also for future updates to the SlimCore media engine.
- SlimCore : The heart of the solution, SlimCore, is essentially the same multimedia engine used by the native Teams client for Windows, extracted as an MSIX package (~50 MB) and kept up to date by the plugin, without user or administrator intervention.

![image](/images/blog/teams/teams_optimization_vdi_citrix_ga_001.png)

---

##### Benefits of the new optimization
- Improved Performance : The new architecture delivers increased performance, with reduced resource consumption on the endpoint, faster call setup times, higher resolutions and new codecs.
- Automatic updates : Thanks to an architecture decoupled from the VDI environment, SlimCore updates are automatic and aligned with Teams versions, without requiring updates to the VDI infrastructure.
- Increased reliability : The solution is designed to be stable and reliable, with components that are backward compatible and compatible with future versions of Teams and SlimCore.

---

##### How to deploy the new optimization
- **Configure virtual channels in Citrix Studio**
<br/>
Go to Citrix Studio and add the three custom virtual channels to the list of allowed channels.
<br/><br/>

- **Deploy the plugin**
<br/>
Use one of the available deployment methods to install the plugin on endpoints. This can be done via the CWA installer, Global App Config Service, Plugin Download Manager or Intune/SCCM.
<br/><br/>

- **Update Teams**
<br/>
Make sure the Teams version you are using is the most recent (24295.605.3225.8804) and the client version is up to date (24110115722).
<br/><br/>

- **Check the installation of SlimCore**
<br/>
The plugin will automatically download and install SlimCore, ensuring that the correct version is used based on Teams' needs.

---

##### Conclusion
The new optimization of Microsoft Teams for VDI environments in Citrix represents a significant advancement in performance, reliability and manageability. By following the deployment steps, administrators can ensure an improved user experience and prepare their infrastructures for future innovations.

---

##### Sources
[Microsoft - Techcommunity](https://techcommunity.microsoft.com/blog/microsoftteamsblog/new-teams-optimization-for-vdi-now-generally-available-in-citrix-environment/4357078)

[Microsoft Learn - VDI for Teams](https://learn.microsoft.com/en-us/microsoftteams/vdi-2)

[Citrix - SlimCore optimization](https://docs.citrix.com/en-us/citrix-virtual-apps-desktops/multimedia/opt-ms-teams-new/ms-slimcore-optimization.html)

---


Did you enjoy this post ? If you have any questions, comments or suggestions, please leave a comment in the section below or by sending me a message from the contact form.

Don't forget to follow us and share this post.