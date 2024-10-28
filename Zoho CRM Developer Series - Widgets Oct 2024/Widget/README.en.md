[![jp](https://img.shields.io/badge/lang-jp-green.svg)](Zoho CRM Developer Series - Widgets Oct 2024/Widget/README.md)
[![en](https://img.shields.io/badge/lang-en-red.svg)](Zoho CRM Developer Series - Widgets Oct 2024/Widget/README.en.md)

# Overview
This is an CRM widget created for visualize the various module's due records in a calendar structure.

In this widget we displayed values from below modules
| Module Name | Description |
| ----------- | ----------- |
| Tasks | Displays based on Due Date |
| Meetings | Displays based on Start Date |
| Calls | Displays based on Call Start Time |
| Quotes | Displays based on Due Date |
| Invoices | Displays based on Due Date |
| Sales Order | Displays based on Due Date |
| Purchase Order | Displays based on Due Date |


# How to deploy
## Prerequisites
- Zoho CRM Trial or Paid Edition which supports Widgets

## Steps for deployment
1. Install [zet](https://www.zoho.com/crm/developer/docs/widgets/install-cli.html) and initialize new project.
2. Replace app folder with this [app](app/) folder files
3. Update CONNECTION_NAME and CRM_BASE_URL variables with appropriate values in [script.js](app/js/script.js)
4. If widget was planned to be deployed in others DC's apart from JP DC, please update required API endpoints as well in [script.js](app/js/script.js)
5. Pack the widget
6. Deploy in Zoho CRM

# Enhancement plans
1. Multi DC support without any changes in [script.js](app/js/script.js)
2. Filtering out completed status records based on Status field - [Configuration](app/js/script.js#L3) already have required details
3. Displaying records of all users belongs to a specific group
4. Optimizing API calls on month change
5. Enhancing UI
6. Multi Language support
