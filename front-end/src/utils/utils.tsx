import { omitBy } from "lodash/fp";

export const scrubMetaData = (apolloObject: any) => {
	const scrubbedObject = omitBy(
		(value, key) => key.startsWith("__") || key === "file",
		apolloObject,
	);
	return scrubbedObject;
};

export const scrubGallery = (apolloGallery: any) => {
	const scrubbedObject = omitBy(
		(value, key) =>
			key.startsWith("__") ||
			key === "file" ||
			key === "artworks",
		apolloGallery,
	);
	return scrubbedObject;
};
