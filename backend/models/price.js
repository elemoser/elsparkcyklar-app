
const Price = require("../orm/model-router.js")("price");

const price = {
    /**
     * @description Getting all Prices from sqlite db
     */
    getPrices: async function getPrices(req, res) {
        try {
            const prices = await Price.findAll();

            return res.json({ price: prices });
        } catch (err) {
            console.error("Error in getPrices:", err);
            return res.status(500).json({ err: err.message });
        }
    },

    /**
     * @description Get specific priceType based on ID
     */
    getPriceType: async function getPriceType(req, res, price_id) {
        try {
            const priceType = await Price.findByPk(price_id);

            if (!priceType) {
                return res.status(404).json({ error: "No matching id" });
            }

            return res.json({ price: priceType });
        } catch (err) {
            console.error("Error in getPrices:", err);
            return res.status(500).json({ err: err.message });
        }
    },

    /**
     * @description Create new priceType
     *
     */
    createPriceType: async function createPriceType(req, res) {
        try {
            /* Hämta attribut från req.body */
            let {
                id,
                start_fee,
                cost_per_minute,
                free_parking_fee,
                start_free_park_discount
            } = req.body;

            if (!id) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            start_fee = start_fee || 20.00
            cost_per_minute = cost_per_minute || 3.00
            free_parking_fee = free_parking_fee || 20.00
            start_free_park_discount = start_free_park_discount || 0.5

            const tableContent = [
                start_fee,
                cost_per_minute,
                free_parking_fee,
                start_free_park_discount
            ];

            for (const element of tableContent) {
                if (isNaN(element) || element === null || element === undefined) {
                    return res.status(400).json({ error: "Values must be floats" });
                }
            }

            const newPrice = await Price.create({
                id: parseInt(id),
                start_fee: parseFloat(start_fee),
                cost_per_minute: parseFloat(cost_per_minute),
                free_parking_fee: parseFloat(free_parking_fee),
                start_free_park_discount: parseFloat(start_free_park_discount),
            });

            res.status(200).json({ message: "Price created successfully", price: newPrice });

        } catch (err) {
            console.error("Error in createUser:", err);
            res.status(500).json({ error: err.message });
        }
    },

    /**
     * @description Uppdatera pristyp
     *
     */
    updatePriceType: async function updatePriceType(req, res, price_id) {
        try {
            /* Kontrollera om fakturan finns via primary key (PK) */
            const existingPrice = await Price.findByPk(price_id);

            if (!existingPrice) {
                return res.status(404).json({ error: "PriceType doesn't exist" });
            }

            /* Hämta attribut från req.body */
            let {
                start_fee,
                cost_per_minute,
                free_parking_fee,
                start_free_park_discount
            } = req.body;

            start_fee = start_fee || existingPrice.start_fee;
            cost_per_minute = cost_per_minute || existingPrice.cost_per_minute;
            free_parking_fee = free_parking_fee || existingPrice.free_parking_fee;
            start_free_park_discount = start_free_park_discount || existingPrice.start_free_park_discount;

            const tableContent = [
                start_fee,
                cost_per_minute,
                free_parking_fee,
                start_free_park_discount
            ];

            for (const element of tableContent) {
                if (isNaN(element) || element === null || element === undefined) {
                    return res.status(400).json({ error: "Values must be floats" });
                }
            }

            await existingPrice.update({
                start_fee: parseFloat(start_fee),
                cost_per_minute: parseFloat(cost_per_minute),
                free_parking_fee: parseFloat(free_parking_fee),
                start_free_park_discount: parseFloat(start_free_park_discount),
            });

            res.status(200).json({ message: "Price updated successfully" });
        } catch (err) {
            console.error("Error in updatePrice:", err);
            res.status(500).json({ error: err.message });
        }
    },

    /**
     * @description Delete priceType
     *
     */
    deletePriceType: async function deletePriceType(req, res, price_id) {
        try {
            /* Kontrollera om fakturan finns */
            const existingPrice = await Price.findByPk(price_id);

            if (!existingPrice) {
                return res.status(404).json({ error: "Price doesn't exist" });
            }

            await existingPrice.destroy();

            res.status(200).json({ message: "Price successfully deleted" });
        } catch (err) {
            console.error("Error in deletePrice:", err);
            res.status(500).json({ error: err.message });
        }
    },
}

module.exports = price;