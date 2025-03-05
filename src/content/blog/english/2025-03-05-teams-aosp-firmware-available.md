---
title: "How to update your Android Teams devices to AOSP"
meta_title: ""
description: ""
date: 2025-03-05T10:00:00-05:00
image: "/images/blog/teams/tuto/teams_aosp_firmware_available_thumbnail.png"
categories: ["Teams", "Tutorial"]
author: "Maxime Hiez"
tags: ["Téléphones Teams", "Teams Rooms", "MTRoA", "Panneaux Teams", "AOSP", "Android"]
draft: false
---
---

##### Introduction
I posted an article last February on how to prepare the migration of your Android-based Microsoft Teams devices to *AOSP* (*Android Open Source Project*). The firmware has just been released for Poly devices, so here is how to update.

Check the February 2025 article [HERE](https://maxime.hiez.ca/blog/2025-02-09-intune-enable-aosp-teams-phones).

---

##### Prerequisites
**<u>Teams devices</u>**
- At least one Teams certified Android device.

**<u>Administrator role</u>**
- An account with the *Global Administrator* or *Intune Administrator* role to access the Microsoft Intune Admin Center.
- An account with the *Global Administrator* or *Teams Administrator* role to access the Microsoft Teams Admin Center.

**<u>AOSP enabled</u>**
- Have done your AOSP configurations in Intune

---

##### Step 1 : Sign in to the Microsoft Teams admin center
Sign in to the Microsoft Teams Admin Center by opening your web browser to https://admin.teams.microsoft.com.

---

##### Step 2 : Update the phone
In the left menu, click *<u>Teams devices</u>*, then *<u>Phones</u>*.

Select the device(s) you want to update and click *<u>Update</u>*.

A new firmware is available and tagged *AOSP*. Select it and click *<u>Update</u>*.

![image](/images/blog/teams/tuto/teams_aosp_firmware_available_001.png)

This step will take a few minutes. The phone will reboot, unenroll from Intune, and re-enroll.

---

##### Step 3 : Validation of the correct installation
We can see in the phone that the *Company Portal* has disappeared and has been replaced by *Authenticator* and *Microsoft Intune* in the phone apps.

![image](/images/blog/teams/tuto/teams_aosp_firmware_available_002.png)

---

##### Step 4 : Sign in to the Microsoft Intune Admin Center
Sign in to the Microsoft Intune Admin Center by opening your web browser to https://intune.microsoft.com.

---

##### Step 5 : Validate the correct re-enrollment in Intune
In the left menu, click *<u>Devices</u>*, then *<u>All devices</u>*. The updated phone must have an *Android AOSP* OS.

![image](/images/blog/teams/tuto/teams_aosp_firmware_available_003.png)

<u>Note:</u> If you go there very quickly after the update, you will see your phone twice since its *Device Administrator* entry will still be there, but it is automatically deleted after a few minutes.
<br/><br/>

In the left menu, click *<u>Devices</u>*, then *<u>Enrollment</u>* and *<u>Corporate-owned, user-associated devices</u>*. The number of devices must match your update.

![image](/images/blog/teams/tuto/teams_aosp_firmware_available_004.png)

---

##### Conclusion
You now know how to update your Android-based Microsoft Teams devices to AOSP.

---

##### Sources
[Microsoft Learn - Guide de migration AOSP](https://learn.microsoft.com/en-us/microsoftteams/rooms/android-migration-guide)

---


Did you enjoy this post ? If you have any questions, comments or suggestions, please leave a comment in the section below or by sending me a message from the contact form.

Don't forget to follow us and share this post.