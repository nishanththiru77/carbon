export interface CarbonData {
  transportation: {
    milesPerMonth: number;
    mode: 'car' | 'bike' | 'public_transport';
  };
  electricity: number; // kWh
  flights: number; // hours per year
  foodPreference: 'vegetarian' | 'non-vegetarian' | 'vegan';
  householdSize: number;
}

export const calculateFootprint = (data: CarbonData) => {
  // Rough CO2 emission factors (kg CO2)
  const factors = {
    car: 0.17, // per km (average car)
    bike: 0.01,
    public_transport: 0.05,
    electricity: 0.4, // per kWh
    flight: 250, // per hour
    food: {
      vegan: 150, // monthly avg
      vegetarian: 250,
      'non-vegetarian': 450,
    }
  };

  const transportEmissions = data.transportation.milesPerMonth * factors[data.transportation.mode];
  const electricityEmissions = (data.electricity * factors.electricity) / data.householdSize;
  const flightEmissions = (data.flights * factors.flight) / 12; // monthly
  const foodEmissions = factors.food[data.foodPreference];

  const total = transportEmissions + electricityEmissions + flightEmissions + foodEmissions;

  return {
    total: Math.round(total),
    breakdown: [
      { name: 'Transport', value: Math.round(transportEmissions) },
      { name: 'Electricity', value: Math.round(electricityEmissions) },
      { name: 'Travel', value: Math.round(flightEmissions) },
      { name: 'Food', value: Math.round(foodEmissions) },
    ]
  };
};
