# Zet initialization:

## Install Node and NPM
- npm -v
-	node -v

For Mac and Windows
-	https://nodejs.org/en/download/prebuilt-installer

For Linux
-	sudo apt install nodejs
..*	sudo apt install npm

Install ZET
..*	npm install -g zoho-extension-toolkit
..*	zet -v

Create Project
..*	zet init

Zoho CRM Widget External Hosting
..*	https://127.0.0.1:5000
○	Port number might change based on case.
○	 
●	/widget.html

Start Widget from Local
●	zet run

HTML file Head Tag
```
<div id="widget-container">
    <div id="header">Open Action Items</div>
</div>
```

Download required files
Download library folder from here 
Unzip and move the folders to the app folder of the current project

CSS and JS tag addition

<head>
    <meta charset="UTF-8">
    <script src="https://live.zwidgets.com/js-sdk/1.2/ZohoEmbededAppSDK.min.js"></script>
    <link rel="stylesheet" href="css/style.css">		
    <script src="js/script.js" defer></script>
</head>

Add Three buttons for operations
<div id="input-fields">
    <div id="module-select">
        <button class="dropdown-btn action-btn btn" onclick="showSelection(this)">Modules</button>
        <div class="dropdown-content">
            <div id="modules-list"></div>
            <div class="btn-holder">
                <span class="btn save-btn" onclick="showHideModuleEvents(this)">Save</span>
                <span class="btn cancel-btn" onclick="closeSelection(this)">Cancel</span>
            </div>
        </div>
    </div>
    <div id="group-dropdown">
        <div id="group-list-section">
            <button class="dropdown-btn action-btn btn" onclick="showSelection(this)">Groups</button>
            <div class="dropdown-content">
                <div id="group-list"></div>
                <div class="btn-holder">
                    <span class="btn save-btn" onclick="loadEventsForGroup(this)">Save</span>
                    <span class="btn cancel-btn" onclick="closeSelection(this)">Cancel</span>
                </div>
            </div>
        </div>
    </div>
                
    <div id="user-dropdown">
        <div id="user-list-section">
            <button class="dropdown-btn action-btn btn" onclick="showSelection(this)">Users</button>
            <div class="dropdown-content">
                <div id="user-list"></div>
                <div class="btn-holder">
                    <span class="btn save-btn" onclick="getSelectedUsersAndPopulateDataToCalendar(this)">Save</span>
                    <span class="btn cancel-btn" onclick="closeSelection(this)">Cancel</span>
                </div>
            </div>
        </div>
    </div>
</div>

Calendar Placeholder
1	<div id="calendar"></div>

Initializing the Module List
var USER_LIST = {};
var GROUP_LIST= {};
var CURRENT_USER = {};
var CALENDAR_INSTANCE;
const CRM_BASE_URL = "https://crm.zoho.jp/crm/org90001605376/tab/";

const CRM_MODULES = {
  Tasks: {
    display_name : "Tasks_JP",
    due_date_field: "Due_Date",
    status_field: "Status",
    completed_status : ["完了"],
    add_record_url: "Tasks/create",
    open_record_url : "Tasks/{id}",
    name_field : "Subject",
    event_id : 1,
    color : "#FFFFFF",
    color_text : "#000000",
    color_border : "#D3D3D3"
  },
  Calls: {
    display_name : "Calls_JP",
    start_time_field: "Call_Start_Time",
    duration : "Call_Duration",
    status_field: "Outgoing_Call_Status",
    completed_status : ["完了"],
    add_record_url: "Calls/create",
    open_record_url : "Calls/{id}",
    name_field : "Subject",
    event_id : 2,
    color : "#2F4F4F",
    color_text : "#FFFFFF",
    color_border : "#808080"
  },
  Events: {
    display_name : "Events_JP",
    start_time_field: "Start_DateTime",
    end_time_field : "End_DateTime",
    add_record_url: "Events/create",
    open_record_url : "Events/{id}",
    name_field : "Event_Title",
    event_id : 3,
    color : "#87CEEB",
    color_text : "#000080",
    color_border : "#1E90FF"
  },
  Quotes: {
    display_name : "Quotes_JP",
    due_date_field: "Valid_Till",
    status_field: "Quote_Stage",
    completed_status : ["確定済み","失注"],
    add_record_url: "Quotes/create",
    open_record_url : "Quotes/{id}",
    name_field : "Subject",
    event_id : 4,
    color : "#F08080",
    color_text : "#8B0000",
    color_border : "#CD5C5C"
  },
  Invoices: {
    display_name : "Invoice_JP",
    due_date_field: "Due_Date",
    status_field: "Status",
    completed_status:["納品済み","キャンセル"],
    add_record_url: "Invoices/create",
    open_record_url : "Invoices/{id}",
    name_field : "Subject",
    event_id : 5,
    color : "#98FB98",
    color_text : "#006400",
    color_border : "#2E8B57"
  },
  Purchase_Orders: {
    display_name : "PO_JP",
    due_date_field: "Due_Date",
    status_field: "Status",
    completed_status:["納品済み","キャンセル"],
    add_record_url: "PurchaseOrders/create",
    open_record_url : "PurchaseOrders/{id}",
    name_field : "Subject",
    event_id : 6,
    color : "#F5DEB3",
    color_text : "#8B4513",
    color_border : "#CD853F"
  },
  Sales_Orders: {
    display_name : "SO_JP",
    due_date_field: "Due_Date",
    status_field: "Status",
    completed_status : ["到達","キャンセル"],
    add_record_url: "SalesOrders/create",
    open_record_url : "SalesOrders/{id}",
    name_field : "Subject",
    event_id : 7,
    color : "#E6E6FA",
    color_text : "#4B0082",
    color_border : "#9370DB"
  },
};


Populate Module Dropdown
function populateModuleList() {
  var moduleListDiv = document.getElementById("modules-list");
  var elements = "";
  for (var moduleName in CRM_MODULES) {
    var moduleDetails = CRM_MODULES[moduleName];
    var addUrl= CRM_BASE_URL+moduleDetails.add_record_url;
    var element = `<div class="module-holder" data-modulename="${moduleName}">
                            <table class="option-table">
                                <tr>
                                    <td style="width:20%">
                            <input type="checkbox" checked class="module-selection-checkbox">
                                    </td>
                                    <td  style="width:60%">
                            <span class="module-select-name">${moduleDetails.display_name}</span>
                                    </td>
                                    <td  style="width:20%">
                            <img src="images/add.png" onclick="openurl(this)" class="add-new" data-url="${addUrl}"></img>
                                    </td>
                                </tr>  
                            </table>  
           </div>`;
    elements +=element;                    
  }
  moduleListDiv.innerHTML = elements;
}

function openurl(element){
    var url = element.url;
    if(!url){
       url = element.getAttribute("data-url");
    }
    window.open(url,"_blank");
}

Initialize JS Execution
ZOHO.embeddedApp.on("PageLoad",function(data)
{
    initWidget();
});

ZOHO.embeddedApp.init();
    
function initWidget(){
    populateModuleList();
  }

Display Dropdown selection
function showSelection(button) {
  var dropdownContentElement = button.parentElement.querySelector(".dropdown-content");
  dropdownContentElement.style.display = "block";
    
  //disable buttons
  actionBtns = document.querySelectorAll("#input-fields .action-btn");
  actionBtns.forEach(element => {
        element.disabled = true;
  });
}

Hide Dropdown selection
function closeSelection(button) {
    try{
        var dropdownContentElement = button.parentElement.parentElement;
        dropdownContentElement.style.display = "none";
        //enable buttons
        actionBtns = document.querySelectorAll("#input-fields .action-btn");
        actionBtns.forEach(element => {
                element.disabled = false;
        });
    }catch(e){

    }
}

Connection Scopes
●	ZohoCRM.settings.user_groups.READ
●	ZohoCRM.modules.READ
●	ZohoCRM.users.READ

Initializing the User List
function populateUserList(){
    var connectionName = "crm";
    var requestData ={
    "parameters" : { 
        Type : "ActiveConfirmedUsers"
    },
    "method" : "GET",
    "url" : "https://www.zohoapis.jp/crm/v7/users",
    "param_type" : 1
    };
    ZOHO.CRM.CONNECTION.invoke(connectionName, requestData).then(function(response){
        //if user data available
        if(response.code =="SUCCESS"){
            var data = response.details.statusMessage;
            data.users.forEach(user => {
                USER_LIST[user.id] = user;
            });
        }
    }).then(function(){
        var userListDiv = document.getElementById("user-list");
        var elements = "";
        for (var userId in USER_LIST) {
            var selected = "";
            if(userId == CURRENT_USER.id){
                selected = "checked";
            }
            var userDetails = USER_LIST[userId];
            var element = `<div class="module-holder" data-userid="${userId}">
                                <table class="option-table">
                                    <tr>
                                        <td style="width:20%">
                                            <input type="checkbox" ${selected} class="user-selection-checkbox">
                                        </td>
                                        <td  style="width:80%">
                                            <span class="user-select-name">${userDetails.full_name}</span>
                                        </td>
                                    </tr>  
                                </table>  
                            </div>`;
            elements +=element;                    
        }
        userListDiv.innerHTML = elements;
    });
}

//initWidget
ZOHO.CRM.CONFIG.getCurrentUser().then(function(data){
        CURRENT_USER = data.users[0];
        populateUserList();
    });

Initializing the Group List
function populateGroupList(){
    var connectionName = "crm";
    var requestData ={
    "method" : "GET",
    "url" : "https://www.zohoapis.jp/crm/v7/settings/user_groups",
    "param_type" : 1
    };
    ZOHO.CRM.CONNECTION.invoke(connectionName, requestData).then(function(response){
        //if user data available
        if(response.code =="SUCCESS"){
            var data = response.details.statusMessage;
            data.user_groups.forEach(group => {
                GROUP_LIST[group.id] = group;
            });
        }
    }).then(function(){
        var groupListDiv = document.getElementById("group-list");
        var elements = "";
        for (var groupId in GROUP_LIST) {
            var groupDetails = GROUP_LIST[groupId];
            var element = `<div class="module-holder" data-groupid="${groupId}">
                                <table class="option-table">
                                    <tr>
                                        <td style="width:20%">
                                            <input type="checkbox" class="group-selection-checkbox">
                                        </td>
                                        <td  style="width:80%">
                                            <span class="user-select-name">${groupDetails.name}</span>
                                        </td>
                                    </tr>  
                                </table>  
                            </div>`;
            elements +=element;                    
        }
        groupListDiv.innerHTML = elements;
    });
}	

//initWidget
populateGroupList();

Initialize Calendar
function initCalendar(){
    var options = {
        manualEditingEnabled: false,
        showHolidays: false,
        showDayNumberOrdinals : false,
        tooltipDelay : 500,
        configurationDialogEnabled : false,
        eventTooltipDelay : 500,
        jumpToDateEnabled : false,
    };
    CALENDAR_INSTANCE = new calendarJs( "calendar",options);
    setEventTypeInCalendar();
}

function setEventTypeInCalendar(){
    var defaultEvent = [0,1,2,3,4];
    defaultEvent.forEach(eventId => {
        CALENDAR_INSTANCE.removeEventType(eventId);
    });
    
    for(var module in CRM_MODULES){
        CALENDAR_INSTANCE.addEventType(CRM_MODULES[module].event_id,CRM_MODULES[module].display_name);
    }
}

//initWidget
initCalendar();
//head
<script src="js/calendar-js/dist/calendar.min.js"></script>
<link rel="stylesheet" href="js/calendar-js/dist/calendar.js.min.css">


Fetch required details from CRM
function getSelectedUsersAndPopulateDataToCalendar(button) {
    var selectedUserIds = [];
    //get users from the list 
    var selectedUsersElements = document.querySelectorAll(".user-selection-checkbox:checked");
    selectedUsersElements.forEach(moduleElement => {
        var userId = moduleElement.closest("div").getAttribute("data-userid");
        selectedUserIds.push(userId);
    });
    if(selectedUserIds.length == 0){
        alert("Minimum one user needed");
        return;
    }
    populateDataToCalendar(selectedUserIds);
    if(button != undefined){
        closeSelection(button);
    }
}

function populateDataToCalendar(selectedUsers){
    var date = CALENDAR_INSTANCE.getCurrentDisplayDate();
    var selectedModulesElements = document.querySelectorAll(".module-selection-checkbox:checked");
    selectedModulesElements.forEach(moduleElement => {
        var moduleName = moduleElement.closest("div").getAttribute("data-modulename");
        setEventsOfModule(moduleName,date,selectedUsers);
    });
}
function setEventsOfModule(moduleName, date, ownerIds){
    var moduleDetails = CRM_MODULES[moduleName];
    var formattedFromDate = dateToYMD(date);
    var formattedToDate = dateToYMD(new Date(date.getFullYear(), date.getMonth()+1, 0));

    var timeField = moduleDetails.due_date_field;
    var criteria = `((${timeField} between '${formattedFromDate}' and '${formattedToDate}') and Owner in (${ownerIds}))`;
    if( moduleDetails.start_time_field ){
        timeField = moduleDetails.start_time_field;
        criteria = `((${timeField} between '${formattedFromDate}T00:00:00+09:00' and '${formattedToDate}T23:59:59+09:00') and Owner in (${ownerIds}))`;
        timeField = moduleDetails.start_time_field;
        if(moduleDetails.duration){
            timeField = timeField +", " + moduleDetails.duration;
        }else if(moduleDetails.end_time_field){
            timeField = timeField +", " + moduleDetails.end_time_field+", All_day";
        }
    }
    var config = {
        "select_query": `select ${moduleDetails.name_field}, ${timeField} from ${moduleName} where ${criteria}`
    }
    ZOHO.CRM.API.coql(config).then(function(response){
        if(response && response.data){
            var data = response.data;
            var moduleDetails = CRM_MODULES[moduleName];
            data.forEach(entry => {
                var toTime = entry[moduleDetails.due_date_field || moduleDetails.end_time_field];
                if(!toTime){
                    var duration = entry[moduleDetails.duration];
                    if(duration){
                        var minutes = duration.split(":")[0];
                        var seconds = duration.split(":")[1];
                        //duration must linked to time
                        var startTime = Date.parse(entry[moduleDetails.start_time_field]);
                        var endTime = startTime + (minutes*60*1000) + (seconds*1000);
                        toTime = new Date(endTime).toISOString();
                    }
                }
                
                var eventDetails = {
                    id :  entry.id,
                    title : entry[moduleDetails.name_field] || "No Title",
                    from : entry[moduleDetails.due_date_field || moduleDetails.start_time_field],
                    to : toTime || entry[moduleDetails.due_date_field || moduleDetails.start_time_field],
                    isAllDay : moduleDetails.due_date_field || entry.All_day?true:false,
                    type : moduleDetails.event_id,
                    url : CRM_BASE_URL+moduleName+"/"+entry.id,
                    color : moduleDetails.color,
                    colorText : moduleDetails.color_text,
                    colorBorder : moduleDetails.color_border
                };
                CALENDAR_INSTANCE.addEvent(eventDetails);
            });
        }
    });
}

//formatting date
function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

//call functions
.then(populateDataToCalendar([CURRENT_USER.id]));


Show hide Module's Event
function showHideModuleEvents(button){
    if(button){
        closeSelection(button);
    }
    var selectedModules = document.querySelectorAll(".module-selection-checkbox:checked");
    var selectedModuleIds = [];
    selectedModules.forEach(moduleElement => {
        var moduleName = moduleElement.closest("div").getAttribute("data-modulename");
        selectedModuleIds.push(CRM_MODULES[moduleName].event_id);
    });
    CALENDAR_INSTANCE.setVisibleEventTypes(selectedModuleIds);
}

Populate Data on Calendar date change
events : {
    onPreviousMonth : getSelectedUsersAndPopulateDataToCalendar,
    onNextMonth : getSelectedUsersAndPopulateDataToCalendar,
         onSetDate : getSelectedUsersAndPopulateDataToCalendar,
         onEventClick : openurl
}

Reference links
●	https://www.zoho.com/jp/crm/developer/docs/widgets/
●	https://help.zwidgets.com/help/latest/index.html
