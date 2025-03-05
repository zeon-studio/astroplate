---
title: "Mise à jour en version 13.3.0 du module PowerShell Azure"
meta_title: ""
description: ""
date: 2025-03-04T10:00:00-05:00
image: "/images/blog/azure/azure_update_module_powershell_13_3_0_thumbnail.png"
categories: ["Azure"]
author: "Maxime Hiez"
tags: ["Module", "Mise à jour", "PowerShell"]
draft: false
---
---

##### Introduction
Microsoft a récemment publié la nouvelle version 13.3.0 du module PowerShell pour Microsoft Azure.

---

##### Installation
Vous pouvez vérifier la version du module installé via la commande PowerShell suivante :
```powershell
Get-InstalledModule -Name "Az*"
```

Vous pouvez installer le module Az via la commande PowerShell suivante :
```powershell
Install-Module -Name Az
```

Vous pouvez mettre à jour le module Az via la commande PowerShell suivante :
```powershell
Update-Module Az -Force
```

---

##### Quoi de neuf ?
La version 13.3.0 contient les mises à jour suivantes :

**<u>Az.CosmosDB</u>**
- Ajout de la prise en charge de la définition de rôle de table Cosmos DB et des applets de commande liées à l'attribution de rôle.
<br/><br/>

**<u>Az.DataBoxEdge</u>**
- Suppression du package *Microsoft.Azure.Management.DataBoxEdge* version '1.0.0'.
<br/><br/>

**<u>Az.DataFactory</u>**
- Ajout d'une prise en charge supplémentaire pour les propriétés de connexion Oracle.
- Ajout d'une prise en charge supplémentaire pour les propriétés de connexion Teradata.
- Ajout d'une prise en charge supplémentaire pour les propriétés de connexion AzurePostgreSql.
<br/><br/>

**<u>Az.DataShare</u>**
- Suppression du package *Microsoft.Azure.Management.DataShare* version '1.0.1'.
<br/><br/>

**<u>Az.Maintenance</u>**
- Génération de SDK migrée d'autorest csharp vers autorest PowerShell.
<br/><br/>

**<u>Az.Migrate</u>**
- Mise à jour de *Data.Replication* vers une version d'API plus récente (version d'API stable 2024-09-01).
- Applets de commande *Data.Replication* renommées (de *Azure Stack HCI* à *Azure Local*).
<br/><br/>

**<u>Az.PolicyInsights</u>**
- Suppression du package *Microsoft.Azure.Management.PolicyInsights* version '1.0.0'.
<br/><br/>

**<u>Az.RecoveryServices</u>**
- Mise à jour de *Restore-AzRecoveryServicesBackupItem* pour prendre en charge 0 comme *TargetZoneNumber* pour restaurer vers *NoZone*.
- Mise à jour de *Restore-AzRecoveryServicesBackupItem* pour bloquer la restauration interzonale à partir du snapshot RP.
<br/><br/>

**<u>Az.ResourceGraph</u>**
- Version API mise à niveau vers 2024-04-01.
<br/><br/>

**<u>Az.Resources</u>**
- Ajout de *-ApplicationId* comme alias de *-ServicePrincipalName*.
- Prise en charge de l'obtention des attributions de rôles au niveau exact via *-AtScope* pour *Get-AzRoleAssignment*.
<br/><br/>

**<u>Az.ServiceBus</u>**
- Correction d'un bug lors de l'appel de *Set-AzServiceBusNamespace* avec le paramètre *NoWait* [#26998].
<br/><br/>

**<u>Az.Sql</u>**
- Correction du problème GitHub #12417 *Get-AzSqlElasticPoolDatabase n'énumère pas la sortie* : correction de la sortie pour énumérer les résultats.
<br/><br/>

**<u>Az.Storage</u>**
- Prise en charge du nouveau SkuName lors de la création/mise à jour du compte de stockage pour le type de compte Files Provisioned v2 : *StandardV2_LRS*, *StandardV2_GRS*, *StandardV2_ZRS*, *StandardV2_GZRS*, *PremiumV2_LRS*, *PremiumV2_ZRS*.
    - *New-AzStorageAccount*.
    - *Set-AzStorageAccount*.
- Prise en charge de l'utilisation du service de fichiers Get File sur le type de compte Files Provisioned v2.
    - *Get-AzStorageFileServiceUsage*.
- Prise en charge de la création/mise à jour du partage de fichiers sur les nouveaux paramètres du type de compte Files Provisioned v2 avec le nouveau paramètre : *-ProvisionedBandwidthMibps*, *-ProvisionedIops*.
    - *New-AzRmStorageShare*.
    - *Update-AzRmStorageShare*.
- Prise en charge de la création/mise à jour/obtention du partage de fichiers sur les nouveaux paramètres du type de compte Files Provisioned v1 avec le nouveau paramètre : *-PaidBurstingEnabled*, *-PaidBurstingMaxBandwidthMibps*, *-PaidBurstingMaxIops*.
    - *New-AzRmStorageShare*.
    - *Update-AzRmStorageShare*.
    - *Get-AzStorageFileServiceUsage*.
- Prise en charge de l'obtention des nouvelles propriétés du partage de fichiers pour le type de compte Files Provisioned v1/v2.
    - *Get-AzStorageFileServiceUsage*.
<br/><br/>

**<u>Az.Synapse</u>**
- Mise à jour de *Azure.Analytics.Synapse.Artifacts* vers 1.0.0-preview.21.
<br/><br/>

**<u>Az.Websites</u>**
- Migration de la génération *Websites.Helper* d'autorest csharp vers autorest PowerShell.
<br/><br/>

**<u>Az.Workloads</u>**
- Disponibilité générale du module *Az.Workloads*.
- Version API mise à jour au 01/09/2024.
<br/><br/>

---

##### Conclusion
Allez faire la mise à jour de votre module PowerShell pour Azure pour pouvoir bénéficier des dernières mises à jour et configurations possibles.

---

##### Sources
[PowerShell Gallery](https://www.powershellgallery.com/packages/AZ/13.3.0)

---


Avez-vous apprécié cet article ? Vous avez des questions, commentaires ou suggestions, n’hésitez pas à laisser un commentaire dans la section ci-dessous ou en m'envoyant un message depuis le formulaire de contact.

N'oubliez pas de nous suivre et de partager cet article.