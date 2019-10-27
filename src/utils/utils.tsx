import { omitBy } from "lodash/fp";

export const scrubMetaData = (apolloObject: any) => {
	const scrubbedObject = omitBy(
		(value, key) => key.startsWith("__"),
		apolloObject,
	);
	return scrubbedObject;
};
