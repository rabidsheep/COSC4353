import { Navigation, TitleArea } from '../../components/Reusables';

// HTML for user homepage
export function UserHistory() {
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
						<tr>
							<td>769560437</td>
							<td>01-06-2021</td>
							<td>Processing</td>
							<td>Express</td>
							<td> <a href="#"> <img src="static/pdf_png.png" alt={""} /> </a> </td>
						</tr>
						<tr>
							<td>754264326</td>
							<td>12-28-2020</td>
							<td>Finalized</td>
							<td>Standard</td>
							<td> <a href="#"> <img src="static/pdf_png.png" alt={""} /> </a> </td>
						</tr>
						<tr>
							<td>663256435</td>
							<td>10-27-2020</td>
							<td>Finalized</td>
							<td>Standard</td>
							<td> <a href="#"> <img src="static/pdf_png.png" alt={""} /> </a> </td>
						</tr>
						<tr>
							<td>601345772</td>
							<td>09-04-2020</td>
							<td>Cancelled</td>
							<td>Standard</td>
							<td> <a href="#"> <img src="static/pdf_png.png" alt={""} /> </a> </td>
						</tr>
						<tr>
							<td>455426347</td>
							<td>03-24-2020</td>
							<td>Finalized</td>
							<td>Standard</td>
							<td> <a href="#"> <img src="static/pdf_png.png" alt={""} /> </a> </td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}