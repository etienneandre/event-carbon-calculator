# Event Carbon Footprint Calculator

This is a simple (towards simplistic) and hopefully user-friendly single-page application to calculate the climate impact of scientific conferences and events. Available in English and French with real-time calculations and interactive visualisations.

**Live Demo**: Open `event-carbon-calculator.html` directly in any modern Web browser—no installation needed.
Or, even more simple, open [etienne-andre.fr/event-carbon-calculator/](https://www.etienne-andre.fr/event-carbon-calculator/)

---

## Getting Started

### Quick Start
1. **Download** `carbon-calculator.html`
2. **Open** in any modern Web browser
3. **Start entering data** — no installation, no server needed

---

## Features

### 🍽️ Meals & Refreshments Section
Track all food-related emissions during your event:

- **Vegan meals**: 0.39 kg CO₂e per meal
- **Vegetarian meals**: 0.51 kg CO₂e per meal
- **Pescetarian meals**: 1.55 kg CO₂e per meal
- **White meat meals**: 1.58 kg CO₂e per meal
- **Red meat meals**: 7.26 kg CO₂e per meal
- **Coffee/tea breaks**: 0.313 kg CO₂e per person per break

The above meal factors are almost all taken from [notre-environnement.gouv.fr](https://www.notre-environnement.gouv.fr/themes/societe/article/les-effets-de-l-alimentation-sur-l-environnement/)

Specific computations:

- **Pescetarian meal**: average of "repas avec du poisson gras" (1.11) and "repas avec du poisson blanc" (1.98) from the aforementioned source
- **coffee break**: arbitrary choice selecting 1 half brownie (25g) + 1 half croissant (25g), with [8.36kg CO₂e per kilo for the brownie](https://impactco2.fr/outils/alimentation/brownie) and [2.94kg CO₂e per kilo for the croissant](https://impactco2.fr/outils/alimentation/croissant), giving 0.283kg CO₂e per person. Additionally, the coffee impact is taken from [10.54612/a.2n3m2d2pjl](https://doi.org/10.54612/a.2n3m2d2pjl), simplifying to 0.030 kg CO₂e per cup. Total: **0.313kg** CO₂e per person

**These figures should be regarded as indicative estimates rather than universal constants.**

### ✈️ Transportation Section

- **Number of people**: Multiplies each line
- **Distance**: Manual entry in kilometers (straight-line distance)
- **Transport modes**:
  - Walking: 0 emissions
  - Cycling: 5g CO₂e/km
  - Car (solo): 215.6 g CO₂e/km
  - Carpool: 107.8 CO₂e/km (shared by 2)
  - Train (TGV Europe): 3.3 g CO₂e/km
  - Train (average Western Europe): 16 g CO₂e/km
  - Short-haul flights (< 1000 km): 258.6 g CO₂e/km
  - Medium-haul flights (1000–3000 km): 187.5 g CO₂e/km
  - Long-haul flights (> 3000 km): 152 g CO₂e/km
  - Ferry: 138 CO₂e/km

Data come from [Labos1.5](https://apps.labos1point5.org/) factors; flights include contrails.
All transportation include combustion, upstream and manufacturing.

Exception: ferry data come from [Calcul des émissions de gaz à effet de serre dans l'enquête mobilité des personnes 2019 (2023)](https://www.statistiques.developpement-durable.gouv.fr/media/6514/download)

Distance adjustment data (multiplier for car and train; addition of 95km for flights) come from the [Labos1.5 travel simulator](https://apps.labos1point5.org/travels-simulator).

### 📊 Results Overview

**Prominently displayed at the top** once you enter data:

- **Total emissions** (kg CO₂e)
- **Per-participant emissions**
- **Meal impact** with percentage breakdown
- **Transport impact** with percentage breakdown
- **Interactive pie chart** showing real-time breakdown by meal type and transport mode

### 🌍 Context Section
Compare your event or your personal habits to standard everyday scenarios:

- **Year of daily red meat**
- **Year of vegan diet**
- **Paris–Berlin by train**
- **Paris–Berlin by car**
- **Paris–Berlin by plane**
- **Paris–Tōkyō by plane**

Each scenario displays as a percentage of the **Paris Climate Agreement target**.

### 🌐 Language Support
- **Auto-detection**: App automatically loads in browser language (English or French)
- **Manual toggle**: Dropdown selector in header to switch languages
- **Bilingual content**: All text, labels, and calculations update instantly

---

## How Emissions Are Calculated

### Meals
```
Total meal emissions = Σ(meal_count × factor_per_meal)
```

### Transportation
```
Journey emissions = (people × distance_km × factor_per_km) / 1000
Total transport = Σ(journey_emissions)
```


### Results
```
Total event emissions = meal_emissions + transport_emissions
Per-participant emissions = total_emissions / participant_count
```


Following Labos1.5 computation method, from the distance as the crow flies between the city of departure and the city of destination, we apply the following multiplying factors: 1.3 for car travel, and 1.2 for train. For air travel, 95km is added to the raw distance.

### 📊 Export Feature
- **One-click export** to CSV
- Includes all entered data + calculations
- Lists all emissions factors used (for transparency & replication)
- Named with current export date, e.g.: `carbon-event-2026-01-15.csv`
- **Entirely local**: File generated and downloaded on your machine—no server upload

---

## Privacy & Data

✅ **100% local, no data collection:**

- All calculations happen in your browser
- No data transmission to any server
- No external API calls (except optional city lookup for coordinates)
- No cookies, no tracking, no storage
- Can be used offline completely
- Export file is generated locally and downloaded to your device

---

## Customization

### Changing Emissions Factors
Edit the constants in `constants.js`

For example
```javascript
const TRANSPORT_FACTORS = {
    walk: 0,
    bike: 5,
    car: 215.6,
    …
};
```

### Changing or Adding Language Strings
Edit the `TRANSLATIONS` object with your own translations.

### Changing Colours
Main colour palette:
- **Primary (forest green)**: `#2D5B3F`
- **Accent (gold)**: `#E8B859`
- **Background**: `#F8F9F6`
- **Error red**: `#C85A54`
- **Success green**: `#88C9A3`

---

## Files Included

1. **carbon-calculator.html** — Standalone HTML file with its JavaScript files (`js/constants.js` `js/app.js`) and and CSS (`css/style.css`) included. No dependencies. Just open in a browser.
   - Full bilingual support (EN/FR)
   - Real-time calculations & pie chart
   - **Export to CSV** button (for use in spreadsheets)
   - Works offline completely

2. **carbon-calculator-template.py** — Python script to generate an Excel/Calc template.
   - Run: `python3 carbon-calculator-template.py`
   - Creates: `carbon-event-template.xlsx`
   - Sheet 1: Interactive calculator with formulas
   - Sheet 2: Emissions factors reference & sources

3. **carbon-event-template.xlsx** — Pre-generated Excel template (same as above, ready to use)
   - No Python installation needed
   - Open directly in Excel/LibreOffice Calc/Google Sheets
   - All formulas built-in

4. **README.md** — This documentation file.

---

## Known Limitations

1. **Distance calculation**: Currently requires manual entry. The plan for GeoNames API integration would add automatic distance calculation, but this requires API keys and adds complexity.

2. **Flight categories**: Simplified into three distance bands, following Labo1.5 choices. Real-world variation depends on aircraft type, load factor, and other factors.

3. **Train emissions**: Based on either French high-speed trains (TGV) with very clean grid, or an average Western European train with relatively clean grids. Varies significantly by region and grid mix.

4. **Meal portions**: Standard meal size assumed. Portion variations not accounted for.

---

## Potential Future Enhancements

Potential features to add:

- [ ] GeoNames API integration for automatic city/distance lookup
- [ ] Export to PDF report
- [ ] Scenario comparison (e.g., "What if we take train instead of flying?")
- [ ] Integration with event management platforms

---

## Disclaimer

This software was partly generated by generative AI — which uses quite a bit of water and electricity. But it’s for a good cause: if your event convinces just one person to take the train instead of flying, this little simulator will have more than paid for itself 🤓


---

## Citation

If you would like to use this calculator for your conference, and if you would like to credit us, simply do a backlink to this Git repository.
This calculator has no scientific value; if you would still like to cite it in research or publications, cite as:

> Event Carbon Footprint Calculator. Étienne André. [Year of access].

---

- **Created**: 2026
- **Language**: English (with full French translation)
- **Version**: 1.0

---

## Frequently Asked Questions

**Q: Why is train so much lower than plane?**  
A: Take-off uses enormous fuel relative to cruise. On a 1000 km flight, take-off dominates emissions. On a train, energy is spread over the entire journey, and electric trains use low-carbon grids in Europe.

**Q: Can I use this for events outside Europe?**  
A: Yes, but adjust the train factor if your region uses coal-heavy grids. Car emissions are universal-ish. Flight emissions are consistent. Meal factors are based on global agricultural practices.

**Q: What about carbon offsets?**  
A: This calculator shows real emissions. Offsets are mentioned in context (Paris target), but purchasing offsets is a separate decision. The calculator helps understand what needs offsetting.

**Q: Does this include Scope 3 emissions (supply chain)?**  
A: Yes, all meal and transport factors are "cradle to home" or "well to wheel," including:
  - Meal: Growing, processing, transporting, cooking
  - Transport: Vehicle/aircraft manufacture, fuel extraction, maintenance
  - Non-CO₂ aviation effects: Contrails, NOx, etc.

**Q: Why use 2.3 tonnes as the target?**  
A: IPCC recommends ~2.3 tonnes CO₂e per capita per year to limit warming to 1.5°C by 2100. This is the global average needed. Many nations have this as policy (EU, UK, etc.).

---

## External sources and interesting Websites

### Interesting resources
- https://impactco2.fr/outils/alimentation#simulateur
- https://apps.labos1point5.org/travels-simulator
- https://apps.labos1point5.org/static/carbon/FacteursEmission_GES1point5_Juin2021.pdf
- https://a3nm.net/git/conference_footprint/

### Data
#### Scientific publications
- [The Carbon Footprint of Diets with Different Exclusions of Animal-Derived Products: Exploratory Polish Study](https://doi.org/10.3390/nu17081377)
- [Dietary greenhouse gas emissions of meat-eaters, fish-eaters, vegetarians and vegans in the UK](https://doi.org/10.1007/s10584-014-1169-1)
- [Carbon footprint of different methods of coffee preparation](https://doi.org/10.1016/j.spc.2021.04.004) (2021)

#### Others
- [Coffee: here’s the carbon cost of your daily cup – and how to make it climate‑friendly](https://doi.org/10.64628/AB.4styhx4ya) (2021)
- [Calculating the carbon footprint of transport](https://www.sncf-voyageurs.com/en/find-out-more-about-our-company/csr-and-transitions/calculating-the-carbon-footprint-of-transport/) (SNCF Voyageurs)
- [Which form of transport has the smallest carbon footprint?](https://ourworldindata.org/travel-carbon-footprint) (Our World in Data, 2023)
- [Greenhouse gas reporting: conversion factors 2024](https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2024) (UK Government, 2024)
- [You want to reduce the carbon footprint of your food? Focus on what you eat, not whether your food is local](https://ourworldindata.org/food-choice-vs-eating-local) (2020)
- [Peut-on décemment vivre en émettant moins de deux tonnes de CO2 par an en France ?](https://vert.eco/energie/peut-on-decemment-vivre-en-emettant-moins-de-deux-tonnes-de-co2-par-an-en-france/) (2023)

---

Enjoy calculating responsibly! 🌍
