---
title: "How to activate Microsoft 365 Passkey in Entra ID"
meta_title: ""
description: ""
date: 2024-12-16T10:00:00-05:00
image: "/images/blog/entra/tuto/entra_activate_passkey_thumbnail.png"
categories: ["Entra ID", "Tutorial"]
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

**<u>Administrator role</u>**
- An account with the *Global Administrator* or *Security Administrator* role to access the Microsoft Entra Admin Center.

**<u>Others</u>**
- Users must have Microsoft Authenticator (MFA) enabled.
- Updated to the latest Microsoft Authenticator app (version 6.8.7 or later).
- Requires at least Android 14 or iOS 17 and above.
- Mobile and desktop must be connected to the Internet and have Bluetooth enabled (multi-device authentication).

---

##### Step 1 : Sign in to the Microsoft Entra Admin Center
Sign in to the Microsoft Entra Admin Center by opening your web browser to https://entra.microsoft.com.

---

##### Step 2 : Activate Microsoft 365 Passkey
In the left menu, click *<u>Protection</u>*, then *<u>Authentication methods</u>*.

Click *<u>Passkey (FIDO2)</u>* to activate the service and the users concerned.

![image](/images/blog/entra/tuto/entra_passkey_001.png)

Click *<u>Configure</u>* and enable all options.

![image](/images/blog/entra/tuto/entra_passkey_002.png)

You can also enable the service via the following Graph PowerShell script:
```powershell
Connect-MgGraph -Scopes "Policy.ReadWrite.AuthenticationMethod"
$params = @{
    "@odata.type"  = "#microsoft.graph.fido2AuthenticationMethodConfiguration"
    id             = "Fido2"
    State          = "enabled"
    includeTargets = @(
        @{
            id         = "all_users"
            targetType = "group"
        }
    )
    excludeTargets                   = @(
    )
    isSelfServiceRegistrationAllowed = $true
    isAttestationEnforced            = $true
    keyRestrictions                  = @{
        isEnforced      = $true
        enforcementType = "Allow"
        aaGuids         = @(
            "90a3ccdf-635c-4729-a248-9b709135078f",
            "de1e552d-db1d-4423-a619-566b625cdc84"
        )
    }
}
Update-MgPolicyAuthenticationMethodPolicyAuthenticationMethodConfiguration -AuthenticationMethodConfigurationId "Fido2" -BodyParameter $params
```

---

##### Conclusion
You now know how to enable Microsoft 365 Passkey for passwordless login management.

---

##### Sources
[Microsoft Learn - Activate Microsoft 365 Passkey](https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-enable-passkey-fido2)

---


Did you enjoy this post ? If you have any questions, comments or suggestions, please leave a comment in the section below or by sending me a message from the contact form.

Don't forget to follow us and share this post.