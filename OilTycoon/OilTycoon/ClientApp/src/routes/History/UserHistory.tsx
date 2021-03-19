import { Navigation, TitleArea } from '../../components/Reusables';

// HTML for user homepage
export function UserHistory() {

	let data: UserHistoryRowData[] = [
		{
			referenceNumber: '769560437',
			dateRequested: '01-06-2021',
			status: 'Processing',
			terms: 'Express',
			invoiceLink: '#'
		},
		{
			referenceNumber: '754264326',
			dateRequested: '12-28-2020',
			status: 'Finalized',
			terms: 'Standard',
			invoiceLink: '#'
		},
		{
			referenceNumber: '663256435',
			dateRequested: '10-27-2020',
			status: 'Finalized',
			terms: 'Standard',
			invoiceLink: '#'
		},
		{
			referenceNumber: '601345772',
			dateRequested: '09-04-2020',
			status: 'Cancelled',
			terms: 'Standard',
			invoiceLink: '#'
		},
		{
			referenceNumber: '455426347',
			dateRequested: '03-24-2020',
			status: 'Finalized',
			terms: 'Standard',
			invoiceLink: '#'
		}
	];

	return (
		<div id="logged-in">
			<TitleArea />

			<Navigation />
			<div id="main">
				<div className="ptitle">
					<p className="ptitle">Your Quote History</p>
				</div>
				<table id="history-table">
					<thead>
						<tr>
							<th>Reference Number</th>
							<th>Date Requested</th>
							<th>Status</th>
							<th>Terms</th>
							<th>Invoice</th>
						</tr>
					</thead>
					<tbody>
						{data.map(e => <UserHistoryRow key={e.referenceNumber} rowData={e} />)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

// temporary model to show sample code about how to do this
interface UserHistoryRowData {
	referenceNumber: string;
	dateRequested: string;
	status: string;
	terms: string;
	invoiceLink: string;
}

export function UserHistoryRow(props: { rowData: UserHistoryRowData }) {
	return (
		<tr>
			<td>{props.rowData.referenceNumber}</td>
			<td>{props.rowData.dateRequested}</td>
			<td>{props.rowData.status}</td>
			<td>{props.rowData.terms}</td>
			<td> <a href={props.rowData.invoiceLink}> <img src="static/pdf_png.png" alt={""} /> </a> </td>
		</tr>
	);
}