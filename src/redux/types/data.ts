export interface SavePopupProps {
	title?: string;
	desc?: string;
	drawlName?: string;
	drawl: string;
	time: Time;
	format: string;

}

export interface Time {
	hours: number;
	minutes: number;
	seconds: number;
}