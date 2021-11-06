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

const EnemyTypes = {
    LUNATIC_CULTIST: 1,
    DEMON: 2,
    VENGEFUL_SPIRIT: 3,
    SKELETAL_WARRIOR: 4, 
    ANCIENT_GUARDIAN: 5, 
    MOSSY_GOLEM: 6, 
    TURRET: 7, 
    SPIDER_MECH: 8, 
    SURVEILLANCE_DRONE: 9, 
    CHEM_TURRET: 10, 
    CYBORG: 11, 
    MUTATED_ZOMBIE: 12
}

const stringToEnemyType = {
    'Lunatic Cultist': EnemyTypes.LUNATIC_CULTIST,
    'Demon': EnemyTypes.DEMON,
    'Vengeful Spirit': EnemyTypes.VENGEFUL_SPIRIT,
    'Skeletal Warrior': EnemyTypes.SKELETAL_WARRIOR, 
    'Ancient Guardian': EnemyTypes.ANCIENT_GUARDIAN, 
    'Mossy Golem': EnemyTypes.MOSSY_GOLEM, 
    'Turret': EnemyTypes.TURRET, 
    'Spider Mech': EnemyTypes.SPIDER_MECH, 
    'Surveillance Drone': EnemyTypes.SURVEILLANCE_DRONE, 
    'Chem Turret': EnemyTypes.CHEM_TURRET, 
    'Cyborg': EnemyTypes.CYBORG, 
    'Mutated Zombie': EnemyTypes.MUTATED_ZOMBIE
}

const enemyStats = {
    1: {
        name: 'Lunatic Cultist',
        maxHealth: 50,
        maxDamage: 15
    },
    2: {
        name: 'Demon',
        maxHealth: 100,
        maxDamage: 20
    },
    3: {
        name: 'Vengeful Spirit',
        maxHealth: 30,
        maxDamage: 10
    },
    4: {
        name: 'Skeletal Warrior',
        maxHealth: 30,
        maxDamage: 10
    },
    5: {
        name: 'Ancient Guardian',
        maxHealth: 100,
        maxDamage: 20
    },
    6: {
        name: 'Mossy Golem',
        maxHealth: 50,
        maxDamage: 15
    },
    7: {
        name: 'Turret',
        maxHealth: 30,
        maxDamage: 15
    },
    8: {
        name: 'Spider Mech',
        maxHealth: 100,
        maxDamage: 20
    },
    9: {
        name: 'Surveillance Drone',
        maxHealth: 30,
        maxDamage: 10
    },
    10: {
        name: 'Chem Turret',
        maxHealth: 50,
        maxDamage: 20
    },
    11: {
        name: 'Cyborg',
        maxHealth: 100,
        maxDamage: 20
    },
    12: {
        name: 'Mutated Zombie',
        maxHealth: 30,
        maxDamage: 15
    }
}

const WeaponTypes = {
    CURSED_TOME: 1,
    SACRIFICIAL_DAGGER: 2,
    SHOTGUN: 3,
    BRASS_LONGSWORD: 4,
    STONE: 5,
    WOODEN_BOW: 6,
    CROWBAR: 7,
    CANISTER: 8,
    MOLOTOV: 9,
    TASER: 10,
    PISTOL: 11,
    LASER_PISTOL: 12
}

const stringToWeaponType = {
    'Cursed Tome': WeaponTypes.CURSED_TOME,
    'Sacrificial Dagger': WeaponTypes.SACRIFICIAL_DAGGER,
    'Shotgun': WeaponTypes.SHOTGUN,
    'Brass Longsword': WeaponTypes.BRASS_LONGSWORD,
    'Stone': WeaponTypes.STONE,
    'Wooden Bow': WeaponTypes.WOODEN_BOW,
    'Crowbar': WeaponTypes.CROWBAR,
    'Canister': WeaponTypes.CANISTER,
    'Molotov': WeaponTypes.MOLOTOV,
    'Taser': WeaponTypes.TASER,
    'Pistol': WeaponTypes.PISTOL,
    'Laser Pistol': WeaponTypes.LASER_PISTOL
}

const weaponStats = {
    1: {
        name: 'Cursed Tome',
        maxDamage: 15,
        maxDamageExtraStr: '',
        maxRange: 1,
        maxRangeExtraStr: '',
        maxRarityUponDiscovery: 1
    },
    2: {
        name: 'Sacrificial Dagger',
        maxDamage: 20,
        maxDamageExtraStr: ' (1st Hit: +25%)',
        maxRange: 1,
        maxRangeExtraStr: '',
        maxRarityUponDiscovery: 2
    },
    3: {
        name: 'Shotgun',
        maxDamage: 30,
        maxDamageExtraStr: '',
        maxRange: null,
        maxRangeExtraStr: 'Line of Sight',
        maxRarityUponDiscovery: 1
    },
    4: {
        name: 'Brass Longsword',
        maxDamage: 20,
        maxDamageExtraStr: '',
        maxRange: 1,
        maxRangeExtraStr: '',
        maxRarityUponDiscovery: 2
    },
    5: {
        name: 'Stone',
        maxDamage: 15,
        maxDamageExtraStr: ' (Throw: -10%)',
        maxRange: 2,
        maxRangeExtraStr: '',
        maxRarityUponDiscovery: 1
    },
    6: {
        name: 'Wooden Bow',
        maxDamage: 20,
        maxDamageExtraStr: '',
        maxRange: 5,
        maxRangeExtraStr: '',
        maxRarityUponDiscovery: 2
    },
    7: {
        name: 'Crowbar',
        maxDamage: 25,
        maxDamageExtraStr: '',
        maxRange: 1,
        maxRangeExtraStr: '',
        maxRarityUponDiscovery: 2
    },
    8: {
        name: 'Canister',
        maxDamage: 20,
        maxDamageExtraStr: ' (Blast: 50)',
        maxRange: 4,
        maxRangeExtraStr: ' (Blast: 3)',
        maxRarityUponDiscovery: 2
    },
    9: {
        name: 'Molotov',
        maxDamage: 15,
        maxDamageExtraStr: '',
        maxRange: 4,
        maxRangeExtraStr: ' (Blast: 1)',
        maxRarityUponDiscovery: 2
    },
    10: {
        name: 'Taser',
        maxDamage: 10,
        maxDamageExtraStr: '',
        maxRange: 1,
        maxRangeExtraStr: '',
        maxRarityUponDiscovery: 3
    },
    11: {
        name: 'Pistol',
        maxDamage: 35,
        maxDamageExtraStr: '',
        maxRange: 6,
        maxRangeExtraStr: '',
        maxRarityUponDiscovery: 2
    },
    12: {
        name: 'Laser Pistol',
        maxDamage: null,
        maxDamageExtraStr: '50%',
        maxRange: null,
        maxRangeExtraStr: '\u{eb3d}',
        maxRarityUponDiscovery: 5
    }
}

export { RoomTypes, Direction, EnemyTypes, stringToEnemyType, enemyStats, WeaponTypes, stringToWeaponType, weaponStats };