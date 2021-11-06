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

export { Token, Item, Weapon };