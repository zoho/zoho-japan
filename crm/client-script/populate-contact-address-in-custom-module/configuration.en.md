[![ja](https://img.shields.io/badge/lang-ja-red.svg)](configuration.ja.md)
[![en](https://img.shields.io/badge/lang-en-red.svg)](configuration.en.md)

# Populate Contact Address in Custom Module.

## Client Script creation.
1. [Create a Client Script](/common/crm/client-script/how-to-work.en.md) in CRM with below details.
    - `Name`: Populate Contact Address in Custom Module
    - `Category`: Module
    - `Page`: Create, Edit, Clone
    - `Module`: `<Custom Module Name>`
    - `Layout`: Standard
    - `Type`: Field Event
    - `Field`: `<Contact Lookup Field Name>`
    - `Event`: On Change

2. Add [this code](script.js) to the script editor and save the same.

> **NOTE** : The field API names used in the script must match the actual API names of the address fields in your custom module. Follow the steps below to identify the correct API names and update the script accordingly.

### How to identify the field API names.
1. Go to `CRM Setup > Customization > Modules and Fields`.
2. Select the custom module for which the script is being configured.
3. Click on the address field (Billing/Shipping) to open the field properties.
4. Copy the `Field API Name` displayed in the field properties.

### How to update the script.
1. Open [script.js](script.js) and locate the `ZDK.Page.getForm().setValues({...})` blocks.
2. Replace the keys (left side) in the `setValues` object with the actual API names of the Billing and Shipping address fields from your custom module.
3. The values (right side) are the Contact module's standard address field API names and should remain unchanged.

### Field Mapping Reference

Below is the mapping structure used in the script. Replace the **Custom Module Field** API names with the ones from your custom module.

| Custom Module Field (Billing Address) | Contact Field (Other Address) |
|---------------------------------------|-------------------------------|
| `Billing_Address_Street_Address` | `Other_Street` |
| `Billing_Address_City` | `Other_City` |
| `Billing_Address_State_Province` | `Other_State` |
| `Billing_Address_Zip_Postal_Code` | `Other_Zip` |
| `Billing_Address_Country_Region` | `Other_Country` |
| `Billing_Address_Flat_House_No_Building_Apartment_N` | `Other_Flat_House_No_Building_Apartment_Name` |
| `Billing_Address_Coordinates_Latitude` | `Other_Latitude` |
| `Billing_Address_Coordinates_Longitude` | `Other_Longitude` |

| Custom Module Field (Shipping Address) | Contact Field (Mailing Address) |
|----------------------------------------|---------------------------------|
| `Shipping_Address_Street_Address` | `Mailing_Street` |
| `Shipping_Address_City` | `Mailing_City` |
| `Shipping_Address_State_Province` | `Mailing_State` |
| `Shipping_Address_Zip_Postal_Code` | `Mailing_Zip` |
| `Shipping_Address_Country_Region` | `Mailing_Country` |
| `Shipping_Address_Flat_House_No_Building_Apartment` | `Mailing_Flat_House_No_Building_Apartment_Name` |
| `Shipping_Address_Coordinates_Latitude` | `Mailing_Latitude` |
| `Shipping_Address_Coordinates_Longitude` | `Mailing_Longitude` |
