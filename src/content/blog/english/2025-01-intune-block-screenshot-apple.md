---
title: "Screenshot finally blocked for iOS and iPadOS with Intune"
meta_title: ""
description: ""
date: 2025-01-20T10:00:00-05:00
image: "/images/blog/intune/intune_block_screenshot_apple_thumbnail.png"
categories: ["Intune"]
author: "Maxime Hiez"
tags: ["MAM", "Apple", "iOS", "iPadOS", "iPhone", "iPad", "Screenshot"]
draft: false
---
---

##### Introduction
Microsoft Intune recently introduced (FINALLY !) a new feature that allows you to block screenshots in apps protected by Mobile App Management (MAM) for iOS and iPadOS. This update closes an important security gap for organizations using MAM without device enrollment, ensuring that users cannot capture or share sensitive information from managed accounts.

---

##### Key features
- Screenshot blocking : When users attempt to capture or share their screen from a managed account in a MAM-protected app, they will receive a white screen instead of the actual app content. This feature augments Intune's default security policy and can be customized through app protection settings.
- Updating apps : For screenshot blocking to take effect, the app must be updated to a version that supports Intune security features. Required versions are Intune App SDK v19.7.6 or later for Xcode 15 and v20.2.1 or later for Xcode 16.
- Configuring app protection policies : The app must be configured with an app protection policy in Intune that restricts sharing of company data with other apps. This configuration is essential to ensure that screenshotting is blocked by preventing sensitive information from being shared externally.
- Customizing settings : For some scenarios, it may be necessary to allow screenshot while retaining the existing app protection policy configuration. Microsoft introduced a managed application configuration key *com.microsoft.intune.mam.screencapturecontrol = Disabled* to override the default behavior.

---

##### Benefits for organizations
- Enhanced security : By blocking screen capture, organizations can better protect their sensitive data from potential leaks.
- Increased control : Administrators can customize application protection settings to meet the specific needs of their organization, providing greater control over data security.
- Compliance : This feature helps organizations comply with security and privacy regulations by preventing unauthorized disclosure of sensitive information.

---

##### Conclusion
Screenshot blocking for iOS and iPadOS with Microsoft Intune is a significant step forward in improving the security of managed mobile apps. By updating applications and configuring the appropriate protection policies, organizations can ensure robust protection of their sensitive data.
<br/><br/>
I will build a tutorial soon for this feature with Apple and Android devices.

---

##### Sources
[Microsoft - Techcommunity](https://techcommunity.microsoft.com/blog/IntuneCustomerSuccess/new-block-screen-capture-for-iosipados-mam-protected-apps/4366312)

---


Did you enjoy this post ? If you have any questions, comments or suggestions, please leave a comment in the section below or by sending me a message from the contact form.

Don't forget to follow us and share this post.