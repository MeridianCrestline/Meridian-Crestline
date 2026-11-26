/**
 * Meridian Crestline Exports - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu on click of any nav link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Set current year in footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

/**
 * Pre-selects a product in the quote form and smoothly scrolls to it
 * @param {string} productName 
 */
function selectProductAndScroll(productName) {
    const productSelect = document.getElementById('productSelect');
    if (productSelect) {
        // Set value
        productSelect.value = productName;

        // Add a temporary highlight animation to the select element
        productSelect.classList.add('ring-2', 'ring-amber-400');
        setTimeout(() => {
            productSelect.classList.remove('ring-2', 'ring-amber-400');
        }, 1800);
    }

    const quoteSection = document.getElementById('quote-section');
    if (quoteSection) {
        quoteSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Handles the Export Quote Inquiry Form submission
 * @param {Event} e 
 */
function handleQuoteSubmit(e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const companyName = document.getElementById('companyName').value.trim();
    const businessEmail = document.getElementById('businessEmail').value.trim();
    const destinationCountry = document.getElementById('destinationCountry').value.trim();
    const product = document.getElementById('productSelect').value;
    const quantity = document.getElementById('requiredQuantity').value.trim() || 'Not specified (Need MOQ / Price Slab)';
    const additionalReq = document.getElementById('additionalReq').value.trim() || 'Standard export packaging and test certificate requested.';

    if (!fullName || !companyName || !businessEmail || !destinationCountry || !product) {
        showToast('Please fill in all required fields.', 'error');
        return;
    }

    // Construct email subject and body for the export inquiry
    const emailSubject = encodeURIComponent(`B2B Export Inquiry: ${product} - ${companyName} (${destinationCountry})`);
    const emailBody = encodeURIComponent(
        `DEAR MERIDIAN CRESTLINE EXPORTS TEAM,

I would like to request an official CIF/FOB quotation and technical specification sheet for the following export requirement:

---------------------------------------------------------
COMMODITY & BUYER SPECIFICATIONS
---------------------------------------------------------
Buyer / Contact Person: ${fullName}
Company Name:           ${companyName}
Business Email:         ${businessEmail}
Destination Country:    ${destinationCountry}
Product Required:       ${product}
Estimated Quantity:     ${quantity}

Additional Requirements / Port of Discharge / Packaging:
${additionalReq}

---------------------------------------------------------
Origin: India
Submitted via: meridiancrestlineexports.com
---------------------------------------------------------`
    );

    // Primary: info.meridiancrestlineexports@gmail.com, CC: meridiancrestlineexports@gmail.com
    const mailtoLink = `mailto:info.meridiancrestlineexports@gmail.com?cc=meridiancrestlineexports@gmail.com&subject=${emailSubject}&body=${emailBody}`;

    // Show visual confirmation toast
    showToast(`Thank you, ${fullName}! Launching email to info.meridiancrestlineexports@gmail.com...`, 'success');

    // Trigger the email client after a small delay
    setTimeout(() => {
        window.location.href = mailtoLink;
    }, 600);
}

/**
 * Shows a toast message
 * @param {string} message 
 * @param {'success'|'error'} type 
 */
function showToast(message, type = 'success') {
    const toast = document.getElementById('toastNotification');
    const toastMsg = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');

    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;

    if (type === 'error') {
        toast.className = 'fixed bottom-6 right-6 z-50 bg-red-900 border border-red-500 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all duration-300 opacity-100 translate-y-0';
        if (toastIcon) toastIcon.textContent = '⚠️';
    } else {
        toast.className = 'fixed bottom-6 right-6 z-50 bg-forest-900 border border-amberGold-400 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all duration-300 opacity-100 translate-y-0';
        if (toastIcon) toastIcon.textContent = '✅';
    }

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-4');
        setTimeout(() => {
            toast.className = 'fixed bottom-6 right-6 z-50 pointer-events-none opacity-0 translate-y-4';
        }, 300);
    }, 5000);
}
