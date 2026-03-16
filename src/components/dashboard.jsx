import { useState, useEffect } from "react";
import "./dashboard.css";

function Dashboard() {

const [invoices,setInvoices] = useState([]);

useEffect(() => {

const stored = JSON.parse(localStorage.getItem("invoices")) || [];
setInvoices(stored);

},[]);


const deleteInvoice = (index) => {

const updated = invoices.filter((_,i)=> i !== index);

setInvoices(updated);

localStorage.setItem("invoices", JSON.stringify(updated));

};


return (

<div className="dashboard">

<h2>Saved Invoices</h2>

{invoices.length === 0 ? (

<p>No invoices created yet.</p>

) : (

<table>

<thead>
<tr>
<th>Company</th>
<th>Client</th>
<th>Total</th>
<th>Date</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{invoices.map((inv,index)=> (

<tr key={index}>

<td>{inv.company}</td>

<td>{inv.client}</td>

<td>₹{inv.total}</td>

<td>{new Date(inv.date).toLocaleDateString()}</td>

<td>

<button
className="deleteBtn"
onClick={()=>deleteInvoice(index)}
>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

)}

</div>

);

}

export default Dashboard;