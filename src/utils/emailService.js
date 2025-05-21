import emailjs from 'emailjs-com';

// Initialize EmailJS with user ID
export const initEmailJS = () => {
  emailjs.init(import.meta.env.VITE_EMAILJS_USER_ID);
};

/**
 * Send an invoice via email
 * @param {Object} invoice - The invoice data
 * @param {Object} client - Client information
 * @param {string} client.name - Client name
 * @param {string} client.email - Client email
 * @param {Object} totals - Invoice totals
 * @returns {Promise} - Promise that resolves when email is sent
 */
export const sendInvoiceEmail = async (invoice, client, totals) => {
  try {
    const templateParams = {
      to_name: client.name,
      to_email: client.email,
      invoice_number: invoice.invoiceNumber,
      project_name: invoice.projectDetails.name,
      total_amount: totals.total.toFixed(2),
      due_date: invoice.dueDate,
      from_name: 'DesignBill'
    };

    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_ACCESSTOKEN
    );

    return response;
  } catch (error) {
    throw error;
  }
};