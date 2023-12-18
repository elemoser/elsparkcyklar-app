const Price = require("../orm/model-router.js")("price");

const price = {
    /**
     * @description Get price type
     */
    getPriceType: async function getPriceType(req, res) {
        try {
            const priceType = await Price.findByPk(1);

            return res.json({ price: priceType });
        } catch (err) {
            console.error("Error in getPrices:", err);
            return res.status(500).json({ err: err.message });
        }
    },

    /**
     * @description Uppdatera pristyp
     *
     */
    updatePriceType: async function updatePriceType(req, res) {
        try {
            /* Kontrollera om fakturan finns via primary key (PK) */
            const existingPrice = await Price.findByPk(1);

            /* Hämta attribut från req.body */
            let {
                start_fee,
                cost_per_minute,
                free_parking_fee,
                start_free_park_discount,
            } = req.body;

            start_fee = start_fee || existingPrice.start_fee;
            cost_per_minute = cost_per_minute || existingPrice.cost_per_minute;
            free_parking_fee =
                free_parking_fee || existingPrice.free_parking_fee;
            start_free_park_discount =
                start_free_park_discount ||
                existingPrice.start_free_park_discount;

            const tableContent = [
                start_fee,
                cost_per_minute,
                free_parking_fee,
                start_free_park_discount,
            ];

            for (const element of tableContent) {
                if (
                    isNaN(element) ||
                    element === null ||
                    element === undefined
                ) {
                    return res
                        .status(400)
                        .json({ error: "Values must be floats" });
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
};

module.exports = price;
