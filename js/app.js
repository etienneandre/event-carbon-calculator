// ============================================================================
// EVENT CARBON CALCULATOR — APPLICATION LOGIC
// Constants (emissions factors, colors, climate context) live in
// js/constants.js, loaded before this file.
// ============================================================================

// ----------------------------------------------------------------------------
// TRANSLATIONS
// ----------------------------------------------------------------------------
const TRANSLATIONS = {
    en: {
        title: 'Event Carbon Footprint Calculator',
        subtitle: 'Calculate the climate impact of your scientific conference',
        language: 'Language',
        mealsSectionTitle: 'Meals & Refreshments',
        mealsDesc: 'During the entire event',
        veganLabel: 'Vegan meals',
        vegetarianLabel: 'Vegetarian meals',
        whiteMeatLabel: 'White meat meals',
        redMeatLabel: 'Red meat meals',
        pescetarianLabel: 'Pescetarian meals',
        coffeeLabel: 'Coffee/tea breaks',
        transportSectionTitle: 'Transportation',
        transportDesc: 'Add each journey separately (by group of persons with the same travelling profile)',
        addJourneyLabel: 'Add journey',
        resultsSectionTitle: 'Event Carbon Footprint',
        totalEmissionsLabel: 'Total Emissions',
        perAttendeeLabel: 'Per attendee',
        mealsImpactLabel: 'Meals & Refreshments',
        transportImpactLabel: 'Transportation',
        breakdownLabel: 'Breakdown by type',
        mealsTotalLabel: 'Meals impact:',
        transportTotalLabel: 'Transport impact:',
        contextTitle: 'A few orders of magnitude',
        contextDesc: 'Putting everyday choices in perspective — this section is about personal habits, not your event',
        targetDescIntro: 'The carbon-neutrality target is ',
        targetDescValue: (PARIS_AGREEMENT_ANNUAL_TARGET/1000).toLocaleString('en-GB', {maximumFractionDigits: 2}) + ' tonnes CO₂e per person per year',
        targetDescMiddle: '. But about ',
        targetDescPublic: (FRENCH_PUBLIC_SERVICES_FOOTPRINT / 1000).toLocaleString('en-GB', {maximumFractionDigits: 2}) + ' tonnes is already "spent" by the collective footprint of French public services',
        targetDescEnd: ' (healthcare, education, defense, infrastructure) — a share individual choices have almost no direct hold on. That leaves roughly ',
        targetDescRemaining: (INDIVIDUAL_ACTIONABLE_BUDGET/1000).toLocaleString('en-GB', {maximumFractionDigits: 2}) + ' tonne of personal carbon budget',
        targetDescFinal: ' each year for food, travel, housing and consumption. Percentages below are calculated against this remaining budget.',
        targetLink: 'Where do these figures come from?',
        people: 'People',
        distance: 'Distance as the crow flies (km)',
        distanceAdjustedPrefix: '≈',
        distanceAdjustedSuffix: 'km applied (Labos1point5 method)',
        mode: 'Mode',
        roundTrip: 'Round trip',
        carbon: 'Carbon',
        delete: 'Delete',
        duplicate: 'Duplicate',
        walk: 'Walking',
        bike: 'Bicycle',
        car: 'Car (solo)',
        carpool: 'Carpool',
        ferry: 'Ferry',
        trainTGV: 'Train (high-speed / TGV)',
        trainWestEurope: 'Train (Western Europe average)',
        air: 'Flight',
        aboutTitle: 'ℹ️ About this calculator',
        aboutText: 'This tiny tool helps scientific conferences and events understand and reduce their environmental impact. Enter your event’s details—meals provided and travel distances of the event participants—to calculate the carbon footprint of your event. It is offered in the hope it will be useful to conference organisers wishing to improve their event’s environmental responsibility.',
        disclaimerText: 'This calculator provides estimates based on public data. Results are for guidance only, with the hope it will be useful.',
        participantsSectionTitle: 'Event Overview',
        participantsLabel: 'Number of participants',
        participantsDesc: 'How many people are attending your event?',
        participantsNote: 'This helps calculate per-person impact',
        yearRedMeat: 'Year of daily red meat',
        yearVegan: 'Year of vegan diet',
        parisberlinTrain: 'Paris–Berlin by train (return trip)',
        parisberlinCar: 'Paris–Berlin by car (return trip)',
        parisberlinFly: 'Paris–Berlin by plane (return trip)',
        paristokyo: 'Paris–Tōkyō by plane (return trip)',
        footer_source: 'Emissions factors based on: Labos1point5, ADEME/Nos Gestes Climat.',
        footer: 'This small simulator is provided with absolutely no guarantee, and with the main goal to be as simple as possible, and thus potentially imprecise. The computation should be regarded as an indicative estimate rather than a result with infinite precision.',
        of: 'of',
        sourcesTitle: '📚 Sources & References',
        exportBtn: '📊 Export data in CSV',
        privacyTitle: '🔒 Privacy & data',
        privacyText: 'Your data stays on your device. This calculator runs entirely in your browser, with no data transmission, no external API call, and no cookies. Every calculation happens locally, using the emissions factors embedded in this page’s code. You can use it fully offline, and nothing about your event is ever stored or transmitted anywhere — not by us, not by anyone.',
        privacyTextEnd: 'The exported CSV file is generated and downloaded entirely on your device — nothing is uploaded to any server. This page makes no network request at all once loaded (open your browser’s network inspector to check).',
        methodologyTitle: '🧭 How is travel distance calculated?',
        methodologyIntro: 'For each journey, you only need to enter the straight-line ("as the crow flies") distance between departure and arrival. The calculator then applies the same distance-correction method as the Labos1point5 travel simulator, widely used by French research labs for their own carbon accounting, to approximate real travelled distance:',
        methodologyColMode: 'Mode',
        methodologyColCoefficient: 'Correction applied to the straight-line distance',
        methodologyRowCar: '🚗 Car, carpool',
        methodologyRowTrain: '🚆 Train (TGV or Western Europe average)',
        methodologyRowOther: '🚶 Walking, 🚲 cycling, ⛴️ ferry',
        methodologyRowAir: '✈️ Flight',
        methodologyCoefCar: '× 1.3',
        methodologyCoefTrain: '× 1.2',
        methodologyCoefOther: 'direct distance (no correction)',
        methodologyCoefAir: '+ 95 km (flat, for taxiing / take-off / landing routing)',
        methodologyFormula: 'Emissions of a journey = adjusted distance × emission factor of the mode (per passenger-km) × 2 if round trip',
        methodologyNote: 'Ferry is not covered by the Labos1point5 methodology; we therefore leave its distance uncorrected, which may slightly underestimate real sea-route distances (which often follow coastlines or straits rather than a straight line).',
        methodologySource: 'Source: Labos1point5 — travel simulator',
        perspectiveLegendPublic: 'Already "spent": French public services (≈' + (FRENCH_PUBLIC_SERVICES_FOOTPRINT / 1000).toLocaleString('en-GB', {maximumFractionDigits: 2}) + 't)',
        perspectiveLegendRemaining: 'Remaining individual budget (up to ' + (PARIS_AGREEMENT_ANNUAL_TARGET/1000).toLocaleString('en-GB', {maximumFractionDigits: 2}) + 't)',
        perspectiveLegendOver: 'Beyond the ' + (PARIS_AGREEMENT_ANNUAL_TARGET/1000).toLocaleString('en-GB', {maximumFractionDigits: 2}) + '-tonne target',
        perspectiveTargetLabel: '' + (PARIS_AGREEMENT_ANNUAL_TARGET/1000).toLocaleString('en-GB', {maximumFractionDigits: 2}) + 't — Paris Agreement target',
        ofRemainingBudget: 'of the remaining individual budget',
        researchImpactLink2: 'Labos1point5 — resources for research labs',
    },
    fr: {
        title: 'Calculateur de l’empreinte carbone d’un évènement',
        subtitle: 'Évaluez l’impact en CO₂ de votre congrès scientifique',
        language: 'Langue',
        mealsSectionTitle: 'Alimentation',
        mealsDesc: 'Pendant toute la durée du congrès',
        veganLabel: 'Repas végétaliens',
        vegetarianLabel: 'Repas végétariens',
        whiteMeatLabel: 'Repas avec viande blanche',
        redMeatLabel: 'Repas avec viande rouge',
        pescetarianLabel: 'Repas pescétariens',
        coffeeLabel: 'Pauses café/thé',
        transportSectionTitle: 'Déplacements',
        transportDesc: 'Ajoutez chaque trajet séparément (par groupe de personnes avec le même profil de transport)',
        addJourneyLabel: 'Ajouter un trajet',
        resultsSectionTitle: 'Bilan carbone de l’événement',
        totalEmissionsLabel: 'Émissions totales',
        perAttendeeLabel: 'Par participant⋅e',
        mealsImpactLabel: 'Alimentation',
        transportImpactLabel: 'Déplacements',
        breakdownLabel: 'Répartition par type',
        mealsTotalLabel: 'Bilan alimentation:',
        transportTotalLabel: 'Bilan déplacements:',
        contextTitle: 'Quelques ordres de grandeur',
        contextDesc: 'Remettons en perspective des choix du quotidien — cette section porte sur les habitudes personnelles, pas sur votre événement',
        targetDescIntro: 'L’objectif de neutralité carbone est fixé à ',
        targetDescValue: (PARIS_AGREEMENT_ANNUAL_TARGET/1000).toLocaleString('fr-FR', {maximumFractionDigits: 2}) + ' tonnes CO₂e par personne et par an',
        targetDescMiddle: '. Mais environ ',
        targetDescPublic: (FRENCH_PUBLIC_SERVICES_FOOTPRINT / 1000).toLocaleString('fr-FR', {maximumFractionDigits: 2}) + ' tonne est déjà « dépensée » par la part collective des services publics français',
        targetDescEnd: ' (santé, éducation, défense, infrastructures) — un poste sur lequel les choix individuels n’ont presque aucune prise directe. Il reste donc environ ',
        targetDescRemaining: (INDIVIDUAL_ACTIONABLE_BUDGET/1000).toLocaleString('fr-FR', {maximumFractionDigits: 2}) + ' tonne de budget carbone individuel',
        targetDescFinal: ' chaque année pour l’alimentation, les déplacements, le logement et la consommation. Les pourcentages ci-dessous sont calculés par rapport à ce budget restant.',
        targetLink: 'D’où viennent ces chiffres ?',
        people: 'Personnes',
        distance: 'Distance à vol d’oiseau (km)',
        distanceAdjustedPrefix: '≈',
        distanceAdjustedSuffix: 'km appliqués (méthode Labos1point5)',
        mode: 'Mode',
        roundTrip: 'Aller-retour',
        carbon: 'Carbone',
        delete: 'Supprimer',
        duplicate: 'Dupliquer',
        walk: 'À pied',
        bike: 'Vélo',
        car: 'Voiture (seul⋅e)',
        carpool: 'Covoiturage',
        ferry: 'Ferry',
        trainTGV: 'Train (grande vitesse / TGV)',
        trainWestEurope: 'Train (moyenne Europe de l’Ouest)',
        air: 'Avion',
        aboutTitle: 'ℹ️ À propos de ce calculateur',
        aboutText: 'Ce mini outil aide les personnes organisant des évènements (typiquement des congrès scientifiques) à comprendre et réduire leur impact environnemental. Entrez les détails de votre événement — repas servis et distances de voyage des personnes participantes — pour calculer l’empreinte carbone de votre évènement. Ce petit simulateur est mis à disposition dans l’espoir qu’il soit utile aux organisateur⋅ice⋅s de congrès souhaitant améliorer la responsabilité environnementale de leur événement.',
        disclaimerText: 'Ce calculateur fournit des estimations basées sur des données publiques. Les résultats sont à titre informatif uniquement, avec l’espoir que cela soit utile au plus grand nombre.',
        participantsSectionTitle: 'Vue d’ensemble de l’événement',
        participantsLabel: 'Nombre de participant⋅e⋅s',
        participantsDesc: 'Combien de personnes assistent à votre événement ?',
        participantsNote: 'Cela aide à calculer l’impact par personne',
        yearRedMeat: 'Une année de viande rouge quotidienne',
        yearVegan: 'Une année de régime végétalien',
        parisberlinTrain: 'Paris–Berlin en train (aller-retour)',
        parisberlinCar: 'Paris–Berlin en voiture (aller-retour)',
        parisberlinFly: 'Paris–Berlin en avion (aller-retour)',
        paristokyo: 'Paris–Tōkyō en avion (aller-retour)',
        footer_source: 'Facteurs d’émission basés sur : Labos1point5, ADEME/Nos Gestes Climat.',
        footer: 'Ce petit simulateur est fourni sans aucune garantie, son objectif principal étant d’être aussi simple à utiliser que possible, ce qui peut entraîner un certain manque de précision. Les résultats doivent être considérés comme une estimation indicative plutôt que comme un résultat d’une précision absolue.',
        of: 'de',
        sourcesTitle: '📚 Sources et références',
        exportBtn: '📊 Exporter les données en CSV',
        privacyTitle: '🔒 Confidentialité et données',
        privacyText: 'Vos données restent sur votre appareil. Ce calculateur fonctionne entièrement dans votre navigateur, sans aucune transmission de données, sans appel à une API externe, et sans cookie. Chaque calcul se fait localement, à partir des facteurs d’émission intégrés dans le code de cette page. Vous pouvez l’utiliser hors ligne, et rien concernant votre événement n’est jamais stocké ni transmis où que ce soit — ni par nous, ni par personne.',
        privacyTextEnd: 'Le fichier CSV exporté est généré et téléchargé entièrement sur votre appareil — rien n’est envoyé à un serveur. Cette page n’effectue strictement aucune requête réseau une fois chargée (vous pouvez le vérifier avec l’inspecteur réseau de votre navigateur).',
        methodologyTitle: '🧭 Comment la distance des trajets est-elle calculée ?',
        methodologyIntro: 'Pour chaque trajet, il suffit d’indiquer la distance à vol d’oiseau entre le départ et l’arrivée. Le calculateur applique ensuite la même méthode de correction de distance que le simulateur de trajets de Labos1point5, largement utilisé par les laboratoires de recherche français pour leurs bilans carbone, afin d’approcher la distance réellement parcourue :',
        methodologyColMode: 'Mode',
        methodologyColCoefficient: 'Correction appliquée à la distance à vol d’oiseau',
        methodologyRowCar: '🚗 Voiture, covoiturage',
        methodologyRowTrain: '🚆 Train (TGV ou moyenne Europe de l’Ouest)',
        methodologyRowOther: '🚶 Marche, 🚲 vélo, ⛴️ ferry',
        methodologyRowAir: '✈️ Avion',
        methodologyCoefCar: '× 1,3',
        methodologyCoefTrain: '× 1,2',
        methodologyCoefOther: 'distance directe (aucune correction)',
        methodologyCoefAir: '+ 95 km (forfait roulage / décollage / atterrissage)',
        methodologyFormula: 'Émissions d’un trajet = distance ajustée × facteur d’émission du mode (par passager-km) × 2 si aller-retour',
        methodologyNote: 'Le ferry n’est pas couvert par la méthodologie Labos1point5 ; sa distance n’est donc pas corrigée, ce qui peut légèrement sous-estimer la distance réelle des routes maritimes (qui suivent souvent des côtes ou des détroits plutôt qu’une ligne droite).',
        methodologySource: 'Source : Labos1point5 — simulateur de trajets',
        perspectiveLegendPublic: 'Déjà « dépensé » : services publics français (≈' + (FRENCH_PUBLIC_SERVICES_FOOTPRINT / 1000).toLocaleString('fr-FR', {maximumFractionDigits: 2}) + 't)',
        perspectiveLegendRemaining: 'Budget individuel restant (jusqu’à ' + (PARIS_AGREEMENT_ANNUAL_TARGET/1000).toLocaleString('fr-FR', {maximumFractionDigits: 2}) + 't)',
        perspectiveLegendOver: 'Au-delà de l’objectif des ' + (PARIS_AGREEMENT_ANNUAL_TARGET/1000).toLocaleString('fr-FR', {maximumFractionDigits: 2}) + ' tonnes',
        perspectiveTargetLabel: '' + (PARIS_AGREEMENT_ANNUAL_TARGET/1000).toLocaleString('fr-FR', {maximumFractionDigits: 2}) + 't — objectif Accord de Paris',
        ofRemainingBudget: 'du budget individuel restant',
        researchImpactLink2: 'Labos1point5 — ressources pour les laboratoires de recherche',
    }
};

// ----------------------------------------------------------------------------
// STATE MANAGEMENT
// ----------------------------------------------------------------------------

let currentLanguage = navigator.language.split('-')[0] === 'fr' ? 'fr' : 'en';
let journeyCounter = 0;
let journeys = [];
let pieChart = null;

const TRANSPORT_MODES = ['walk', 'bike', 'car', 'carpool', 'ferry', 'trainTGV', 'trainWestEurope', 'air'];
const MEAL_KEYS = ['vegan', 'vegetarian', 'whiteMeat', 'redMeat', 'pescetarian'];

// ----------------------------------------------------------------------------
// UTILITY FUNCTIONS
// ----------------------------------------------------------------------------

function formatEmissions(kg) {
    if (kg === 0) return '0';
    if (kg < 0.001) return '< 0.01 kg';
    if (kg < 1) return `${(kg * 1000).toFixed(0)} g`;
    if (kg >= 1000) return `${(kg / 1000).toFixed(2)} t`;
    return `${kg.toFixed(1)} kg`;
}

function t(key) {
    return TRANSLATIONS[currentLanguage][key] || TRANSLATIONS['en'][key] || key;
}

function changeLanguage(lang) {
    currentLanguage = lang;
    updateAllText();
    updateCalculations();
}

function updateAllText() {
    const simpleIds = [
        'title', 'subtitle', 'mealsSectionTitle', 'mealsDesc', 'veganLabel',
        'vegetarianLabel', 'whiteMeatLabel', 'redMeatLabel', 'pescetarianLabel',
        'coffeeLabel', 'transportSectionTitle', 'transportDesc', 'addJourneyLabel',
        'resultsSectionTitle', 'totalEmissionsLabel', 'mealsImpactLabel',
        'transportImpactLabel', 'breakdownLabel', 'mealsTotalLabel',
        'transportTotalLabel', 'contextTitle', 'contextDesc', 'aboutTitle',
        'aboutText', 'disclaimerText', 'participantsSectionTitle',
        'participantsLabel', 'participantsDesc', 'participantsNote',
        'sourcesTitle', 'privacyTitle', 'privacyText', 'privacyTextEnd',
        'methodologyTitle', 'methodologyIntro', 'methodologyColMode',
        'methodologyColCoefficient', 'methodologyRowCar', 'methodologyRowTrain',
        'methodologyRowOther', 'methodologyRowAir', 'methodologyCoefCar',
        'methodologyCoefTrain', 'methodologyCoefOther', 'methodologyCoefAir',
        'methodologyFormula', 'methodologyNote', 'methodologySource', 'footer', 'footer_source',
    ];
    simpleIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = t(id);
    });

    const exportBtnLabel = document.getElementById('exportBtnLabel');
    if (exportBtnLabel) exportBtnLabel.textContent = t('exportBtn');

    // Target/perspective intro paragraph, built from several fragments so the
    // two key figures can be visually emphasized.
    const targetDescEl = document.getElementById('targetDesc');
    if (targetDescEl) {
        targetDescEl.innerHTML =
            t('targetDescIntro') +
            `<strong>${t('targetDescValue')}</strong>` +
            t('targetDescMiddle') +
            `<strong>${t('targetDescPublic')}</strong>` +
            t('targetDescEnd') +
            '<strong>' + `${t('targetDescRemaining')}</strong>` +
            t('targetDescFinal');
    }
    const targetLinkEl = document.getElementById('targetLink');
    if (targetLinkEl) targetLinkEl.textContent = t('targetLink');

    const researchLink2 = document.getElementById('researchImpactLink2');
    if (researchLink2) researchLink2.textContent = t('researchImpactLink2');

    // Journey cards
    journeys.forEach(j => updateJourneyCardLabels(j.id));

    updatePerspectiveStaticLabels();
}

// ----------------------------------------------------------------------------
// CALCULATIONS
// ----------------------------------------------------------------------------

function calculateMealEmissions() {
    return MEAL_KEYS.reduce((sum, key) => {
        const count = parseInt(document.getElementById(key).value || 0);
        return sum + count * MEAL_FACTORS[key];
    }, 0) + parseInt(document.getElementById('coffeeTeaBreak').value || 0) * COFFEE_TEA_BREAK_FACTOR;
}

/**
 * Computes the emission factor (g CO2e/passenger-km) and adjusted distance
 * (km, already including the Labos1point5 correction) for a given journey.
 */
function getJourneyFactorAndAdjustedDistance(mode, greatCircleKm) {
    const adjustedDistance = adjustDistanceForMode(mode, greatCircleKm);
    let factor = 0;
    if (mode === 'walk') factor = TRANSPORT_FACTORS.walk;
    else if (mode === 'bike') factor = TRANSPORT_FACTORS.bike;
    else if (mode === 'car') factor = TRANSPORT_FACTORS.car;
    else if (mode === 'carpool') factor = TRANSPORT_FACTORS.carpool;
    else if (mode === 'ferry') factor = TRANSPORT_FACTORS.ferry;
    else if (mode === 'trainTGV') factor = TRANSPORT_FACTORS.trainTGV;
    else if (mode === 'trainWestEurope') factor = TRANSPORT_FACTORS.trainWestEurope;
    else if (mode === 'air') factor = getFlightFactor(adjustedDistance);
    return { factor, adjustedDistance };
}

function calculateJourneyEmission(journey) {
    const people = parseInt(journey.people) || 1;
    const distance = parseFloat(journey.distance) || 0;
    const mode = journey.mode;
    const roundTrip = journey.roundTrip !== false; // default true

    if (distance <= 0) return 0;

    const { factor, adjustedDistance } = getJourneyFactorAndAdjustedDistance(mode, distance);
    const oneWay = (people * adjustedDistance * factor) / 1000; // kg CO2e
    return roundTrip ? oneWay * 2 : oneWay;
}

function calculateTransportEmissions() {
    return journeys.reduce((sum, j) => sum + calculateJourneyEmission(j), 0);
}

function updateCalculations() {
    // Update individual meal emissions display
    MEAL_KEYS.forEach(key => {
        const count = parseInt(document.getElementById(key).value || 0);
        document.getElementById(`${key}Emission`).textContent = formatEmissions(count * MEAL_FACTORS[key]);
    });
    document.getElementById('coffeeEmission').textContent = formatEmissions(
        parseInt(document.getElementById('coffeeTeaBreak').value || 0) * COFFEE_TEA_BREAK_FACTOR
    );

    const mealEmissions = calculateMealEmissions();
    const transportEmissions = calculateTransportEmissions();
    const totalEmissions = mealEmissions + transportEmissions;
    const participantCount = parseInt(document.getElementById('participants').value || 1) || 1;
    const emissionsPerParticipant = totalEmissions / participantCount;

    document.getElementById('mealsTotalValue').textContent = formatEmissions(mealEmissions);
    document.getElementById('transportTotalValue').textContent = formatEmissions(transportEmissions);

    if (totalEmissions > 0) {
        document.getElementById('resultsSection').classList.remove('hidden');
        document.getElementById('totalEmissionsValue').textContent = formatEmissions(totalEmissions);
        document.getElementById('perAttendeeLabel').textContent = `${t('perAttendeeLabel')}: ${formatEmissions(emissionsPerParticipant)}`;
        document.getElementById('mealsImpactValue').textContent = formatEmissions(mealEmissions);
        document.getElementById('mealsPercentLabel').textContent = ((mealEmissions / totalEmissions) * 100).toFixed(0) + '% ' + t('of');
        document.getElementById('transportImpactValue').textContent = formatEmissions(transportEmissions);
        document.getElementById('transportPercentLabel').textContent = ((transportEmissions / totalEmissions) * 100).toFixed(0) + '% ' + t('of');
    } else {
        document.getElementById('resultsSection').classList.add('hidden');
    }

    updatePieChart();

    // Update journey emission + adjusted-distance display
    journeys.forEach(j => {
        const emission = calculateJourneyEmission(j);
        const emissionEl = document.getElementById(`journey-emission-${j.id}`);
        if (emissionEl) emissionEl.textContent = formatEmissions(emission);

    });

    updateContext();
}

// ----------------------------------------------------------------------------
// PIE CHART — fixed colors, grouped by category/mode, tooltip shows label + value
// ----------------------------------------------------------------------------

function updatePieChart() {
    const ctx = document.getElementById('pieChart');
    if (!ctx) return;

    // Accumulate values per fixed category key, so ordering of user input
    // never changes which color represents which category, and multiple
    // journeys sharing the same mode are summed into a single slice.
    const totals = {};

    MEAL_KEYS.forEach(key => {
        const count = parseInt(document.getElementById(key).value || 0);
        if (count > 0) totals[key] = count * MEAL_FACTORS[key];
    });

    const coffeeCount = parseInt(document.getElementById('coffeeTeaBreak').value || 0);
    if (coffeeCount > 0) totals.coffeeTeaBreak = coffeeCount * COFFEE_TEA_BREAK_FACTOR;

    journeys.forEach(j => {
        const emission = calculateJourneyEmission(j);
        if (emission > 0) {
            totals[j.mode] = (totals[j.mode] || 0) + emission;
        }
    });

    const categoryKeys = Object.keys(totals);
    if (categoryKeys.length === 0) return;

    const labels = categoryKeys.map(key => t(key === 'coffeeTeaBreak' ? 'coffeeLabel' : key));
    const data = categoryKeys.map(key => totals[key]);
    const colors = categoryKeys.map(key => CATEGORY_COLORS[key] || '#999999');

    if (pieChart) pieChart.destroy();

    pieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: { font: { size: 12 }, padding: 15, usePointStyle: true }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `${context.label}: ${formatEmissions(context.parsed)}`;
                        }
                    }
                }
            }
        }
    });
}

// ----------------------------------------------------------------------------
// JOURNEY MANAGEMENT
// ----------------------------------------------------------------------------

function addJourney() {
    const id = journeyCounter++;
    journeys.push({ id: id, people: 1, distance: 0, mode: 'trainTGV', roundTrip: true });
    renderJourney(id);
    updateCalculations();
}

function transportModeOptions(selectedMode) {
    return TRANSPORT_MODES.map(mode =>
        `<option value="${mode}" ${selectedMode === mode ? 'selected' : ''}>${t(mode)}</option>`
    ).join('');
}

function renderJourney(id) {
    const journey = journeys.find(j => j.id === id);
    if (!journey) return;

    const container = document.getElementById('journeysContainer');
    let journeyDiv = document.getElementById(`journey-${id}`);

    if (!journeyDiv) {
        journeyDiv = document.createElement('div');
        journeyDiv.id = `journey-${id}`;
        journeyDiv.className = 'journey-card';
        container.appendChild(journeyDiv);
    }

    journeyDiv.innerHTML = `
        <div class="journey-grid">
            <div class="input-group">
                <label id="journey-people-${id}" for="journey-people-input-${id}">${t('people')}</label>
                <input type="number" id="journey-people-input-${id}" value="${journey.people}" min="1"
                    onchange="updateJourney(${id}, 'people', this.value)">
            </div>
            <div class="input-group">
                <label id="journey-distance-${id}" for="journey-distance-input-${id}">${t('distance')}</label>
                <input type="number" id="journey-distance-input-${id}" value="${journey.distance}"
                    onchange="updateJourney(${id}, 'distance', this.value)" placeholder="e.g. 1200">
            </div>
            <div class="input-group">
                <label id="journey-mode-${id}" for="journey-mode-input-${id}">${t('mode')}</label>
                <select id="journey-mode-input-${id}" onchange="updateJourney(${id}, 'mode', this.value)">
                    ${transportModeOptions(journey.mode)}
                </select>
            </div>
            <div class="roundtrip-group">
                <div class="roundtrip-checkbox-wrap">
                    <input type="checkbox" id="journey-roundtrip-input-${id}" ${journey.roundTrip !== false ? 'checked' : ''}
                        onchange="updateJourney(${id}, 'roundTrip', this.checked)">
                    <label id="journey-roundtrip-${id}" for="journey-roundtrip-input-${id}">${t('roundTrip')}</label>
                </div>
            </div>
            <div class="input-group">
                <label id="journey-carbon-${id}" for="journey-carbon-input-${id}">${t('carbon')}</label>
                <div style="padding: 0.75rem; background-color: #F0F4F1; border-radius: 0.5rem; font-weight: 600; color: #2D5B3F;">
                    <div id="journey-emission-${id}">0 kg</div>
                </div>
            </div>
            <div>
                <label style="opacity: 0; display: block; height: 1.7rem;">&nbsp;</label>
                <div class="journey-actions">
                    <button class="button-secondary" onclick="duplicateJourney(${id})" title="${t('duplicate')}">📋</button>
                    <button class="button-danger" onclick="deleteJourney(${id})" title="${t('delete')}">✕</button>
                </div>
            </div>
        </div>
    `;

    updateJourneyCardLabels(id);
}

function updateJourneyCardLabels(id) {
    const map = {
        [`journey-people-${id}`]: 'people',
        [`journey-distance-${id}`]: 'distance',
        [`journey-mode-${id}`]: 'mode',
        [`journey-roundtrip-${id}`]: 'roundTrip',
        [`journey-carbon-${id}`]: 'carbon',
    };
    Object.entries(map).forEach(([elId, key]) => {
        const el = document.getElementById(elId);
        if (el) el.textContent = t(key);
    });

    // Re-render the mode <select> options with translated labels, keeping the
    // currently selected mode.
    const modeSelect = document.getElementById(`journey-mode-input-${id}`);
    if (modeSelect) {
        const journey = journeys.find(j => j.id === id);
        const currentMode = journey ? journey.mode : modeSelect.value;
        modeSelect.innerHTML = transportModeOptions(currentMode);
    }
}

function updateJourney(id, field, value) {
    const journey = journeys.find(j => j.id === id);
    if (!journey) return;
    if (field === 'people' || field === 'distance') {
        journey[field] = parseFloat(value) || 0;
    } else if (field === 'roundTrip') {
        journey[field] = !!value;
    } else {
        journey[field] = value;
    }
    updateCalculations();
}

function deleteJourney(id) {
    journeys = journeys.filter(j => j.id !== id);
    const journeyDiv = document.getElementById(`journey-${id}`);
    if (journeyDiv) journeyDiv.remove();
    updateCalculations();
}

function duplicateJourney(id) {
    const journey = journeys.find(j => j.id === id);
    if (journey) {
        const newId = journeyCounter++;
        journeys.push({ ...journey, id: newId });
        renderJourney(newId);
        updateCalculations();
    }
}

// ----------------------------------------------------------------------------
// "ORDERS OF MAGNITUDE" ZONED PERSPECTIVE CHART
// ----------------------------------------------------------------------------

/**
 * Emissions (kg CO2e, round trip) of a reference journey travelled by a
 * given mode, using the Labos1point5 distance-adjustment methodology.
 */
function computeReferenceJourneyEmissions(mode, greatCircleKm) {
    const { factor, adjustedDistance } = getJourneyFactorAndAdjustedDistance(mode, greatCircleKm);
    return (adjustedDistance * factor / 1000) * 2; // round trip
}

function getPerspectiveScenarios() {
    return [
        {
            key: 'yearRedMeat',
            label: t('yearRedMeat'),
            value: 365 * MEAL_FACTORS.redMeat,
            color: CATEGORY_COLORS.redMeat,
        },
        {
            key: 'yearVegan',
            label: t('yearVegan'),
            value: 365 * MEAL_FACTORS.vegan,
            color: CATEGORY_COLORS.vegan,
        },
        {
            key: 'parisberlinTrain',
            label: t('parisberlinTrain'),
            value: computeReferenceJourneyEmissions('trainTGV', REFERENCE_JOURNEYS.parisberlin.km),
            color: CATEGORY_COLORS.trainTGV,
        },
        {
            key: 'parisberlinCar',
            label: t('parisberlinCar'),
            value: computeReferenceJourneyEmissions('car', REFERENCE_JOURNEYS.parisberlin.km),
            color: CATEGORY_COLORS.car,
        },
        {
            key: 'parisberlinFly',
            label: t('parisberlinFly'),
            value: computeReferenceJourneyEmissions('air', REFERENCE_JOURNEYS.parisberlin.km),
            color: CATEGORY_COLORS.air,
        },
        {
            key: 'paristokyo',
            label: t('paristokyo'),
            value: computeReferenceJourneyEmissions('air', REFERENCE_JOURNEYS.paristokyo.km),
            color: CATEGORY_COLORS.air,
        },
    ];
}

function updatePerspectiveStaticLabels() {
    // no-op placeholder kept for symmetry — legend/ticks are rebuilt in
    // updateContext() since they depend on computed scenario values.
}

function updateContext() {
    const container = document.getElementById('contextContainer');
    if (!container) return;
    container.innerHTML = '';

    const scenarios = getPerspectiveScenarios();
    // Each scenario bar is stacked *after* the public-services baseline
    // (starts at 1.3T and extends by the scenario's own value), so the scale
    // must accommodate the furthest point reached: 1.3T + that value.
    const rawMax = Math.max(
        ...scenarios.map(s => FRENCH_PUBLIC_SERVICES_FOOTPRINT + s.value),
        PARIS_AGREEMENT_ANNUAL_TARGET
    );
    const maxValue = rawMax * 1.08; // small padding so the largest bar doesn't touch the edge

    const publicPct = Math.min((FRENCH_PUBLIC_SERVICES_FOOTPRINT / maxValue) * 100, 100);
    const targetPct = Math.min((PARIS_AGREEMENT_ANNUAL_TARGET / maxValue) * 100, 100);

    // Legend
    const legend = document.createElement('div');
    legend.className = 'perspective-legend';
    legend.innerHTML = `
        <div class="perspective-legend-item">
            <span class="perspective-legend-swatch" style="background: repeating-linear-gradient(45deg, #D9D9D9, #D9D9D9 4px, #E6E6E6 4px, #E6E6E6 8px);"></span>
            ${t('perspectiveLegendPublic')}
        </div>
        <div class="perspective-legend-item">
            <span class="perspective-legend-swatch" style="background: #E3F2E6;"></span>
            ${t('perspectiveLegendRemaining')}
        </div>
        <div class="perspective-legend-item">
            <span class="perspective-legend-swatch" style="background: #FBE4E2;"></span>
            ${t('perspectiveLegendOver')}
        </div>
    `;
    container.appendChild(legend);

    // Scale ticks
    const ticks = document.createElement('div');
    ticks.className = 'perspective-scale-ticks';
    ticks.innerHTML = `
        <span class="perspective-scale-tick" style="left: 0%;">0</span>
        <span class="perspective-scale-tick" style="left: ${publicPct}%;">${formatEmissions(FRENCH_PUBLIC_SERVICES_FOOTPRINT)}</span>
        <span class="perspective-scale-tick" style="left: ${targetPct}%; font-weight: 700; color: #2D5B3F;">${t('perspectiveTargetLabel')}</span>
        <span class="perspective-scale-tick" style="left: 100%; transform: translateX(-100%);">${formatEmissions(rawMax)}</span>
    `;
    container.appendChild(ticks);

    scenarios.forEach(scenario => {
        // Bar starts right where the public-services baseline ends, and
        // extends by the scenario's own value: "on top of what's already
        // used collectively, here's how far this individual choice pushes
        // the total" — rather than overlapping the baseline from zero.
        const barWidthPct = Math.min((scenario.value / maxValue) * 100, 100 - publicPct);
        const percentOfIndividualBudget = (scenario.value / INDIVIDUAL_ACTIONABLE_BUDGET) * 100;

        const row = document.createElement('div');
        row.className = 'perspective-row';
        row.innerHTML = `
            <div class="perspective-row-label">
                <span>${scenario.label}</span>
                <span class="perspective-row-value" style="color: ${scenario.color};">${formatEmissions(scenario.value)}</span>
            </div>
            <div class="perspective-track">
                <div class="perspective-zone perspective-zone-public" style="left: 0; width: ${publicPct}%;"></div>
                <div class="perspective-zone perspective-zone-remaining" style="left: ${publicPct}%; width: ${Math.max(0, targetPct - publicPct)}%;"></div>
                <div class="perspective-zone perspective-zone-over" style="left: ${targetPct}%; width: ${Math.max(0, 100 - targetPct)}%;"></div>
                <div class="perspective-bar-fill" style="left: ${publicPct}%; width: ${barWidthPct}%; background: ${scenario.color};"></div>
                <div class="perspective-target-line" style="left: ${targetPct}%;"></div>
            </div>
            <div class="perspective-row-percent">${percentOfIndividualBudget.toFixed(1)}% ${t('ofRemainingBudget')} (${formatEmissions(INDIVIDUAL_ACTIONABLE_BUDGET)})</div>
        `;
        container.appendChild(row);
    });
}

// ----------------------------------------------------------------------------
// CSV EXPORT
// ----------------------------------------------------------------------------

function exportToExcel() {
    let csv = 'Event Carbon Footprint Calculator - Export\n\n';

    csv += 'EVENT OVERVIEW\n';
    csv += `Attendees,${parseInt(document.getElementById('participants').value || 0)}\n\n`;

    csv += 'MEALS & REFRESHMENTS\n';
    csv += 'Category,Count,Factor (kg CO2e),Total (kg CO2e)\n';
    MEAL_KEYS.forEach(key => {
        const count = parseInt(document.getElementById(key).value || 0);
        csv += `${key},${count},${MEAL_FACTORS[key]},${(count * MEAL_FACTORS[key]).toFixed(2)}\n`;
    });
    const coffeeCount = parseInt(document.getElementById('coffeeTeaBreak').value || 0);
    csv += `Coffee/Tea Breaks,${coffeeCount},${COFFEE_TEA_BREAK_FACTOR},${(coffeeCount * COFFEE_TEA_BREAK_FACTOR).toFixed(2)}\n`;

    const mealEmissions = calculateMealEmissions();
    csv += `\nTOTAL MEALS,,,${mealEmissions.toFixed(2)}\n\n`;

    csv += 'TRANSPORTATION\n';
    csv += 'People,Distance as the crow flies (km),Mode,Round trip,Adjusted distance (km),Factor (g CO2e/pkm),Total (kg CO2e)\n';
    journeys.forEach(j => {
        const emission = calculateJourneyEmission(j);
        const { factor, adjustedDistance } = getJourneyFactorAndAdjustedDistance(j.mode, parseFloat(j.distance) || 0);
        csv += `${j.people},${j.distance},${j.mode},${j.roundTrip !== false ? 'yes' : 'no'},${adjustedDistance.toFixed(1)},${factor},${emission.toFixed(2)}\n`;
    });

    const transportEmissions = calculateTransportEmissions();
    csv += `\nTOTAL TRANSPORT,,,,,,${transportEmissions.toFixed(2)}\n\n`;

    const totalEmissions = mealEmissions + transportEmissions;
    const participantCount = parseInt(document.getElementById('participants').value || 1);
    const perAttendee = totalEmissions / participantCount;

    csv += 'SUMMARY\n';
    csv += `Total Emissions (kg CO2e),${totalEmissions.toFixed(2)}\n`;
    csv += `Per Attendee (kg CO2e),${perAttendee.toFixed(2)}\n`;
    csv += `Meals Impact (kg CO2e),${mealEmissions.toFixed(2)}\n`;
    csv += `Transport Impact (kg CO2e),${transportEmissions.toFixed(2)}\n`;
    if (totalEmissions > 0) {
        csv += `Emissions from Meals (%),${((mealEmissions / totalEmissions) * 100).toFixed(1)}\n`;
        csv += `Emissions from Transport (%),${((transportEmissions / totalEmissions) * 100).toFixed(1)}\n\n`;
    }

    csv += 'EMISSIONS FACTORS USED\n';
    csv += '\nMeals (kg CO2e per meal):\n';
    MEAL_KEYS.forEach(key => { csv += `${key},${MEAL_FACTORS[key]}\n`; });
    csv += `Coffee/Tea,${COFFEE_TEA_BREAK_FACTOR}\n`;
    csv += '\nTransport (g CO2e per passenger-km, applied to Labos1point5-adjusted distance):\n';
    Object.entries(TRANSPORT_FACTORS).forEach(([mode, factor]) => { csv += `${mode},${factor}\n`; });
    csv += '\nDistance correction (Labos1point5 methodology):\n';
    Object.entries(DISTANCE_MULTIPLIERS).forEach(([mode, mult]) => { csv += `${mode},x${mult}\n`; });
    csv += `air,+${AIR_DISTANCE_ADDITION_KM}km flat\n`;
    csv += '\nClimate context (kg CO2e per person per year):\n';
    csv += `Paris Agreement annual target,${PARIS_AGREEMENT_ANNUAL_TARGET}\n`;
    csv += `French public services footprint,${FRENCH_PUBLIC_SERVICES_FOOTPRINT}\n`;
    csv += `Remaining individual budget,${INDIVIDUAL_ACTIONABLE_BUDGET}\n`;
    csv += '\nSources: Labos1point5 (apps.labos1point5.org/travels-simulator), SNCF, European Environment Agency, ADEME/Nos Gestes Climat\n';

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `carbon-event-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ----------------------------------------------------------------------------
// INITIALIZATION
// ----------------------------------------------------------------------------

document.getElementById('participants').addEventListener('input', updateCalculations);
MEAL_KEYS.forEach(key => {
    document.getElementById(key).addEventListener('input', updateCalculations);
});
document.getElementById('coffeeTeaBreak').addEventListener('input', updateCalculations);

document.getElementById('languageSelect').value = currentLanguage;

updateAllText();
updateCalculations();
