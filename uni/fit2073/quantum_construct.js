$(document).ready(function() {
    // Language: javascript
    // Path: uni\fit2073\quantum_construct.js

    // Better scrollbars for all cards.
    $('.mdc-card__media').each(function(i) { window[`${this.id}__${i}-ps`] = new PerfectScrollbar(this); });

    // Instantiate MCD components.
    $('.mdc-text-field').each(function(i) { window[`${this.id}__${i}`] = mdc.textField.MDCTextField.attachTo(this); });
    $('.mdc-data-table').each(function(i) { window[`${this.id}__${i}`] = mdc.dataTable.MDCDataTable.attachTo(this); });
});

/**
 * Returns a random integer between the min and max (exclusive of upper bound).
 * 
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randInt(min, max) {
    if (!Number.isInteger(min)) throw new TypeError('min must be an integer!');
    if (!Number.isInteger(max)) throw new TypeError('max must be an integer!');
    if (min > max) throw new RangeError('min must be less than or equal to max!');

    return Math.floor(Math.random() * (max - min)) + min;
}

function intToRomanNumerals(num) {
    if (!Number.isInteger(num)) throw new TypeError('num must be an integer!');
    if (num < 1 || num > 3999) {
        console.warn(`Value '${num}' was outside of range [1, 3999]!`);
        return num.toString();
    }

    let roman = '',
        romanNumeral = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'],
        romanValue = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

    for (let i = 0; i < romanNumeral.length; i++) {
        while (num >= romanValue[i]) {
            roman += romanNumeral[i];
            num -= romanValue[i];
        }
    }

    return roman;
}

/**
 * Converts Roman numerals (or a stringified integer) to an integer.
 * 
 * @param {string} roman
 * @returns {number}
 */
function romanNumeralsToint(roman) {
    if (typeof roman !== 'string') throw new TypeError('roman must be a string!');
    if (roman.length === 0) return 0;

    // If the original value was > 3999 we would have the stringified version
    // of the original digits and should return those.
    if ($.isNumeric(roman)) return parseInt(roman);

    let num = 0,
        romanNumeral = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'],
        romanValue = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

    for (let i = 0; i < romanNumeral.length; i++) {
        while (roman.startsWith(romanNumeral[i])) {
            num += romanValue[i];
            roman = roman.substring(romanNumeral[i].length);
        }
    }

    return num;
}

/**
 * Side length of a standard room cell.
 */
const SINGLE_CELL_SIDE_LENGTH = 5;

/**
 * Possible types for a given room.
 */
const RoomTypes = {
    CURSED_HOUSE: 1,
    ANCIENT_TEMPLE: 2,
    PRODUCTION_PLANT: 3,
    LABORATORY: 4
}

/**
 * Cardinal directions for room cell adjacency.
 */
const Direction = {
    NORTH: 1,
    SOUTH: 2,
    EAST: 3,
    WEST: 4
}

class RoomCell {
    /**
     * Represents a single 'cell' of a room variant. These cells are always square.
     * 
     * @param {Room} ownedby}
     */
    constructor(ownedby) {
        if (!(ownedby instanceof Room) || ownedby === null) throw new TypeError('Ownedby must be a Room instance!');

        this.grid = Array(SINGLE_CELL_SIDE_LENGTH).fill(Array(SINGLE_CELL_SIDE_LENGTH).fill(null));

        this.__connNorth = null;
        this.__connEast = null;
        this.__connSouth = null;
        this.__connWest = null;
    }

    /**
     * Returns the adjacent room cell in the given direction, or null if there isn't one.
     * 
     * @param {Direction} direction 
     * @returns {RoomCell|null}
     */
    getConn(direction) {
        if (direction < 0 || direction > 4) throw new TypeError('Direction must be a Direction!');

        switch(direction) {
            case Direction.NORTH:
                return this.__connNorth;
            case Direction.EAST:
                return this.__connEast;
            case Direction.SOUTH:
                return this.__connSouth;
            case Direction.WEST:
                return this.__connWest;
        }
    }

    /**
     * Set the room cell in a given direction.
     * 
     * @param {Direction} direction 
     * @param {RoomCell|null} value 
     * @returns {this}
     */
    setConn(direction, value) {
        if (direction < 0 || direction > 4) throw new TypeError('Direction must be a Direction!');
        if (!(value instanceof RoomCell) && value !== null) throw new TypeError('Value must be a RoomCell or null!');

        switch(direction) {
            case Direction.NORTH:
                this.__connNorth = value;
                value.__connNorth = this;
                break;
            case Direction.EAST:
                this.__connEast = value;
                value.__connEast = this;
                break;
            case Direction.SOUTH:
                this.__connSouth = value;
                value.__connSouth = this;
                break;
            case Direction.WEST:
                this.__connWest = value;
                value.__connWest = this;
                break;
        }

        // For chaining.
        return this;
    }

    /**
     * 
     * @param {Token} token 
     * @param {number} x 
     * @param {number} y
     * @returns {this}
     */
    placeToken(token, x, y) {
        if (token === null) throw new TypeError('Token cannot be null!');
        if (x < 0 || x >= this.grid.length) throw new RangeError('X coordinate out of bounds!');
        if (y < 0 || y >= this.grid.length) throw new RangeError('Y coordinate out of bounds!');

        this.grid[x][y] = token;

        // For chaining.
        return this;
    }
}

class Room {
    /**
     * @param {RoomTypes} type
     * @param {number} cellCount
     * @param {[RoomCell]} layout
     * @param {boolean} waypointRoom
     */
    constructor(type, cellCount = 1, layout = [], waypointRoom = false) {
        this.type = type;
        this.cellCount = cellCount;
        this.layout = layout;
        this.waypointRoom = waypointRoom;

        this.__generateLayout(cellCount);
    }

    __generateWaypointRoom(small = true) {
        if (!(small instanceof boolean)) throw new TypeError('small must be a boolean!');

        // Waypoint rooms are either 1x1 or 2x2 standard cells in size.
        if (small) return [new RoomCell(this)]
        else {
            // TODO: Generate 2x2 layout.
            let [r1, r2, r3, r4] = Array.from({ length: 4 }, () => new RoomCell(this));
            return [
                r1.setConn(Direction.EAST, r2).setConn(Direction.NORTH, r3), r2,
                r3, r4.setConn(Direction.WEST, r3).setConn(Direction.SOUTH, r2)
            ]
        }
    }

    __generateLayout(cellCount, expandChance = 0.5, smallWaypointRoomChance = 0.5) {
        if (!Number.isInteger(cellCount)) throw new TypeError('cellCount must be an integer!');
        if (cellCount < 1) throw new RangeError('cellCount must be positive!');
        if (expandChance < 0 || expandChance > 100) throw new RangeError('expandChance must be between 0 and 100!');
        if (smallWaypointRoomChance < 0 || smallWaypointRoomChance > 100) throw new RangeError('smallWaypointRoomChance must be between 0 and 100!');

        // If this is supposed to be a waypoint room, just return that.
        if (this.waypointRoom) return this.__generateWaypointRoom(Math.random() < smallWaypointRoomChance);

        // If not a waypoint room, begin generating a random layout.
        let tempLayout = [new RoomCell(this)],
            currentCell = tempLayout[0];

        // Keep looping until we have enough cells.
        while (tempLayout.length < cellCount) {

            // For each non-null direction, expand in that direction.
            for (let d of [
                Math.random() < expandChance ? Direction.NORTH : null,
                Math.random() < expandChance ? Direction.EAST  : null,
                Math.random() < expandChance ? Direction.SOUTH : null,
                Math.random() < expandChance ? Direction.WEST  : null
            ]) {

                // Skip null values.
                if (d === null) continue;
                // avoid setting adjacencies when there is already an adjacent room in that direction.
                if (currentCell.getConn(d) !== null) continue;
                // Cut short if we have filled all the space we can.
                if (tempLayout.length >= cellCount) break;

                // Add new room in given direction.
                tempLayout.push((new RoomCell(this)).setConn(d, currentCell));
            }

            // Pick a new cell to expand from.
            currentCell = tempLayout[randInt(0, tempLayout.length)];
        }

        this.layout = tempLayout;
    }
}

class Token {
    /**
     * Constructs a basic item instance.
     * 
     * @param {string} name 
     * @param {string} description 
     * @param {string} image 
     */
    constructor(name, description, image) {
        this.name = name;
        this.description = description;
        this.image = image;
    }
}

class Item extends Token {
    /**
     * Constructs an item instance.
     * 
     * @param {string} name
     * @param {string} description
     * @param {string} image
     * @param {boolean} held
     */
    constructor(name, description, image, held) {
        super(name, description, image);
        this.held = held;
    }
}

class Weapon extends Item {
    /**
     * Constructs a weapon instance.
     *
     * @param {string} name
     * @param {string} description
     * @param {string} image
     * @param {number} damage
     * @param {number} rarity
     */
    constructor(name, description, image, damage, rarity) {
        super(name, description, image);
        this.damage = damage;
        this.rarity = rarity;
    }
}

/**
 * Uses calculateEnemyRangeGeneral to calculate the minimum and maximum bounds for the enemy's health.
 * 
 * @param {number} stackHeight
 * @param {number} minBound
 * @param {number} maxBound
 * @param {number} vDilation
 * @param {number} hDilation
 * @returns {[number, number]}
 */
function calculateEnemyHealthRange(stackHeight,  minBound = 1, maxBound = 100, vDilation = 5, hDilation = 36.7) {
    return calculateEnemyRangeGeneral(stackHeight, minBound, maxBound, vDilation, hDilation);
}

/**
 * Uses calculateEnemyRangeGeneral to calculate the minimum and maximum bounds for the enemy's damage.
 * 
 * @param {number} stackHeight
 * @param {number} minBound
 * @param {number} maxBound
 * @param {number} vDilation
 * @param {number} hDilation
 * @returns {[number, number]}
 */
function calculateEnemyDamageRange(stackHeight,  minBound = 1, maxBound = 50, vDilation = 0.137, hDilation = 33.7) {
    return calculateEnemyRangeGeneral(stackHeight, minBound, maxBound, vDilation, hDilation);
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
function calculateEnemyRangeGeneral(stackHeight,  minBound, maxBound, vDilation, hDilation) {
    if (!Number.isInteger(stackHeight)) throw new TypeError('stackHeight must be an integer!');
    if (stackHeight < 1) throw new RangeError('stackHeight must be positive!')
    if (minBound < 1) throw new RangeError('minBound must be positive!')
    if (maxBound < 1) throw new RangeError('maxBound must be positive!')
    if (minBound > maxBound) throw new RangeError('minBound must be less than or equal to maxBound!')

    const res = Math.max(
        minBound,
        Math.min(
            maxBound,
            Math.floor(
                hDilation * Math.log10(vDilation * stackHeight + 1) + 1
            )
        )
    );

    return [res / 2, res];
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

    return Math.floor(hDilation * Math.log10(vDilation * stackHeight + 1) + 1);
}

/**
 * Calculates the rarity of a weapon based on the overall dimensions of the room stack.
 * 
 * @param {number} stackWidth
 * @param {number} stackHeight
 * @param {number} hDilation
 * @returns {number}
 */
function calculateWeaponRarity(stackWidth, stackHeight, hDilation = 0.09) {
    if (!Number.isInteger(stackWidth)) throw new TypeError('stackWidth must be an integer!');
    if (stackWidth < 1) throw new RangeError('stackWidth must be positive!')
    if (!Number.isInteger(stackHeight)) throw new TypeError('stackHeight must be an integer!');
    if (stackHeight < 1) throw new RangeError('stackHeight must be positive!')

    return Math.floor(stackWidth * stackHeight * hDilation + stackWidth * hDilation + 1);
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
function calculateWeaponRarityStatIncreasePercentage(rarity, maxBound = 80, vDilation = 1.633, hTranslation = -1.633) {
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