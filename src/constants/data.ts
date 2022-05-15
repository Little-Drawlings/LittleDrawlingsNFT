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

export const hexToRGB = (hex: string, alpha: number) => {
	const r = parseInt(hex.slice(1, 3), 16),
		g = parseInt(hex.slice(3, 5), 16),
		b = parseInt(hex.slice(5, 7), 16);

	if (alpha) {
		return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
	} else {
		return 'rgb(' + r + ', ' + g + ', ' + b + ')';
	}
};

export const rgbaToHex = (orig: string) => {
	let a,
		isPercent,
		rgb: any = orig
			.replace(/\s/g, '')
			.match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
		alpha = ((rgb && rgb[4]) || '').trim(),
		hex = rgb
			? (rgb[1] | (1 << 8)).toString(16).slice(1) +
			  (rgb[2] | (1 << 8)).toString(16).slice(1) +
			  (rgb[3] | (1 << 8)).toString(16).slice(1)
			: orig;

	if (alpha !== '') {
		a = alpha;
	} else {
		a = 0o1;
	}
	// multiply before convert to HEX
	a = ((a * 255) | (1 << 8)).toString(16).slice(1);
	hex = hex + a;

	return hex;
};
