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
	if (embeds == 0) {
		icon.setAttribute("status", "no_items");
	} else {
		icon.setAttribute("status", "has_items");
	}
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

function dlembed_dlall() {
	var embeds = get_all_embedded();
	var i = 0;
	for (i = 0; i < embeds.length; i++) {
		
		
}

window.addEventListener("load", function(evt) { 
	update_dlembedicon();
	return true;
}, true);

window.addEventListener("focus", function(evt) {
	update_dlembedicon();
	return true;
}, true);
