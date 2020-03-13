import { IArtwork } from "./artwork.model";

export interface IGallery {
	id: string;
	name: string;
	artworks?: IArtwork[];
}
