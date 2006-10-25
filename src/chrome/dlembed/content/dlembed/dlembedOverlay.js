// All code below is GPL
// Author: Andrew Ruder unless otherwise noted.

// Gets all the documents from the current page
// This function is Copyright(C) Chris Pederick
function dlembed_getdocuments(frame, documentList) {
    var dlembed_framesList;
	
	if (!frame) return documentList;
	
	dlembed_framesList  = frame.frames;

    documentList.push(frame.document);

    // Loop through the frames
    for(var i = 0; i < dlembed_framesList.length; i++)
    {
        dlembed_getdocuments(dlembed_framesList[i], documentList);
    }

    return documentList;
}

function dlembed_update_icon() {
	var icon = document.getElementById("dlembed-button");
	if (!icon) {
		return;
	}
	var embeds = dlembed_num_embs();
	switch(embeds) {
		case 0:
			icon.setAttribute("status", "no_items");
			icon.setAttribute("tooltiptext", 
			   "0 embedded objects");
			break;
		case 1:
			icon.setAttribute("tooltiptext",
			   "1 embedded object");
			icon.setAttribute("status", "has_items");
			break;
		default:
			icon.setAttribute("status", "has_items");
			icon.setAttribute("tooltiptext",
			   embeds + " embedded objects");
			break;
	}
}
	
function dlembed_num_embs() {
	var dlembedded_els = dlembed_get_emb();
	return dlembedded_els.length;
}

const nsIWindowMediator = Components.interfaces.nsIWindowMediator;

/* This is from the tasksOverlay.js from mozilla 
 */
function dlembed_open_dlmanager() {
	var dlmgr = Components.classes['@mozilla.org/download-manager;1'].getService(Components.interfaces.nsIDownloadManager); 

	var windowMediator = Components.classes['@mozilla.org/appshell/window-mediator;1'].getService();
	windowMediator = windowMediator.QueryInterface(nsIWindowMediator);

	var dlmgrWindow = windowMediator.getMostRecentWindow("Download:Manager");
	if (dlmgrWindow) {
		dlmgrWindow.focus();
	} 
	else {
		try {
			dump("Stupid dlmgr: " + dlmgr);
			dlmgr.open(null, null);
		}
		catch(e) {
			dump("Exception " + e + " when doing dlmgr.open in dlembed");
		}
	}
}

function dlembed_get_emb() {
	var docs = dlembed_getdocuments(window.content, new Array());
	var embeds = new Array();
		
	var count = 0;
	for (var j = 0; j < docs.length; j++) {
		var this_embeds = docs[j].getElementsByTagName("embed");
		for (var k = 0; k < this_embeds.length; k++) {
			embeds.push([this_embeds[k], docs[j]]);
		}
	}

	return embeds;
}

function dlembed_geturls() {
	var url_list = new Array();
	var embeds = dlembed_get_emb();
	if (embeds.length == 0) return url_list;
	var i = 0;
	var url;
	for (i = 0; i < embeds.length; i++) {
		url = makeURLAbsolute(embeds[i][1].baseURI, embeds[i][0].src);
		url_list.push(url);
	}
	return url_list;
}

function dlembed_dlall() {
	var url_list = dlembed_geturls(window);

	var x = 0;

	dlembed_open_dlmanager();
	for (x = 0; x < url_list.length; x++) {
		window.saveURL(url_list[x], "");
	}
}

function dlembed_vu_win_load() {
	var url_list = window.arguments[0];
	var colors = new Array(2);
	colors[0] = "#eef";
	colors[1] = "#fff";

	var x = 0;

	var vulist = document.getElementById("dlembed_vu_list");
	if (!vulist) {
		alert ("Dlembed Viewurl list is null!");
		return;
	}

	for (x = 0; x < url_list.length; x++) {
		var li = document.createElement("listitem");
		li.setAttribute("label", url_list[x]);
		// li.style.backgroundColor = colors[x % 2];
		vulist.appendChild(li);
	}

	window.focus();
}

function dlembed_vu_copy_item() {
	var vulist = document.getElementById("dlembed_vu_list");
	if (!vulist) {
		alert ("Dlembed Viewurl list is null!");
		return;
	}

	var items = vulist.selectedItems;

	if (!items.length) {
		return;
	}

	var string = "";
	var x = 0;
	for (x = 0; x < items.length; x++) {
		var label = items[x].getAttribute("label");
		if (!label) {
			continue;
		}
		if (string.length) {
			string = string + "\n";
		}
		string = string + label;
	}

	var clipboard = Components.classes["@mozilla.org/widget/clipboardhelper;1"]
	                          .getService(Components.interfaces.nsIClipboardHelper );
	clipboard.copyString(string);
}

function dlembed_vu_dl_item() {
	var vulist = document.getElementById("dlembed_vu_list");
	if (!vulist) {
		alert ("Dlembed Viewurl list is null!");
		return;
	}

	var items = vulist.selectedItems;

	if (!items.length) {
		alert("Please select item(s) to download.");
		return;
	}

	dlembed_open_dlmanager();

	var x = 0;
	for (x = 0; x < items.length; x++) {
		var label = items[x].getAttribute("label");
		if (!label) {
			continue;
		}
		window.opener.saveURL(label, "");
	}
}

function dlembed_viewall() {
	var url_list = dlembed_geturls();
	var mywin = window.openDialog("chrome://dlembed/content/dlembedViewurls.xul",
	  "dlembed_viewurls", 
	  "dialog=no,chrome,width=600,height=150",
	  url_list, window);
	mywin.focus();
}

window.addEventListener("load", function(evt) { 
	dlembed_update_icon();
	return true;
}, true);

window.addEventListener("focus", function(evt) {
	dlembed_update_icon();
	return true;
}, true);
