import "./App.css";
import Dashboard from "./components/dashboard";
import logo from "./assets/billgenielogo.png";
import hero from "./assets/invoice-illustration.png";
import InvoiceForm from "./components/InvoiceForm";
import InvoiceViewer from "./components/InvoiceViewer";
import { useState,useEffect } from "react";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

const [darkMode,setDarkMode] = useState(false);

useEffect(()=>{

if(darkMode){
document.body.classList.add("dark");
}else{
document.body.classList.remove("dark");
}

},[darkMode]);

return(

<Router>

<Routes>

<Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode}/>}/>

<Route path="/invoice/:id" element={<InvoiceViewer/>}/>

</Routes>

</Router>

);

}

function Home({darkMode,setDarkMode}){

const scrollToInvoice = ()=>{

const section = document.getElementById("invoiceSection");

section.scrollIntoView({behavior:"smooth"});

};

return(

<div className="app">

<div className="aurora"></div>

<div className="blob"></div>
<div className="blob blob2"></div>
<div className="blob blob3"></div>
<div className="rupees">
  <span>₹</span>
  <span>₹</span>
  <span>₹</span>
  <span>₹</span>
  <span>₹</span>
  <span>₹</span>
  <span>₹</span>
  <span>₹</span>
  <span>₹</span>
  <span>₹</span>
  <span>₹</span>
  <span>₹</span>
</div>

<div className="hero">

<motion.div
className="heroText"
initial={{opacity:0,x:-80}}
animate={{opacity:1,x:0}}
transition={{duration:1}}
>

<img src={logo} className="logo"/>

<h1>BillGenie</h1>

<p>Create beautiful professional invoices instantly</p>

<div className="heroButtons">

<button className="ctaButton" onClick={scrollToInvoice}>
Generate Now
</button>

<button
onClick={()=>setDarkMode(!darkMode)}
className="modeToggle"
>
{darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
</button>

</div>

</motion.div>

<motion.img
src={hero}
className="heroImage"
initial={{opacity:0,x:80}}
animate={{opacity:1,x:0}}
transition={{duration:1}}
/>

</div>

<div id="invoiceSection">
<InvoiceForm/>
<Dashboard/>
</div>

</div>

);

}

export default App;