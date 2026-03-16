import { useState } from "react";
import jsPDF from "jspdf";
import { QRCodeCanvas } from "qrcode.react";

function InvoiceForm() {

const [showPreview,setShowPreview] = useState(false);
const [showBurst,setShowBurst] = useState(false);
const [loading,setLoading] = useState(false);
const [company,setCompany] = useState("");
const [client,setClient] = useState("");
const [gst,setGst] = useState(18);
const [customerPhone,setCustomerPhone] = useState("");
const [pdfLink,setPdfLink] = useState("");
const [invoiceNumber,setInvoiceNumber] = useState("");
const invoiceLink = `${window.location.origin}/invoice/${invoiceNumber}`;

const generateInvoiceNumber = () => {

const last = localStorage.getItem("invoiceNumber");

let newNumber = last ? Number(last) + 1 : 1001;

localStorage.setItem("invoiceNumber", newNumber);

return `INV-${newNumber}`;

};

const [items,setItems] = useState([
{ name:"", quantity:1, price:0 }
]);

const addItem = () => {
setItems([...items,{name:"",quantity:1,price:0}]);
};
const removeItem = (index) => {

const updated = items.filter((_,i)=> i !== index);

setItems(updated);

};
const handleItemChange = (index,field,value) => {

const updated = [...items];
updated[index][field] = value;

setItems(updated);

};

const subtotal = items.reduce(
(acc,item)=> acc + Number(item.price) * Number(item.quantity),
0
);

const gstAmount = subtotal * gst / 100;

const cgst = gstAmount / 2;
const sgst = gstAmount / 2;

const total = subtotal + gstAmount;

const upiID = "yourupi@okaxis";

const upiPaymentLink =
`upi://pay?pa=${upiID}&pn=BillGenie&am=${total}&cu=INR`;

const generateInvoice = () => {

setLoading(true);

setTimeout(()=>{

const newInvoice = generateInvoiceNumber();
setInvoiceNumber(newInvoice);

setShowPreview(true);
setLoading(false);

setShowBurst(true);

setTimeout(()=>{
setShowBurst(false);
},2000);

},1200);

};



const downloadInvoice = () => {

const doc = new jsPDF();

doc.setFontSize(26);
doc.text("BillGenie",20,20);

doc.setFontSize(12);

doc.text(`Invoice: ${invoiceNumber}`,150,20);
doc.text(`Date: ${new Date().toLocaleDateString()}`,150,30);

doc.text(`Company: ${company}`,20,40);
doc.text(`Client: ${client}`,20,50);

doc.line(20,60,190,60);

let y = 70;

doc.text("Item",20,y);
doc.text("Qty",100,y);
doc.text("Price",130,y);
doc.text("Total",160,y);

y+=10;

items.forEach((item)=>{

const itemTotal = item.price * item.quantity;

doc.text(item.name,20,y);
doc.text(String(item.quantity),100,y);
doc.text(`Rs ${item.price}`,130,y);
doc.text(`Rs ${itemTotal}`,160,y);

y+=10;

});

doc.line(20,y,190,y);

y+=10;

doc.text(`Subtotal: Rs ${subtotal}`,130,y);

y+=10;

doc.text(`CGST: Rs ${cgst}`,130,y);

y+=10;

doc.text(`SGST: Rs ${sgst}`,130,y);

y+=10;

doc.setFontSize(14);
doc.text(`Total: Rs ${total}`,130,y);

const pdfBlob = doc.output("blob");

const pdfUrl = URL.createObjectURL(pdfBlob);
setPdfLink(pdfUrl);
const link = document.createElement("a");
link.href = pdfUrl;
link.download = `BillGenie-${invoiceNumber}.pdf`;
link.click();

};



const saveInvoice = () => {

const invoiceData = {
invoiceNumber,
company,
client,
items,
total,
date:new Date()
};

const existing = JSON.parse(localStorage.getItem("invoices")) || [];

existing.push(invoiceData);

localStorage.setItem("invoices", JSON.stringify(existing));

alert("Invoice saved!");

};



return(

<div className="invoiceForm">

{showBurst && (
<div className="rupeeBurst">
<span>₹</span>
<span>₹</span>
<span>₹</span>
<span>₹</span>
<span>₹</span>
<span>₹</span>
<span>₹</span>
<span>₹</span>
</div>
)}

<h2>Create Invoice</h2>

<input
placeholder="Company Name"
value={company}
onChange={(e)=>setCompany(e.target.value)}
/>

<input
placeholder="Client Name"
value={client}
onChange={(e)=>setClient(e.target.value)}
/>
<input
type="text"
placeholder="Customer Mobile Number"
value={customerPhone}
onChange={(e)=>setCustomerPhone(e.target.value)}
/>
<h3>Items</h3>
<div className="itemHeader">

<span>Item</span>
<span>Qty</span>
<span>Price</span>
<span>Action</span>

</div>

{items.map((item,index)=>(

<div key={index} className="itemRow">

<input
placeholder="Item Name"
value={item.name}
onChange={(e)=>handleItemChange(index,"name",e.target.value)}
/>

<input
type="number"
placeholder="Qty"
value={item.quantity}
onChange={(e)=>handleItemChange(index,"quantity",e.target.value)}
/>

<input
type="number"
placeholder="Price"
value={item.price}
onChange={(e)=>handleItemChange(index,"price",e.target.value)}
/>

<button
className="removeItemBtn"
onClick={()=>removeItem(index)}
>
❌
</button>

</div>

))}

<button onClick={addItem} className="addItemBtn">
Add Item
</button>


<input
type="number"
placeholder="GST %"
value={gst}
onChange={(e)=>setGst(e.target.value)}
/>


<div className="totals">

<p>Subtotal: ₹{subtotal}</p>

<p>CGST ({gst/2}%): ₹{cgst}</p>

<p>SGST ({gst/2}%): ₹{sgst}</p>

<p>Total GST: ₹{gstAmount}</p>

<h3>Total: ₹{total}</h3>

</div>
<div style={{marginTop:"25px",textAlign:"center"}}>

<h4>Scan & Pay via UPI</h4>

<QRCodeCanvas
value={upiPaymentLink}
size={140}
/>

<p style={{marginTop:"10px"}}>
Scan to pay ₹{total}
</p>
<button
className="payBtn"
onClick={()=>window.open(upiPaymentLink)}
>
Pay Now
</button>
</div>


<button onClick={generateInvoice} className="generateBtn">

{loading ? (
<>
Generating
<span className="spinner"></span>
</>
) : (
"Generate Invoice"
)}

</button>

<button onClick={saveInvoice} className="saveBtn">
Save Invoice
</button>

{showPreview && (

<div className="invoicePreview">

<h2>Invoice Preview</h2>

<div className="invoiceCard">

<div className="invoiceHeader">

<h1>BillGenie</h1>

<p><strong>{invoiceNumber}</strong></p>

<p>{new Date().toLocaleDateString()}</p>

</div>


<div className="invoiceDetails">

<p><strong>Company:</strong> {company}</p>
<p><strong>Client:</strong> {client}</p>

</div>


<table className="invoiceTable">

<thead>
<tr>
<th>Item</th>
<th>Qty</th>
<th>Price</th>
<th>Total</th>
</tr>
</thead>

<tbody>

{items.map((item,i)=>(

<tr key={i}>
<td>{item.name}</td>
<td>{item.quantity}</td>
<td>₹{item.price}</td>
<td>₹{item.price * item.quantity}</td>
</tr>

))}

</tbody>

</table>


<div className="invoiceTotals">

<p>Subtotal: ₹{subtotal}</p>
<p>CGST: ₹{cgst}</p>
<p>SGST: ₹{sgst}</p>
<p>Total GST: ₹{gstAmount}</p>

<h3>Total: ₹{total}</h3>

</div>


<button
className="downloadBtn"
onClick={downloadInvoice}
>
Download PDF
</button>
<button
onClick={()=>{
    if(!customerPhone){
alert("Please enter customer mobile number");
return;
}
const message = `Hello! Your invoice is ready. View here: ${invoiceLink}`;
window.open(`https://wa.me/${customerPhone}?text=${encodeURIComponent(message)}`);
}}
>
Share via WhatsApp
</button>
</div>

</div>

)}

</div>


);


}

export default InvoiceForm;