// script.js - Sneha SP FSSAI Portal Logic

// --- 1. Data Initialization (Local Storage) ---
let vendors = JSON.parse(localStorage.getItem('sneha_vendors')) || [];
let inspections = JSON.parse(localStorage.getItem('sneha_inspections')) || [];
let complaints = JSON.parse(localStorage.getItem('sneha_complaints')) || [];

// --- 2. Navigation Logic ---
function switchView(viewId) {
    document.querySelectorAll('.section-view').forEach(el => el.classList.remove('active-view'));
    document.getElementById(viewId).classList.add('active-view');
    updateUI();
}

// --- 3. Form Submission Logic ---
// Add Vendor
document.getElementById('vendorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const newVendor = {
        name: document.getElementById('vName').value,
        license: document.getElementById('vLicense').value,
        contact: document.getElementById('vContact').value,
        category: document.getElementById('vCategory').value
    };
    vendors.push(newVendor);
    localStorage.setItem('sneha_vendors', JSON.stringify(vendors));
    this.reset();
    updateUI();
    alert("Vendor Registered Successfully!");
});

// Add Inspection
document.getElementById('inspectionForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Check if a valid vendor was selected
    if (document.getElementById('iVendor').value === "") {
        alert("Please register and select a valid vendor first!");
        return;
    }

    const newInspection = {
        vendor: document.getElementById('iVendor').value,
        date: document.getElementById('iDate').value,
        status: document.getElementById('iStatus').value,
        remarks: document.getElementById('iRemarks').value
    };
    inspections.push(newInspection);
    localStorage.setItem('sneha_inspections', JSON.stringify(inspections));
    this.reset();
    updateUI();
    alert("Inspection Logged Successfully!");
});

// Add Complaint
document.getElementById('complaintForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const newComplaint = {
        name: document.getElementById('cName').value,
        date: document.getElementById('cDate').value,
        details: document.getElementById('cDetails').value,
        status: 'Pending'
    };
    complaints.push(newComplaint);
    localStorage.setItem('sneha_complaints', JSON.stringify(complaints));
    this.reset();
    updateUI();
    alert("Complaint Filed Successfully!");
});

// --- 4. UI Update Logic (Render Tables, Dropdowns & Dashboard) ---
function updateUI() {
    // Update Dashboard Counts
    document.getElementById('vendorCount').innerText = vendors.length;
    document.getElementById('inspectionCount').innerText = inspections.length;
    document.getElementById('complaintCount').innerText = complaints.length;

    // Render Vendor Table
    const vTable = document.getElementById('vendorTableBody');
    vTable.innerHTML = '';
    vendors.forEach(v => {
        vTable.innerHTML += `<tr><td>${v.name}</td><td>${v.license}</td><td>${v.contact}</td><td>${v.category}</td></tr>`;
    });

    // Safely Populate Inspection Dropdown
    const iDropdown = document.getElementById('iVendor');
    iDropdown.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    if (vendors.length === 0) {
        defaultOption.textContent = "⚠️ Please register a vendor first";
        defaultOption.disabled = true;
        defaultOption.selected = true;
    } else {
        defaultOption.textContent = "Select a registered vendor...";
    }
    iDropdown.appendChild(defaultOption);

    vendors.forEach(v => {
        const opt = document.createElement('option');
        opt.value = v.name;
        opt.textContent = `${v.name} (License: ${v.license})`;
        iDropdown.appendChild(opt);
    });

    // Render Inspection Table
    const iTable = document.getElementById('inspectionTableBody');
    iTable.innerHTML = '';
    inspections.forEach(i => {
        let badge = i.status === 'Pass' ? 'bg-success' : i.status === 'Warning' ? 'bg-warning text-dark' : 'bg-danger';
        iTable.innerHTML += `<tr><td>${i.vendor}</td><td>${i.date}</td><td><span class="badge ${badge}">${i.status}</span></td><td>${i.remarks}</td></tr>`;
    });

    // Render Complaint Table
    const cTable = document.getElementById('complaintTableBody');
    cTable.innerHTML = '';
    complaints.forEach((c, index) => {
        cTable.innerHTML += `<tr><td>${c.name}</td><td>${c.date}</td><td>${c.details}</td>
        <td><button class="btn btn-sm btn-outline-danger" onclick="resolveComplaint(${index})">Mark Resolved</button></td></tr>`;
    });
}

// Feature: Resolve Complaints
function resolveComplaint(index) {
    if (confirm("Are you sure you want to mark this as resolved and remove it?")) {
        complaints.splice(index, 1);
        localStorage.setItem('sneha_complaints', JSON.stringify(complaints));
        updateUI();
    }
}

// Initialize UI on first load
updateUI();