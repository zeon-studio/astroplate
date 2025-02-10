---
title: "Comment se connecter avec une Passkey à Microsoft 365"
meta_title: ""
description: ""
date: 2024-12-17T10:00:00-05:00
image: "/images/blog/entra/tuto/entra_connect_passkey_thumbnail.png"
categories: ["Entra ID"]
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

**<u>Autres</u>**
- Les utilisateurs doivent avoir activé la méthode Microsoft Authenticator (MFA).
- Mise à jour vers la dernière application Microsoft Authenticator (version 6.8.7 ou ultérieure).
- Nécessite au moins Android 14 ou iOS 17 et plus.
- Le mobile et l'ordinateur de bureau doivent être connectés à Internet et avoir le Bluetooth activé (authentification multi-appareils).

---


##### Étape 1 : Se connecter à My Sign-Ins
Connectez vous à *My Sign-Ins* en ouvrant votre navigateur web sur https://mysignins.microsoft.com/security-info.

---

##### Étape 2 : Inscrire une Passkey
Cliquez sur *<u>Add sign-in method</u>*, puis sur *<u>Passkey in Microsoft Authenticator</u>*.

![image](/images/blog/entra/tuto/entra_passkey_003.png)

Ouvrez l'application *<u>Authenticator</u>* sur le cellulaire et cliquez sur *<u>Créer une clé d'accès</u>*.

![image](/images/blog/entra/tuto/entra_passkey_004.png)

Suivez toutes les étapes présentées à l'écran.

![image](/images/blog/entra/tuto/entra_passkey_005.png)

Une fois les étapes complétées, la Passkey est créée.

![image](/images/blog/entra/tuto/entra_passkey_006.png)

---

##### Étape 3 : Se connecter avec une Passkey
Connectez vous à votre compte Microsoft 365 en ouvrant votre navigateur web sur https://www.office.com et entrez votre adresse courriel. Choisissez de vous connecter avec votre appareil iPhone / iPad ou Android.

![image](/images/blog/entra/tuto/entra_passkey_007.png)

---

##### Étape 4 : Approuver la connexion
Scannez le QR code avec l'appareil photo de votre appareil pour valider la connexion.

![image](/images/blog/entra/tuto/entra_passkey_008.png)

---

##### Conclusion
Vous savez maintenant comment vous connecter à votre compte Microsoft 365 avec une Passkey remplaçant votre mot de passe.

---

##### Sources
[Microsoft Learn - Inscrire une Passkey sur mobile](https://learn.microsoft.com/fr-ca/entra/identity/authentication/how-to-register-passkey-mobile?tabs=iOS)

[Microsoft Learn - Se connecter avec une Passkey](https://learn.microsoft.com/fr-ca/entra/identity/authentication/how-to-sign-in-passkey)

---


Avez-vous apprécié cet article ? Vous avez des questions, commentaires ou suggestions, n’hésitez pas à laisser un commentaire dans la section ci-dessous ou en m'envoyant un message depuis le formulaire de contact.

N'oubliez pas de nous suivre et de partager cet article.