import { useParams } from "react-router-dom";

function InvoiceViewer(){

const {id} = useParams();

const invoices = JSON.parse(localStorage.getItem("invoices")) || [];

const invoice = invoices.find(inv => inv.invoiceNumber === id);

if(!invoice){

return <h2 style={{textAlign:"center"}}>Invoice not found</h2>;

}

return(

<div style={{padding:"40px",fontFamily:"Poppins"}}>

<h1>BillGenie</h1>

<h3>Invoice: {invoice.invoiceNumber}</h3>

<p><strong>Company:</strong> {invoice.company}</p>
<p><strong>Client:</strong> {invoice.client}</p>

<table border="1" cellPadding="10" style={{marginTop:"20px"}}>

<thead>

<tr>

<th>Item</th>
<th>Qty</th>
<th>Price</th>

</tr>

</thead>

<tbody>

{invoice.items.map((item,i)=>(

<tr key={i}>

<td>{item.name}</td>
<td>{item.quantity}</td>
<td>₹{item.price}</td>

</tr>

))}

</tbody>

</table>

<h2>Total: ₹{invoice.total}</h2>

</div>

);

}

export default InvoiceViewer;