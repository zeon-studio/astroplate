---
title: "Activer le password writeback dans Entra ID"
meta_title: ""
description: ""
date: 2025-03-03T10:00:00-05:00
image: "/images/blog/entra/tuto/entra_enable_password_writeback_thumbnail.png"
categories: ["Entra ID", "Tutoriel"]
author: "Maxime Hiez"
tags: ["Mot de passe", "Writeback", "Entra Connect", "GPO"]
draft: false
---
---

##### Introduction
Dans une organisation configurée en hybride avec le cloud de Microsoft, les comptes utilisateurs sont créés dans l'annuaire *Active Directory* local et sont synchronisés avec *Microsoft Entra ID*. Pour que les utilisateurs puissent modifier leur mot de passe dans les applications cloud, il doit être synchronisé avec son compte local afin qu'ils puissent utiliser un mot de passe unique.

---

##### Prérequis
**<u>Active Directory</u>**
- Un serveur *Active Directory* configuré et des comptes créés.

**<u>Entra Connect</u>**
- Une instance *Entra Connect* connectée avec Entra ID.

**<u>Rôle d’administrateur</u>**
- Un compte avec le rôle *Administrateur Global* ou *Administrateur d’identité hybride* pour accéder au Microsoft Entra Admin Center.
- Un compte avec le rôle *Administrateur d'enterprise* pour accéder au serveur Active Directory.

---

##### Étape 1 : Activer Password Writeback dans les options Microsoft Entra Connect
Démarrez l'application *<u>Microsoft Entra Connect Sync</u>* depuis le serveur Entra Connect local.

Sur l'écran d'accueil de l'assistant d'installation, cliquez sur *<u>Configure</u>*.

![image](/images/blog/entra/tuto/entra_enable_password_writeback_001.png)

Cliquez sur *<u>Customize synchronization options</u>*, puis sur *<u>Next</u>*.

![image](/images/blog/entra/tuto/entra_enable_password_writeback_002.png)

Entrez votre compte administrateur Microsoft 365, puis cliquez sur *<u>Next</u>*.

![image](/images/blog/entra/tuto/entra_enable_password_writeback_003.png)

Cochez la case *<u>Password writeback</u>*, puis cliquez sur *<u>Next</u>*.

![image](/images/blog/entra/tuto/entra_enable_password_writeback_004.png)

Au dernier menu, cliquez sur *<u>Exit</u>*.

![image](/images/blog/entra/tuto/entra_enable_password_writeback_005.png)

La fonctionnalité est maintenant activée sur le serveur Entra Connect local.

---

##### Étape 2 : Se connecter au Microsoft Entra Admin Center
Connectez vous au Microsoft Entra Admin Center en ouvrant votre navigateur web sur https://entra.microsoft.com.

---

##### Étape 3 : Activer Password Writeback dans Microsoft Entra ID
Dans le menu de gauche, cliquez sur *<u>Identity</u>*, puis sur *<u>Protection</u>*, et sur *<u>Password reset</u>*.

Cliquez sur *<u>On-premises integration</u>* et et activez toutes les options.

![image](/images/blog/entra/tuto/entra_enable_password_writeback_006.png)

La fonctionnalité est maintenant activée sur Entra ID.

---

##### Étape 4 : Définir une politique d'âge minimum du mot de passe
Démarrez la console de gestion des GPO (gpmc.msc) depuis le serveur Active Directory local.

Cliquez sur *<u>Computer Configuration</u>*, puis sur *<u>Policies</u>*, sur *<u>Windows Settings</u>*, sur *<u>Security Settings</u>*, sur *<u>Account Policy</u>*, et sur *<u>Password Policy</u>*.

Éditez la stratégie *Minimum password age* et définissez-la sur *0 jour*.

![image](/images/blog/entra/tuto/entra_enable_password_writeback_007.png)

Les stratégies de mot de passe dans l'environnement AD DS peuvent empêcher les réinitialisations de mot de passe. L'âge minimum du mot de passe doit être défini sur *0* pour que la réécriture des mots de passe soit fonctionnelle.

---

##### Conclusion
Vous savez maintenant comment activer le password writeback dans Entra ID.

---

##### Sources
[Microsoft Learn - Identité hybride](https://learn.microsoft.com/fr-ca/entra/identity/hybrid/prerequisites)

[Microsoft Learn - Entra Connect](https://learn.microsoft.com/fr-ca/entra/identity/hybrid/connect/whatis-azure-ad-connect)

[Microsoft Learn - Password reset writeback](https://learn.microsoft.com/fr-ca/entra/identity/authentication/tutorial-enable-sspr-writeback)

---


Avez-vous apprécié cet article ? Vous avez des questions, commentaires ou suggestions, n’hésitez pas à laisser un commentaire dans la section ci-dessous ou en m'envoyant un message depuis le formulaire de contact.

N'oubliez pas de nous suivre et de partager cet article.