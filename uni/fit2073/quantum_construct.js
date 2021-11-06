import * as helper_funcs from './modules/functions/helper.js';
helper_funcs.importAll(helper_funcs, window);

import * as enums from './modules/enums/enums.js';
helper_funcs.importAll(enums, window);

import * as balance_funcs from './modules/functions/balance_rules.js';
helper_funcs.importAll(balance_funcs, window);

$(document).ready(function() {
    // Language: javascript
    // Path: uni\fit2073\quantum_construct.js

    // Better scrollbars for all cards.
    $('.mdc-card__media').each(function(i) { window[`${this.id}__${i}-ps`] = new PerfectScrollbar(this); });

    // Instantiate MCD components.
    $('.mdc-text-field').each(function() { window[`${this.id}__attachment`] = mdc.textField.MDCTextField.attachTo(this); });
    $('.mdc-data-table').each(function() { window[`${this.id}__attachment`] = mdc.dataTable.MDCDataTable.attachTo(this); });

    // Validators for input fields.
    $('input.validatePosInt').each(function() { this.setAttribute('oninput', 'validateInputElement(event, numOfInputElement, posIntInputValidator)'); });
    $('input.validateZeroOrPosInt').each(function() { this.setAttribute('oninput', 'validateInputElement(event, numOfInputElement, zeroOrPosIntInputValidator)'); });
    $('input.validatePosNum').each(function() { this.setAttribute('oninput', 'validateInputElement(event, numOfInputElement, posNumInputValidator)'); });
    $('input.validateZeroOrPosNum').each(function() { this.setAttribute('oninput', 'validateInputElement(event, numOfInputElement, zeroOrPosNumInputValidator)'); });

    // Events for user input.
    let stackWidthOnInputFn = $('input[aria-labelledby=stack-width-tf-label]')[0].oninput;
    $('input[aria-labelledby=stack-width-tf-label]')[0].oninput = function(event) { stackWidthOnInputFn(event); updateData(); };
    let stackHeightOnInputFn = $('input[aria-labelledby=stack-height-tf-label]')[0].oninput;
    $('input[aria-labelledby=stack-height-tf-label]')[0].oninput = function(event) { stackHeightOnInputFn(event); updateData(); };  
});

function updateData() {
    let [
        stackWidth, stackHeight
    ] = [
        ...['width', 'height'].map(s => helper_funcs.numOfInputElement($(`input[aria-labelledby=stack-${s}-tf-label]`)))
    ];

    updateEnemyTable(stackHeight === null ? 1 : stackHeight);
    updateWeaponTable(stackWidth === null ? 1 : stackWidth, stackHeight === null ? 1 : stackHeight)
}

function updateEnemyTable(stackHeight = 1) {

    let enemyStatsDT = window['dt__enemy-stats__attachment'],
        cols = enemyStatsDT.getCols();

    for (let i = 0; i < enemyStatsDT.getRows().length; i++) {

        let enemyStats = enums.enemyStats[enums.stringToEnemyType[$(cols[0][i]).text()]];

        // Health
        let extraHealth = [...new Set(
            balance_funcs.calculateEnemyHealthExtraRange(stackHeight)
            .map(v => enemyStats.maxHealth + v)
        )];

        $(cols[2][i]).text(extraHealth.join(' - '));

        // Damage
        let extraDamage = [...new Set(
            balance_funcs.calculateEnemyDamageExtraRange(stackHeight)
            .map(v => enemyStats.maxDamage + v)
        )];

        $(cols[3][i]).text(extraDamage.join(' - '));

        // Per Cell
        $(cols[4][i]).text(balance_funcs.calculateEnemiesPerCell(stackHeight));
    }
}

function updateWeaponTable(stackWidth = 1, stackHeight = 1) {

    let weaponStatsDT = window['dt__weapon-stats__attachment'],
        cols = weaponStatsDT.getCols();

    for (let i = 0; i < weaponStatsDT.getRows().length; i++) {

        let weaponType = enums.stringToWeaponType[$(cols[0][i]).text()],
            weaponStats = enums.weaponStats[weaponType];

        // Rarity.

        let rarity = weaponStats.maxRarityUponDiscovery + balance_funcs.calculateItemExtraRarity(stackWidth, stackHeight);

        $(cols[4][i]).text(helper_funcs.intToRomanNumerals(rarity));

        let rarityStatIncreasePercent = balance_funcs.calculateItemRarityStatIncreasePercentage(rarity);

        // Damage.

        let damageBounds = weaponStats.maxDamage === null ?
        [''] :
        [
            weaponStats.maxDamage,
            Math.ceil(balance_funcs.applyStatIncreasePercentage(weaponStats.maxDamage, rarityStatIncreasePercent))
        ]

        $(cols[2][i]).text(damageBounds.map(d => `${d}` + weaponStats.maxDamageExtraStr).join(' - '));
    }
}