---
title: "How to sign in with Passkey to Microsoft 365"
meta_title: ""
description: ""
date: 2024-12-17T10:00:00-05:00
image: "/images/blog/entra/tuto/entra_connect_passkey_thumbnail.png"
categories: ["Entra"]
author: "Maxime Hiez"
tags: ["Passkey", "Password", "Authenticator", "FIDO2", "MFA", "Security"]
draft: false
---
---

##### Definition
Microsoft 365 Passkey is an authentication method that replaces passwords with more secure options like facial recognition, fingerprint, or a PIN.

---

##### Prerequisites
**<u>Licenses required</u>**
- *Microsoft 365* (all editions supporting modern authentication).

**<u>Others</u>**
- Users must have Microsoft Authenticator (MFA) enabled.
- Updated to the latest Microsoft Authenticator app (version 6.8.7 or later).
- Requires at least Android 14 or iOS 17 and above.
- Mobile and desktop must be connected to the Internet and have Bluetooth enabled (multi-device authentication).

---


##### Step 1 : Sign in to My Sign-Ins
Sign in to *My Sign-Ins* by opening your web browser to https://mysignins.microsoft.com/security-info.

---

##### Step 2 : Register a Passkey
Click on *<u>Add sign-in method</u>* then *<u>Passkey in Microsoft Authenticator</u>*.

![image](/images/blog/entra/tuto/entra_passkey_003.png)

Open the *<u>Authenticator</u>* application on your cell phone and click on *<u>Create Access Key</u>*.

![image](/images/blog/entra/tuto/entra_passkey_004.png)

Follow all the steps displayed on the screen.

![image](/images/blog/entra/tuto/entra_passkey_005.png)

Once the steps are completed, the Passkey is created.

![image](/images/blog/entra/tuto/entra_passkey_006.png)

---

##### Step 3 : Sign in with a Passkey
Log in to your Microsoft 365 account by opening your web browser to https://www.office.com and enter your email address. Choose to connect with your iPhone/iPad or Android device.

![image](/images/blog/entra/tuto/entra_passkey_007.png)

---

##### Step 4 : Approve the connection
Scan the QR code with your device's camera to validate the connection.

![image](/images/blog/entra/tuto/entra_passkey_008.png)

---

##### Conclusion
You now know how to log in to your Microsoft 365 account with a Passkey replacing your password.

---

##### Sources
[Microsoft Learn - Register a Passkey on mobile](https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-register-passkey-mobile?tabs=iOS)

[Microsoft Learn - Sign in with a Passkey](https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-sign-in-passkey)

---


Did you enjoy this post ? If you have any questions, comments or suggestions, please leave a comment in the section below or by sending me a message from the contact form.

Don't forget to follow us and share this post.