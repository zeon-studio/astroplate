---
title: "Comment activer Microsoft 365 Passkey dans Entra"
meta_title: ""
description: ""
date: 2024-12-16T10:00:00-05:00
image: "/images/blog/entra/tuto/entra_activate_passkey_thumbnail.png"
categories: ["Entra ID", "Tutoriel"]
author: "Maxime Hiez"
tags: ["Passkey", "Mot de passe", "Authenticator", "FIDO2", "MFA", "Sécurité"]
draft: false
---
---

##### Définition
Microsoft 365 Passkey est une méthode d'authentification qui remplace les mots de passe par des options plus sécurisées comme la reconnaissance faciale, l'empreinte digitale ou un code PIN.

---

##### Prérequis
**<u>Licences nécessaires</u>**
- *Microsoft 365* (toutes les éditions supportant l'authentification moderne).

**<u>Rôle d’administrateur</u>**
- Un compte avec le rôle *Administrateur Global* ou *Administrateur de sécurité* pour accéder au Microsoft Entra Admin Center.

**<u>Autres</u>**
- Les utilisateurs doivent avoir activé la méthode Microsoft Authenticator (MFA).
- Mise à jour vers la dernière application Microsoft Authenticator (version 6.8.7 ou ultérieure).
- Nécessite au moins Android 14 ou iOS 17 et plus.
- Le mobile et l'ordinateur de bureau doivent être connectés à Internet et avoir le Bluetooth activé (authentification multi-appareils).

---

##### Étape 1 : Se connecter au Microsoft Entra Admin Center
Connectez vous au Microsoft Entra Admin Center en ouvrant votre navigateur web sur https://entra.microsoft.com.

---

##### Étape 2 : Activer Microsoft 365 Passkey
Dans le menu de gauche, cliquez sur *<u>Protection</u>*, puis sur *<u>Authentication methods</u>*.

Cliquez sur *<u>Passkey (FIDO2)</u>* pour activer le service et les usagers concernés.

![image](/images/blog/entra/tuto/entra_passkey_001.png)

Cliquez sur *<u>Configure</u>* et activez toutes les options.

![image](/images/blog/entra/tuto/entra_passkey_002.png)

Vous pouvez aussi activer le service via le script Graph PowerShell suivant :
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
Vous savez maintenant comment activer Microsoft 365 Passkey pour la gestion de connexion sans mot de passe.

---

##### Sources
[Microsoft Learn - Activer Microsoft 365 Passkey](https://learn.microsoft.com/fr-ca/entra/identity/authentication/how-to-enable-passkey-fido2)

---


Avez-vous apprécié cet article ? Vous avez des questions, commentaires ou suggestions, n’hésitez pas à laisser un commentaire dans la section ci-dessous ou en m'envoyant un message depuis le formulaire de contact.

N'oubliez pas de nous suivre et de partager cet article.