export interface IArtwork {
	id: string;
	galleryId?: string;
	title?: string;
	width?: number;
	height?: number;
	image?: string;
	file?: any;
	medium?: string;
	price?: number;
	sold: boolean;
	framed: boolean;
	recentlyupdatedimage: boolean;
}
