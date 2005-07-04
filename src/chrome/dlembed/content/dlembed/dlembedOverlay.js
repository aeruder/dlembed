// All code below is GPL
// Author: Andrew Ruder unless otherwise noted.

// Gets all the documents from the current page
// This function is Copyright(C) Chris Pederick
function webdeveloper_getDocuments(frame, documentList) {
    const framesList = frame.frames;

    documentList.push(frame.document);

    // Loop through the frames
    for(var i = 0; i < framesList.length; i++)
    {
        webdeveloper_getDocuments(framesList[i], documentList);
    }

    return documentList;
}

function update_dlembedicon() {
	var icon = document.getElementById("dlembed-button");
	var embeds = num_embedded();
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
	
function num_embedded() {
	var dlembedded_els = get_all_embedded();
	return dlembedded_els.length;
}

const nsIWindowMediator = Components.interfaces.nsIWindowMediator;

/* This is from the tasksOverlay.js from mozilla 
 */
function open_dlmanager() {
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

function get_all_embedded() {
	var docs = webdeveloper_getDocuments(window.content, new Array());
	var embeds = new Array();
		
	count = 0;
	for (var j = 0; j < docs.length; j++) {
		var this_embeds = docs[j].getElementsByTagName("embed");
		for (var k = 0; k < this_embeds.length; k++) {
			embeds.push([this_embeds[k], docs[j]]);
		}
	}

	return embeds;
}

function download_urls(url_list, index) {
	if (index == url_list.length) return;
	window.setTimeout(function() {
		saveURL(url_list[index], "");
		download_urls(url_list, index + 1);
	}, 100);
}

function dlembed_dlall() {
	var embeds = get_all_embedded();
	if (embeds.length == 0) return;
	var i = 0;
	var url;
	var url_list = new Array();
	for (i = 0; i < embeds.length; i++) {
		url = makeURLAbsolute(embeds[i][1].baseURI, embeds[i][0].src);
		url_list.push(url);
	}
	open_dlmanager();
	window.setTimeout(function() { 
		download_urls(url_list, 0); 
	}, 100);
}

function dlembed_viewall() {
}

window.addEventListener("load", function(evt) { 
	update_dlembedicon();
	return true;
}, true);

window.addEventListener("focus", function(evt) {
	update_dlembedicon();
	return true;
}, true);
