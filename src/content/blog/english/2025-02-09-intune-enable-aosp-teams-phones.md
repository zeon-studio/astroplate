---
title: "How to migrate your Android Teams devices to AOSP"
meta_title: ""
description: ""
date: 2025-02-09T10:00:00-05:00
image: "/images/blog/intune/tuto/intune_enable_aosp_teams_phones_thumbnail.png"
categories: ["Intune", "Tutorial"]
author: "Maxime Hiez"
tags: ["Teams Phones", "Teams Rooms", "MTRoA", "Teams Panels", "AOSP", "Android"]
draft: false
---
---

##### Introduction
I told you last November about the approach to migrating to *AOSP* (*Android Open Source Project*) for Android-based Microsoft Teams devices, such as phones, conference rooms and panels. I promised you a tutorial, so here it is.

Check the November 2024 article [HERE](https://maxime.hiez.ca/en/blog/2024-11-23-intune-aosp-teams-phones).

---

##### Prerequisites
**<u>Teams devices</u>**
- At least one Teams certified Android device.

**<u>Administrator role</u>**
- An account with the *Global Administrator* or *Intune Administrator* role to access the Microsoft Intune Admin Center.

---

##### Step 1 : Sign in to the Microsoft Intune Admin Center
Sign in to the Microsoft Intune Admin Center by opening your web browser to https://intune.microsoft.com.

---

##### Step 2 : Create an AOSP enrollment profile
In the left menu, click *<u>Devices</u>*, then *<u>Enrollment</u>* and *<u>Corporate-owned, user-associated devices</u>*.

Create a profile by only activating the *For Microsoft Teams devices (preview)* option and keeping the default token.

![image](/images/blog/intune/tuto/intune_enable_aosp_teams_phones_001.png)

---

##### Step 3 : Create a restriction policy
In the left menu, click *<u>Devices</u>*, then *<u>Configuration</u>*.

Create a device restriction policy by only enabling the *Block screen capture* option.

![image](/images/blog/intune/tuto/intune_enable_aosp_teams_phones_002.png)

<u>Note :</u> Only this option is available at the moment, but perhaps others will arrive later.

---

##### Step 4 : Create a Compliance Policy
In the left menu, click *<u>Devices</u>*, then *<u>Compliance</u>*.

Create a compliance policy by only enabling the *Rooted devices* and *Require encryption of data storage on device* options. Optionally, you could set *Minimum OS version*.

![image](/images/blog/intune/tuto/intune_enable_aosp_teams_phones_003.png)

<u>Note :</u> Only these options are available at the moment, but perhaps others will arrive later.

---

##### Step 5 : Create the conditional access policies
I won't cover these configurations in this article, but you should set up conditional access policies to only allow connections from compliant devices.

---

##### Conclusion
You now know how to prepare to migrate Android-based Microsoft Teams devices to AOSP.

---

##### Sources
[Microsoft Learn - AOSP migration guide](https://learn.microsoft.com/en-us/microsoftteams/rooms/android-migration-guide)

---


Did you enjoy this post ? If you have any questions, comments or suggestions, please leave a comment in the section below or by sending me a message from the contact form.

Don't forget to follow us and share this post.