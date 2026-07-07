[![ja](https://img.shields.io/badge/lang-ja-red.svg)](README.ja.md)
[![en](https://img.shields.io/badge/lang-en-blue.svg)](README.en.md)

# Populate Contact Address in Custom Module.

This client script populates the Mailing and Other address of a Contact to the respective Shipping and Billing address fields present in a custom module.

When a Contact is selected in the Contact lookup field on the Create/Edit/Clone page of the custom module, the script fetches the Contact's address details and copies them to the corresponding address fields in the custom module upon user confirmation.

- Contact's Other Address → Custom Module's Billing Address
- Contact's Mailing Address → Custom Module's Shipping Address

# Features

- Automatically populates Billing Address fields from the selected Contact's Other Address.
- Automatically populates Shipping Address fields from the selected Contact's Mailing Address.
- Prompts the user with a confirmation dialog before copying each address, allowing selective population.
- Works on Create, Edit, and Clone pages of the custom module.