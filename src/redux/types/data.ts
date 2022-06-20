export interface SavePopupProps {
	title?: string;
	drawlName?: string;
	drawl?: string;
	time?: number;
	format?: string;

}

export interface DefaultPopupProps {
	title: string,
	desc?: string;
	cancelClass?: string,
	approveClass?: string,
	cancelText: string,
	approveText: string,
	approveBtnClass?: string,
	approve: () => void
}