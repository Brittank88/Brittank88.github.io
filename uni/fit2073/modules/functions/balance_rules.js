/**
 * Uses calculateEnemyStatExtraRangeGeneral to calculate the minimum and maximum bounds for the enemy's health.
 * 
 * @param {number} stackHeight
 * @param {number} minBound
 * @param {number} maxBound
 * @param {number} vDilation
 * @param {number} hDilation
 * @returns {[number, number]}
 */
 function calculateEnemyHealthExtraRange(stackHeight,  minBound = 1, maxBound = 100, vDilation = 5, hDilation = 36.7) {
    return calculateEnemyStatExtraRangeGeneral(stackHeight, minBound, maxBound, vDilation, hDilation);
}

/**
 * Uses calculateEnemyStatExtraRangeGeneral to calculate the minimum and maximum bounds for the enemy's damage.
 * 
 * @param {number} stackHeight
 * @param {number} minBound
 * @param {number} maxBound
 * @param {number} vDilation
 * @param {number} hDilation
 * @returns {[number, number]}
 */
function calculateEnemyDamageExtraRange(stackHeight,  minBound = 1, maxBound = 50, vDilation = 0.137, hDilation = 33.7) {
    return calculateEnemyStatExtraRangeGeneral(stackHeight, minBound, maxBound, vDilation, hDilation);
}

/**
 * Calculates a minimum and maximum range for an enemy's statistics based on the height of the stack, bounds to clamp between, and the dilation factors.
 * 
 * @param {number} stackHeight
 * @param {number} minBound
 * @param {number} maxBound
 * @param {number} vDilation
 * @param {number} hDilation
 * @returns {[number, number]}
 */
function calculateEnemyStatExtraRangeGeneral(stackHeight,  minBound, maxBound, vDilation, hDilation) {
    if (!Number.isInteger(stackHeight)) throw new TypeError('stackHeight must be an integer!');
    if (stackHeight < 1) throw new RangeError('stackHeight must be positive!')
    if (minBound < 1) throw new RangeError('minBound must be positive!')
    if (maxBound < 1) throw new RangeError('maxBound must be positive!')
    if (minBound > maxBound) throw new RangeError('minBound must be less than or equal to maxBound!')

    // No extra stats in first room.
    stackHeight -= 1;
    if (stackHeight === 0) return [0, 0];

    const res = Math.max(
        minBound,
        Math.min(
            maxBound,
            Math.floor(
                hDilation * Math.log10(vDilation * stackHeight + 1) + 1
            )
        )
    );

    return [Math.round(res / 2), res];
}

/**
 * Calculates the amount of enemies that will spawn per cell, based on the height of the room stack.
 * 
 * @param {number} stackHeight
 * @param {number} vDilation
 * @param {number} hDilation
 * @returns {number}
 */
function calculateEnemiesPerCell(stackHeight, vDilation = 1, hDilation = 6.6) {
    if (!Number.isInteger(stackHeight)) throw new TypeError('stackHeight must be an integer!');
    if (stackHeight < 1) throw new RangeError('stackHeight must be positive!')

    return Math.floor(hDilation * Math.log10(vDilation * stackHeight) + 1);
}

/**
 * Calculates the rarity of a weapon based on the overall dimensions of the room stack,
 * as well as an initial variance in possible discovery-time rarities.
 * 
 * @param {number} stackWidth
 * @param {number} stackHeight
 * @param {number} maxRarityUponDiscovery
 * @param {number} hDilation
 * @returns {number}
 */
function calculateItemExtraRarity(stackWidth, stackHeight, hDilation = 0.09) {
    if (!Number.isInteger(stackWidth)) throw new TypeError('stackWidth must be an integer!');
    if (stackWidth < 1) throw new RangeError('stackWidth must be positive!')
    if (!Number.isInteger(stackHeight)) throw new TypeError('stackHeight must be an integer!');
    if (stackHeight < 1) throw new RangeError('stackHeight must be positive!')

    let stackDimProduct = stackWidth * stackHeight;

    return Math.floor(stackDimProduct * hDilation + stackWidth * hDilation + stackDimProduct !== 1);
}

/**
 * Calculates the stat increase % of an item via its current rarity.
 * 
 * @param {number} rarity
 * @param {number} maxBound
 * @param {number} vDilation
 * @param {number} hTranslation
 * @returns {number}
 */
function calculateItemRarityStatIncreasePercentage(rarity, maxBound = 80, vDilation = 1.633, hTranslation = -1.633) {
    if (!Number.isInteger(rarity)) throw new TypeError('rarity must be an integer!');
    if (rarity < 1) throw new RangeError('rarity must be positive!')
    if (maxBound <= 0) throw new RangeError('maxBound must be positive!');

    return Math.floor(Math.min(maxBound, vDilation * rarity + hTranslation));
}

/**
 * Calculates the value of a statistic after being augmented by the given percentage increase.
 * 
 * @param {number} stat
 * @param {number} increasePercentage
 * @returns {number}
 */
function applyStatIncreasePercentage(stat, increasePercentage) {
    if (increasePercentage < 0) throw new RangeError('increasePercentage must be positive!');
    if (increasePercentage > 100) throw new RangeError('increasePercentage must be less than or equal to 100!');

    return stat + stat * (increasePercentage / 100);
}

/**
 * Calculates the chance of a key item spawning based on how many times a room of the same type has been visited.
 * 
 * @param {number} roomTypeVisitCount 
 * @returns {number}
 */
function calculateKeyItemSpawnChance(roomTypeVisitCount) {
    if (!(Number.isInteger(roomTypeVisitCount))) throw new TypeError('roomTypeVisitCount must be an integer!');
    if (roomTypeVisitCount < 0) throw new RangeError('roomTypeVisitCount must be >= 0!');

    return roomTypeVisitCount > 20 * Math.PI ? 80 : 40 * (Math.sin(0.05 * roomTypeVisitCount + 1.5 * Math.PI) + 1);
}

export {
    calculateEnemyHealthExtraRange, calculateEnemyDamageExtraRange, calculateEnemiesPerCell,
    calculateItemExtraRarity, calculateItemRarityStatIncreasePercentage, applyStatIncreasePercentage,
    calculateKeyItemSpawnChance
};