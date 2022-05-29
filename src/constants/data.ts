export const FORMATS = {
	RECTANGLE: '16:9',
	SQUARE: '1:1',
	SMALL_RECTANGLE: '4:3',
	FLIPPED_RECTANGLE: '9:16',
};

export const COLORS = [
	'#FF99F8',
	'#FFEE00',
	'#86FA16',
	'#6FFFF6',
	'#B38FFF',
	'#FFAE4F',
	'#979797',
];

export const INSTRUMENTS = {
	PENCIL: 'PENCIL',
	PENCIL_BRUSH: 'PENCIL_BRUSH',
	FILLING: 'FILLING',
	ERASER: 'ERASER',
};

export const DRAWLS_SORT_VALUES = [{
	label: "Newest first",
	value: "new"
}, {
	label: "Oldest first",
	value: "old"
}]

export async function dataUrlToFile(dataUrl: string, fileName: string, type: string): Promise<File> {
	const res: Response = await fetch(dataUrl);
	const blob: Blob = await res.blob();
	return new File([blob], fileName, { type: type });
}