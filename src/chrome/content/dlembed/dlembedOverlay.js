// All code below is GPL
// Author: Andrew Ruder unless otherwise noted.

window.addEventListener("focus", dlembed_updateicon, false);

function dlembed_addwindowlistener() {
	alert("Blah: " + self + window + document + window._content);
	window._content.addEventListener("load", dlembed_updateicon, true);
}
	
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

function get_all_embedded() {
	var docs = webdeveloper_getDocuments(window.content, new Array());
	var embeds = new Array();
		
	count = 0;
	for (var j = 0; j < docs.length; j++) {
		var this_embeds = docs[j].getElementsByTagName("embed");
		for (var k = 0; k < this_embeds.length; k++) {
			embeds.push(this_embeds[k]);
		}
	}

	return embeds;
}

function dlembed_updateicon() {
	var docs = webdeveloper_getDocuments(window.content, new Array());
	var embeds = get_all_embedded();
	var icon = document.getElementById("dlembed-button");
	window.content.dump("Hello, world!");
	if (embeds.length == 0) {
		// icon.setAttribute("status", "no_items");
	} else {
		// icon.setAttribute("status", "has_items");
	}
}

function dlembed_dlall() {
	var embeds = get_all_embedded();
	alert("There are " + embeds.length + " embedded objects");
}
