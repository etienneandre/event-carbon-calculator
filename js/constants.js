// ============================================================================
// EVENT CARBON CALCULATOR — CONSTANTS
// All emissions factors, distance-calculation rules, colors and climate
// context figures used by the calculator, with their sources.
// ============================================================================

// ----------------------------------------------------------------------------
// MEALS — kg CO2e per meal
// (User-defined values, kept as provided)
// ----------------------------------------------------------------------------
const MEAL_FACTORS = {
    vegan: 0.39,
    vegetarian: 0.51,
    whiteMeat: 1.58,
    redMeat: 7.26,
    pescetarian: 1.55,
};
const COFFEE_TEA_BREAK_FACTOR = 0.313; // kg CO2e per coffee/tea break

// ----------------------------------------------------------------------------
// TRANSPORT — emission factor per passenger-km, in g CO2e/passenger-km.
// These are applied to the *adjusted* distance (see DISTANCE_MULTIPLIERS
// below), not directly to the great-circle ("as the crow flies") distance
// the user enters.
// Sources:
//  - car / carpool: as provided (carpool = car ÷ 2 occupants)
//  - trainTGV: French TGV, full lifecycle (usage + manufacturing +
//    maintenance) — SNCF Voyageurs "périmètre complet" order of magnitude
//  - trainWestEurope: European Environment Agency (EEA), well-to-wheel
//    EU rail average (~33 gCO2/pkm) — used as a stand-in for a "typical"
//    Western-European train, higher than the French TGV because of less
//    decarbonized national grids and more diesel regional lines
//  - ferry: European Environment Agency estimate (~60 gCO2/passenger-km),
//    as cited by Vert.eco; not covered by the Labos1point5 methodology
//    (see DISTANCE_MULTIPLIERS note on ferry)
//  - airShort/airMedium/airLong: as provided (distance-banded factors)
// ----------------------------------------------------------------------------
const TRANSPORT_FACTORS = {
    walk: 0,
    bike: 5,
    car: 215.6,
    carpool: 107.8,
    ferry: 138,
    trainTGV: 3.3,
    trainWestEurope: 16,
    airShort: 258.6,
    airMedium: 187.5,
    airLong: 152,
};

// ----------------------------------------------------------------------------
// DISTANCE ADJUSTMENT — Labos1point5 "travels simulator" methodology
// https://apps.labos1point5.org/travels-simulator
//
// Quote (site, "Understand calculation"):
//   "Calculation of the distance as the crow flies between the city of
//    departure and the city of destination [...]. To these distances as
//    the crow flies, we apply the following multiplying factors: 1.3 for
//    car travel, 1.2 for train and suburban train, 1.7 for metro, 1.5 for
//    bus and tram. For air travel, 95km is added to the distance as the
//    crow flies."
//
// We only need the modes offered by this calculator: car/carpool (road
// detour vs. straight line), train (both TGV and Western-Europe average),
// and air (fixed km added for take-off/landing routing & holding
// patterns). Walking and cycling are left as direct distances. Ferry is
// NOT covered by Labos1point5 — we apply no correction and document this
// simplification in the on-page methodology explainer.
// ----------------------------------------------------------------------------
const DISTANCE_MULTIPLIERS = {
    walk: 1,
    bike: 1,
    car: 1.3,
    carpool: 1.3,
    ferry: 1, // not covered by Labos1point5 — direct distance used, see note above
    trainTGV: 1.2,
    trainWestEurope: 1.2,
};
const AIR_DISTANCE_ADDITION_KM = 95; // flat km added to great-circle distance for flights

/**
 * Converts a great-circle ("as the crow flies") distance into the
 * "travelled distance" used for the emissions calculation, following the
 * Labos1point5 methodology.
 * @param {string} mode - transport mode key (car, carpool, trainTGV, trainWestEurope, ferry, walk, bike, air)
 * @param {number} greatCircleKm - straight-line distance entered by the user
 * @returns {number} adjusted distance in km
 */
function adjustDistanceForMode(mode, greatCircleKm) {
    if (mode === 'air') return greatCircleKm + AIR_DISTANCE_ADDITION_KM;
    const multiplier = DISTANCE_MULTIPLIERS[mode] ?? 1;
    return greatCircleKm * multiplier;
}

/**
 * Selects the flight emission factor band based on the *adjusted* flight
 * distance (great-circle + 95km).
 */
function getFlightFactor(adjustedKm) {
    if (adjustedKm < 1000) return TRANSPORT_FACTORS.airShort;
    if (adjustedKm < 3000) return TRANSPORT_FACTORS.airMedium;
    return TRANSPORT_FACTORS.airLong;
}

// ----------------------------------------------------------------------------
// FIXED CATEGORY COLORS
// Assigned once and for all so the pie chart never reshuffles colors
// depending on the order items were entered. Chosen to be broadly
// distinguishable (incl. for common forms of color-blindness) and
// semantically grouped: greens for plant-based meals, warm tones for
// meat & flights, blue tones for water-based transport, purples for rail,
// greys for private car.
// ----------------------------------------------------------------------------
const CATEGORY_COLORS = {
    vegan: '#2D5B3F',
    vegetarian: '#8BC34A',
    whiteMeat: '#E9C46A',
    redMeat: '#C0392B',
    pescetarian: '#457B9D',
    coffeeTeaBreak: '#6F4E37',
    walk: '#A8DADC',
    bike: '#52B788',
    car: '#6C757D',
    carpool: '#9AA5AD',
    ferry: '#1D3557',
    trainTGV: '#8E44AD',
    trainWestEurope: '#C8A2C8',
    air: '#E67E22',
};

// ----------------------------------------------------------------------------
// CLIMATE CONTEXT — annual per-person carbon budget
//
// PARIS_AGREEMENT_ANNUAL_TARGET: the commonly-cited "2 tonnes CO2e per
// person per year" objective for 2050 carbon neutrality, consistent with
// the Paris Agreement's well-below-2°C goal (cited by ADEME/Nos Gestes
// Climat, Vert.eco, ABC, and most French carbon-literacy resources).
//
// FRENCH_PUBLIC_SERVICES_FOOTPRINT: the part of that budget already
// "spent" collectively before any individual choice — health care,
// education, defense, public administration, infrastructure — on which a
// single person has essentially no direct lever (only through political
// engagement). Source: Nos Gestes Climat (ADEME/Datagir official
// footprint simulator), which attributes ~1.3 tCO2e/person/year to public
// services; see also Bon Pote's analysis (bonpote.com/empreinte-carbone-
// des-services-publics), which cites the same order of magnitude
// (~1.3-1.6t depending on scope: public services alone vs. public +
// commercial societal services).
//
// INDIVIDUAL_ACTIONABLE_BUDGET: what's left, in theory, for the choices a
// person actually controls day to day — food, personal travel, housing,
// consumer goods.
// ----------------------------------------------------------------------------
const PARIS_AGREEMENT_ANNUAL_TARGET = 2300; // kg CO2e / person / year
const FRENCH_PUBLIC_SERVICES_FOOTPRINT = 1300; // kg CO2e / person / year
const INDIVIDUAL_ACTIONABLE_BUDGET = PARIS_AGREEMENT_ANNUAL_TARGET - FRENCH_PUBLIC_SERVICES_FOOTPRINT; // = 1000 kg CO2e, if figures haven't changed

// ----------------------------------------------------------------------------
// REFERENCE JOURNEYS — one-way great-circle distances (km), used for the
// "orders of magnitude" section further down the page. All are shown as
// round trips (×2) at calculation time, consistent with how a real trip
// to a conference works.
// ----------------------------------------------------------------------------
const REFERENCE_JOURNEYS = {
    parisberlin: { km: 1120, name: 'Paris–Berlin' },
    paristokyo: { km: 9740, name: 'Paris–Tōkyō' },
};
