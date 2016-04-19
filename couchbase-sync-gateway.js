function (doc, oldDoc) {
	if (doc._deleted) {
		requireRole("admin");
		// skip other validation because a deletion has no other properties
		return;
	}
	
	// main documents, only to be edited by admins
	if ("main" == doc.type || "media" == doc.type || "category" == doc.type) {
		requireRole("admin");
		if ("main" == doc.type) {
			if (!doc.key || !doc.localizations || !doc.tags || 0 == doc.tags.length) {
				throw({forbidden: "Invalid main document, must have 'key', 'localizations' and at least one tag in 'tags'"})
			}
		}
		channel("public");
	}
	
	// suggestion document, everybody can create these and has access to the ones created by themselves
	else if ("suggestion" == doc.type) {
		if (!doc.author) {
			throw({forbidden: "Must have author"})
		}
		var sugg_channel = "suggestion-" + doc.author;
		if (!oldDoc) {
			requireUser(doc.author);
			access(doc.author, sugg_channel);
			channel("admin", sugg_channel);
		}
		else {
			requireAccess(["admin", sugg_channel]);
		}
	}
	
	// unknown document type
	else {
		throw({forbidden: "Document type '" + doc.type + "' not permitted"});
	}
}
