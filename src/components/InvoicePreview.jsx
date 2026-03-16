import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function InvoicePreview({ invoiceData }) {

  const subtotal = invoiceData.items.reduce(
    (sum,item)=> sum + item.qty * item.price,
    0
  );

  const downloadPDF = () => {

    const input = document.getElementById("invoice");

    html2canvas(input).then((canvas)=>{

      const img = canvas.toDataURL("image/png");

      const pdf = new jsPDF();

      pdf.addImage(img,"PNG",10,10,180,0);

      pdf.save("BillGenie-Invoice.pdf");

    });
  };

  return (

    <div className="preview">

      <div id="invoice" className="invoice">

        <h2>BillGenie Invoice</h2>

        <p><b>Company:</b> {invoiceData.company}</p>
        <p><b>Client:</b> {invoiceData.client}</p>

        <table>

          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>

          {invoiceData.items.map((item,i)=>(
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>₹{item.price}</td>
            </tr>
          ))}

          </tbody>

        </table>

        <h3>Total: ₹{subtotal}</h3>

      </div>

      <button onClick={downloadPDF}>
        Download Invoice PDF
      </button>

    </div>
  );
}

export default InvoicePreview;