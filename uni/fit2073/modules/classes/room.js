import { RoomTypes, Direction } from '../enums/enums.js';
import { Token } from './token.js';
import { SINGLE_CELL_SIDE_LENGTH } from '../consts/consts.js';

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

export { RoomCell, Room };