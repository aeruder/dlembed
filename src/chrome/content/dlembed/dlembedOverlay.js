// All code below is GPL
// Author: Andrew Ruder unless otherwise noted.

// Gets all the documents from the current page
// This function is Copyright(C) Chris Pederick
function webdeveloper_getDocuments(frame, documentList)
{
    const framesList = frame.frames;

    documentList.push(frame.document);

    // Loop through the frames
    for(var i = 0; i < framesList.length; i++)
    {
        webdeveloper_getDocuments(framesList[i], documentList);
    }

    return documentList;
}

// This is our javascript which will download all embedded elements
function dlembed() {
	docs = webdeveloper_getDocuments(window.content, new Array());
//	alert("Entering function");
	
	for (j = 0; j < docs.length; j++) {
//		alert("Document #" + j);
		embeds = docs[j].getElementsByTagName("embed");
		
		for (k = 0; k < embeds.length; k++) {
			url = makeURLAbsolute(docs[j].baseURI, embeds[k].src);
//			alert("Embed #" + k + " '" + embeds[k].src + "' => " + url);
			saveURL(url, "");
		}
	}
}
