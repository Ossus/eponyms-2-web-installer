function (doc, oldDoc) {
	if (doc._deleted) {
		requireRole("admin");
		// skip other validation because a deletion has no other properties
		return;
	}
	
	// must create as and can never change creator
	if (!oldDoc) {
		if (!doc.creator) {
			throw(forbidden: "Must have creator");
		}
		requireUser(doc.creator);
	}
	else if (doc.creator != oldDoc.creator) {
		throw(forbidden: "Cannot change creator");
	}
	
	// main documents, only to be edited by admins
	if ("main" == doc.type || "media" == doc.type || "translation" == doc.type) {
		requireRole("admin");
		channel("public");
	}
	
	// suggestion document, everybody can create these and has access to the ones created by himself
	else if ("suggestion" == doc.type) {
		var sugg_channel = "suggestion-" + doc.creator;
		if (!oldDoc) {
			access(doc.creator, sugg_channel);
			channel(["admin", sugg_channel);
		}
		else {
			requireAccess(["admin", sugg_channel])
		}
	}
	
	// unknown document type
	else {
		throw(forbidden: "Document type "+doc.type+" not permitted")
	}
}
