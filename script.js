let records = JSON.parse(localStorage.getItem("records")) || [];
let openingBalance = parseFloat(localStorage.getItem("openingBalance")) || 0;

function save(){
    localStorage.setItem("records", JSON.stringify(records));
    localStorage.setItem("openingBalance", openingBalance);
}

/* SET OPENING BALANCE */
function setOpening(){
    openingBalance = parseFloat(document.getElementById("opening").value) || 0;
    save();
    render();
}

/* ADD TRANSACTION */
function addTransaction(){

    const name = document.getElementById("name").value;
    const gender = document.getElementById("gender").value;
    const type = document.getElementById("type").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const date = document.getElementById("date").value;

    if(!name || !amount || !date){
        alert("Fill all fields");
        return;
    }

    records.push({name, gender, type, amount, date});

    save();
    render();
}

/* RENDER TABLE */
function render(){

    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    let balance = openingBalance;

    tbody.innerHTML += `
    <tr>
        <td colspan="5"><b>Opening Balance</b></td>
        <td>₹ ${openingBalance}</td>
    </tr>`;

    records.forEach(r => {

        if(r.type === "Credit") balance += r.amount;
        else balance -= r.amount;

        tbody.innerHTML += `
        <tr>
            <td>${r.name}</td>
            <td>${r.gender}</td>
            <td>${r.date}</td>
            <td class="${r.type==='Credit'?'credit':'debit'}">${r.type}</td>
            <td>₹ ${r.amount}</td>
            <td>₹ ${balance}</td>
        </tr>`;
    });

    document.getElementById("balance").innerText = balance;
}

/* CLEAR ALL */
function clearAll(){
    if(confirm("Delete all data?")){
        records=[];
        openingBalance=0;
        save();
        render();
    }
}

/* EXPORT TO EXCEL */
function downloadExcel(){

    let csv = "Name,Gender,Date,Type,Amount\n";

    records.forEach(r=>{
        csv += `${r.name},${r.gender},${r.date},${r.type},${r.amount}\n`;
    });

    const blob = new Blob([csv], {type:"text/csv"});
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "passbook.csv";
    link.click();
}

render();
