class Pricing {
    constructor() {
        this.currentPrice = 1.50; // Current price per gallon
        this.locationFactors = {
            'TX': 0.02, // Location factor for Texas
            'outOfState': 0.04 // Location factor for out of state
        };
        this.rateHistoryFactors = {
            'hasHistory': 0.01, // Rate history factor if client has history
            'noHistory': 0 // Rate history factor if no history
        };
        this.gallonsRequestedFactors = {
            'moreThan1000': 0.02, // Gallons requested factor if more than 1000 gallons
            'lessThanOrEqual1000': 0.03 // Gallons requested factor if less than or equal to 1000 gallons
        };
        this.companyProfitFactor = 0.10; // Company profit factor
    }

    calculatePricePerGallon(gallonsRequested, location, hasHistory) {
        const locationFactor = location === 'TX' ? this.locationFactors['TX'] : this.locationFactors['outOfState'];
        const rateHistoryFactor = hasHistory ? this.rateHistoryFactors['hasHistory'] : this.rateHistoryFactors['noHistory'];
        const gallonsRequestedFactor = gallonsRequested > 1000 ? this.gallonsRequestedFactors['moreThan1000'] : this.gallonsRequestedFactors['lessThanOrEqual1000'];
        const margin = (this.currentPrice * (locationFactor - rateHistoryFactor + gallonsRequestedFactor + this.companyProfitFactor)).toFixed(2);
        const suggestedPricePerGallon = (this.currentPrice + parseFloat(margin)).toFixed(2);
        return parseFloat(suggestedPricePerGallon);
    }

    calculateTotalPrice(gallonsRequested, location, hasHistory) {
        const pricePerGallon = this.calculatePricePerGallon(gallonsRequested, location, hasHistory);
        return parseFloat(gallonsRequested) * pricePerGallon;
    }
}

module.exports = Pricing;
