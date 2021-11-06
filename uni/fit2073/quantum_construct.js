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
    let stackWidth = numOfInputElement($('input[aria-labelledby=stack-width-tf-label]'));
    let stackHeight = numOfInputElement($('input[aria-labelledby=stack-height-tf-label]'));

    updateEnemyTable(stackHeight === null ? 1 : stackHeight);
    //updateWeaponTable(stackWidth === null ? 1 : stackWidth, stackHeight === null ? 1 : stackHeight)
}

function updateEnemyTable(stackHeight = 1) {
    let cols = window['dt__enemy-stats__attachment'].getCols();

    for (let i = 0; i < window['dt__enemy-stats__attachment'].getRows().length; i++) {
        let cellOfFirstCol = $(cols[0][i]);

        // Health
        let extraHealth = [...new Set(
            calculateEnemyHealthExtraRange(stackHeight)
            .map(v => enemyStats[stringToEnemyType[cellOfFirstCol.text()]].maxHealth + v)
        )];

        $(cols[2][i]).text(extraHealth.join(' - '));

        // Damage
        let extraDamage = [...new Set(
            calculateEnemyDamageExtraRange(stackHeight)
            .map(v => enemyStats[stringToEnemyType[cellOfFirstCol.text()]].maxDamage + v)
        )];

        $(cols[3][i]).text(extraDamage.join(' - '));

        // Per Cell
        $(cols[4][i]).text(calculateEnemiesPerCell(stackHeight));
    }
}

function updateWeaponTable(stackWidth = 1, stackHeight = 1) {
    let cols = window['dt__weapon-stats__attachment'].getCols();

    for (let i = 0; i < window['dt__weapon-stats__attachment'].getRows().length; i++) {
        let cellOfCol4 = $(cols[4][i]),
            cellOfCol4Text = cellOfCol4.text();

        // Rarity.
        let rarity = calculateItemRarity(stackWidth, stackHeight);

        cellOfCol4.text(
            intToRomanNumerals(rarity) === cellOfCol4Text ?
            intToRomanNumerals(romanNumeralsToInt(cellOfCol4Text) + rarity) :
            cellOfCol4Text
        );
    }
}