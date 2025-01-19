---
title: "Inscrire une Passkey avec son mobile dans Entra"
meta_title: ""
description: ""
date: 2024-12-16T10:30:00-05:00
image: "/images/image-placeholder.png"
categories: ["Entra"]
author: "Maxime Hiez"
tags: ["Microsoft", "Microsoft 365", "Passkey", "Mot de passe", "Authenticator", "FIDO2", "MFA", "Sécurité"]
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
- Un compte avec le rôle *Administrateur Global* ou *Administrateur Sécurité* pour accéder au Microsoft Entra Admin Center.

**<u>Autres</u>**
- Les utilisateurs doivent avoir activé la méthode Microsoft Authenticator (MFA).
- Mise à jour vers la dernière application Microsoft Authenticator (version 6.8.7 ou ultérieure).
- Nécessite au moins Android 14 ou iOS 17 et plus.
- Le mobile et l'ordinateur de bureau doivent être connectés à Internet et avoir le Bluetooth activé (authentification multi-appareils).

---

##### Étape 1 : Se connecter à My Sign-Ins
Connectez vous à My Sign-Ins en ouvrant votre navigateur web sur https://mysignins.microsoft.com/security-info.

---

##### Étape 2 : Inscrire une Passkey
Cliquez sur *<u>Add sign-in method</u>* puis sur *<u>Passkey in Microsoft Authenticator</u>*.

![image](/images/entra/entra_passkey-003.png)

Ouvrez l'application *<u>Authenticator</u>* sur le cellulaire et cliquez sur *<u>Créer une clé d'accès</u>*.

![image](/images/entra/entra_passkey-004.png)

Suivez toutes les étapes présentées à l'écran.

![image](/images/entra/entra_passkey-005.png)

Une fois les étapes complétées, la Passkey est créée.

![image](/images/entra/entra_passkey-006.png)

---

##### Conclusion
Vous savez maintenant comment enregistrer une Passkey pour la gestion de connexion sans mot de passe.

---

##### Sources
[Microsoft Learn - Inscrire une Passkey sur mobile](https://learn.microsoft.com/fr-ca/entra/identity/authentication/how-to-register-passkey-mobile?tabs=iOS)

---


Avez-vous apprécié cet article ? Vous avez des questions, commentaires ou suggestions, n’hésitez pas à laisser un commentaire dans la section ci-dessous ou en m'envoyant un message depuis le formulaire de contact.

N'oubliez pas de nous suivre et de partager cet article.