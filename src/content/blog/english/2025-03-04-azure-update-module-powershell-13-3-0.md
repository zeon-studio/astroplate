---
title: "Update to version 13.3.0 of the Azure PowerShell module"
meta_title: ""
description: ""
date: 2025-03-04T10:00:00-05:00
image: "/images/blog/azure/azure_update_module_powershell_13_3_0_thumbnail.png"
categories: ["Azure"]
author: "Maxime Hiez"
tags: ["Module", "Update", "PowerShell"]
draft: false
---
---

##### Introduction
Microsoft recently released the new version 13.3.0 of the PowerShell module for Microsoft Azure.

---

##### Installation
You can check the version of the installed module via the following PowerShell command :
```powershell
Get-InstalledModule -Name "Az*"
```

You can install the Az module via the following PowerShell command :
```powershell
Install-Module -Name Az
```

You can update the Az module via the following PowerShell command :
```powershell
Update-Module Az -Force
```

---

##### What's new ?
Version 13.3.0 contains the following updates :

**<u>Az.CosmosDB</u>**
- Added support for Cosmos DB Table role definition and role assignment related cmdlets.
<br/><br/>

**<u>Az.DataBoxEdge</u>**
- Removed *Microsoft.Azure.Management.DataBoxEdge* Version '1.0.0' PackageReference.
<br/><br/>

**<u>Az.DataFactory</u>**
- Added more support for Oracle connection properties.
- Added more support for Teradata connection properties.
- Added more support for AzurePostgreSql connection properties.
<br/><br/>

**<u>Az.DataShare</u>**
- Removed *Microsoft.Azure.Management.DataShare* Version '1.0.1' PackageReference.
<br/><br/>

**<u>Az.Maintenance</u>**
- Migrated SDK generation from autorest csharp to autorest PowerShell.
<br/><br/>

**<u>Az.Migrate</u>**
- Updated *Data.Replication* to newer API version (stable API version 2024-09-01).
- Rebranded *Data.Replication* cmdlets (from *Azure Stack HCI* to *Azure Local*).
<br/><br/>

**<u>Az.PolicyInsights</u>**
- Removed *Microsoft.Azure.Management.PolicyInsights* Version '1.0.0' PackageReference.
<br/><br/>

**<u>Az.RecoveryServices</u>**
- Updated *Restore-AzRecoveryServicesBackupItem* to support 0 as a *TargetZoneNumber* to restore to *NoZone*.
- Updated *Restore-AzRecoveryServicesBackupItem* to block cross zonal restore from snapshot RP.
<br/><br/>

**<u>Az.ResourceGraph</u>**
- Upgraded API version to 2024-04-01.
<br/><br/>

**<u>Az.Resources</u>**
- Added *-ApplicationId* as an alias of *-ServicePrincipalName*.
- Supported getting role assignments at the exact scope via *-AtScope* for *Get-AzRoleAssignment*.
<br/><br/>

**<u>Az.ServiceBus</u>**
- Fixed a bug when invoke *Set-AzServiceBusNamespace* with parameter *NoWait* [#26998].
<br/><br/>

**<u>Az.Sql</u>**
- Fixed GitHub issue #12417 *Get-AzSqlElasticPoolDatabase doesn't enumerate output* : fixed the output to enumerate the results.
<br/><br/>

**<u>Az.Storage</u>**
- Supported new SkuName when create/update storage account for Files Provisioned v2 account type : *StandardV2_LRS*, *StandardV2_GRS*, *StandardV2_ZRS*, *StandardV2_GZRS*, *PremiumV2_LRS*, *PremiumV2_ZRS*.
   - *New-AzStorageAccount*.
   - *Set-AzStorageAccount*.
- Supported Get File Service Usage on Files Provisioned v2 account type.
   - *Get-AzStorageFileServiceUsage*.
- Supported create/update file share on new parameters on Files Provisioned v2 account type with new parameter : *-ProvisionedBandwidthMibps*, *-ProvisionedIops*.
   - *New-AzRmStorageShare*.
   - *Update-AzRmStorageShare*.
- Supported create/update/Get file share on new parameters on Files Provisioned v1 account type with new parameter : *-PaidBurstingEnabled*, *-PaidBurstingMaxBandwidthMibps*, *-PaidBurstingMaxIops*.
   - *New-AzRmStorageShare*.
   - *Update-AzRmStorageShare*.
   - *Get-AzStorageFileServiceUsage*.
- Supported get file share new properties for Files Provisioned v1/v2 account type.
   - *Get-AzStorageFileServiceUsage*.
<br/><br/>

**<u>Az.Synapse</u>**
- Updated *Azure.Analytics.Synapse.Artifacts* to 1.0.0-preview.21.
<br/><br/>

**<u>Az.Websites</u>**
- Migrated *Websites.Helper* generation from autorest csharp to autorest PowerShell.
<br/><br/>

**<u>Az.Workloads</u>**
- General availability for module *Az.Workloads*.
- Upgraded API version to 2024-09-01.
<br/><br/>

---

##### Conclusion
Go and update your PowerShell for Azure module to benefit from the latest updates and possible configurations.

---

##### Sources
[PowerShell Gallery](https://www.powershellgallery.com/packages/AZ/13.3.0)

---


Did you enjoy this post ? If you have any questions, comments or suggestions, please leave a comment in the section below or by sending me a message from the contact form.

Don't forget to follow us and share this post.