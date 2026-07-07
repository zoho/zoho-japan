if (value != null) {
    /*
     * Options / オプション:
     * 1. Copy Shipping Address / 配送先住所をコピーする
     * 2. Copy Billing Address / 請求先住所をコピーする
     * 3. Copy Billing and Shipping Address / 請求先と配送先の住所をコピーする
     * 4. Do not Copy / コピーしない
     */
    var response = ZDK.Client.getInput([{
        type: 'picklist',
        label: '住所コピーオプションを選択してください', // Select address copy option / 住所コピーオプションを選択してください
        list_options: [
            { actual_value: "copy_shipping", display_value: "配送先住所をコピーする" },       // Copy Shipping Address / 配送先住所をコピーする
            { actual_value: "copy_billing", display_value: "請求先住所をコピーする" },       // Copy Billing Address / 請求先住所をコピーする
            { actual_value: "copy_both", display_value: "請求先と配送先の住所をコピーする" }, // Copy Billing and Shipping Address / 請求先と配送先の住所をコピーする
            { actual_value: "do_not_copy", display_value: "コピーしない" }                   // Do not Copy / コピーしない
        ],
        default_value: "do_not_copy"
    }], '住所コピー', '確認', 'キャンセル'); // Heading: Address Copy / 住所コピー, OK: Confirm / 確認, Cancel / キャンセル

    var selectedOption = response[0];

    if (selectedOption != "do_not_copy") {
        // Fetch contact only once / 連絡先を一度だけ取得する
        var contact = ZDK.Apps.CRM.Contacts.fetchById(value.id);

        if (selectedOption == "copy_billing" || selectedOption == "copy_both") {
            // Copy Contact's Other Address → Billing Address
            // 連絡先の「その他の住所」→ 請求先住所にコピー
            ZDK.Page.getForm().setValues({
                'Billing_Address_Street_Address': contact.Other_Street,
                'Billing_Address_City': contact.Other_City,
                'Billing_Address_State_Province': contact.Other_State,
                'Billing_Address_Zip_Postal_Code': contact.Other_Zip,
                'Billing_Address_Country_Region': contact.Other_Country,
                "Billing_Address_Flat_House_No_Building_Apartment": contact.Other_Flat_House_No_Building_Apartment_Name,
                "Billing_Address_Coordinates_Latitude": contact.Other_Latitude,
                "Billing_Address_Coordinates_Longitude": contact.Other_Longitude
            })
        }

        if (selectedOption == "copy_shipping" || selectedOption == "copy_both") {
            // Copy Contact's Mailing Address → Shipping Address
            // 連絡先の「郵送先住所」→ 配送先住所にコピー
            ZDK.Page.getForm().setValues({
                'Shipping_Address_Street_Address': contact.Mailing_Street,
                'Shipping_Address_City': contact.Mailing_City,
                'Shipping_Address_State_Province': contact.Mailing_State,
                'Shipping_Address_Zip_Postal_Code': contact.Mailing_Zip,
                'Shipping_Address_Country_Region': contact.Mailing_Country,
                "Shipping_Address_Flat_House_No_Building_Apartment": contact.Mailing_Flat_House_No_Building_Apartment_Name,
                "Shipping_Address_Coordinates_Latitude": contact.Mailing_Latitude,
                "Shipping_Address_Coordinates_Longitude": contact.Mailing_Longitude
            })
        }
    }
}