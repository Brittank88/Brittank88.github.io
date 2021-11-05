$(document).ready(function() {
    // Language: javascript
    // Path: uni\fit2073\quantum_construct.js

    // Better scrollbars for all cards.
    $('.mdc-card__media').each(function(i) { window[`card-${i}-ps`] = new PerfectScrollbar(this); });

    // Instantiate MCD textfield components.
    $('.mdc-text-field').each(function() { mdc.textField.MDCTextField.attachTo(this); });
});

/**
 * @param {number} roomHeight
 * @param {number} minBound
 * @param {number} maxBound
 * @param {number} vDilation
 * @param {number} hDilation
 * @returns {number[]}
 */
function calculateEnemyHealthRange(roomHeight,  minBound = 1, maxBound = 100, vDilation = 5, hDilation = 36.7) {
    if (roomHeight < 1) throw new ValueError('Room height must be a positive integer!')
    if (minBound < 1) throw new ValueError('minBound must be a positive integer!')
    if (maxBound < 1) throw new ValueError('maxBound must be a positive integer!')
    if (minBound > maxBound) throw new ValueError('minBound must be less than or equal to maxBound!')

    const res = Math.max(
        minBound,
        Math.min(
            maxBound,
            Math.floor(
                hDilation * Math.log10(vDilation * roomHeight + 1) + 1
            )
        )
    );

    return (res, res / 2);
}

