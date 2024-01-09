const Invoice = require("../orm/model-router.js")("invoice");

const invoice = {
    /**
     * @description Getting all invoices from sqlite db
     */
    getInvoices: async function getInvoices(req, res) {
        try {
            const invoices = await Invoice.findAll();

            return res.json({ invoice: invoices });
        } catch (err) {
            console.error("Error in getInvoices:", err);
            return res.status(500).json({ err: err.message });
        }
    },

    /**
     * @description Get specific invoice
     *
     */
    getSpecificInvoice: async function getSpecificInvoice(
        req,
        res,
        invoice_id
    ) {
        try {
            const specInvoice = await Invoice.findByPk(invoice_id);

            if (!specInvoice) {
                return res.status(404).json({ error: "No matching id" });
            }

            return res.json({ invoice: specInvoice });
        } catch (err) {
            console.error("Error in getSpecificInvoice:", err);
            return res.status(500).json({ err: err.message });
        }
    },

    /**
     * @description Uppdatera faktura (pris)
     *
     */
    updateInvoice: async function updateInvoice(req, res, invoice_id) {
        try {
            /* Kontrollera om fakturan finns via primary key (PK) */
            const existingInvoice = await Invoice.findByPk(invoice_id);

            if (!existingInvoice) {
                return res.status(404).json({ error: "Invoice doesn't exist" });
            }

            let price = req.body.total_price || existingInvoice.total_price;
            let status = req.body.status || existingInvoice.status;

            const validStatus = ["pending", "payed"];

            if (!validStatus.includes(status)) {
                return res.status(400).json({
                    error: `'status' must be one of: ${validStatus.join(", ")}`,
                });
            }

            if (isNaN(price) || price === null || price === undefined) {
                return res
                    .status(400)
                    .json({ error: "Price must be a number" });
            }

            await existingInvoice.update({
                total_price: parseFloat(price),
                status: status,
            });

            res.status(200).json({ message: "Invoice updated successfully" });
        } catch (err) {
            console.error("Error in updateInvoice:", err);
            res.status(500).json({ error: err.message });
        }
    },

    /**
     * @description Delete Invoice
     *
     */
    deleteInvoice: async function deleteInvoice(req, res, invoice_id) {
        try {
            /* Kontrollera om fakturan finns */
            const existingInvoice = await Invoice.findByPk(invoice_id);

            if (!existingInvoice) {
                return res.status(404).json({ error: "Invoice doesn't exist" });
            }

            await existingInvoice.destroy();

            res.status(200).json({ message: "Invoice successfully deleted" });
        } catch (err) {
            console.error("Error in deleteInvoice:", err);
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = invoice;
