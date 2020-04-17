console.log('poo');
const mysql = require('mysql');
const connection = require('../db-config');
const {
    ALL_CHARACTERS,
    CLASS_CHARACTERS,
    SINGLE_CHARACTER,
    INSERT_CHARACTER,
    UPDATE_CHARACTER,
    DELETE_CHARACTER,
} = require('../queries/character.queries');
const query = require('../utils/query');
const {
    serverError
} = require('../utils/handlers');

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 */

// http://localhost:3000/characters
exports.getAllCharacters = async (req, res) => {
    // establish connection
    const con = await connection().catch((err) => {
        throw err;
    });

    // query all characters
    const characters = await query(con, ALL_CHARACTERS(), []).catch(
        serverError(res)
    );

    // [] === true, 0 === false
    if (!characters.length) {
        res.status(200).json({
            msg: 'No characters are available at this time.'
        });
    }
    res.json(characters);
};

exports.getClassCharacters = async (req, res) => {
    // establish connection
    const con = await connection().catch((err) => {
        throw err;
    });
    // query characters by class and level
    const classCharacters = await query(con, CLASS_CHARACTERS(req.params.characterClass, req.params.characterLevel), []).catch(
        serverError(res)
    );

    // [] === true, 0 === false
    if (!classCharacters.length) {
        res.status(200).json({
            msg: 'No characters of this class and level are available at this time.'
        });
    }
    res.json(classCharacters);
};

// http://localhost:3000/characters/1
exports.getCharacter = async (req, res) => {
    // establish connection
    const con = await connection().catch((err) => {
        throw err;
    });

    // query all task
    const character = await query(
        con,
        SINGLE_CHARACTER(req.params.characterId)
    ).catch(serverError(res));

    if (!character.length) {
        res.status(400).json({
            msg: 'No character available by this id.'
        });
    }
    res.json(character);
};

// http://localhost:3000/characters
exports.createCharacter = async (req, res) => {
    // verify valid token
    const user = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

    // query add character
    const characterName = mysql.escape(req.body.character_name);
    const characterRace = mysql.escape(req.body.character_race);
    const characterClass = mysql.escape(req.body.character_class);
    const characterBuild = mysql.escape(req.body.character_build);
    const characterLevel = mysql.escape(req.body.character_level);
    const characterSheet = mysql.escape(req.body.character_sheet);
    const characterImage = mysql.escape(req.body.character_image);
    const result = await query(con, INSERT_CHARACTER(characterName, characterRace, characterClass, characterBuild, characterLevel, characterSheet, characterImage)).catch(
        serverError(res)
    );

    if (result.affectedRows !== 1) {
        res
            .status(500)
            .json({
                msg: `Unable to add character: ${req.body.character_name}`
            });
    }
    res.json({
        msg: 'Added character successfully!'
    });
};

/**
 * Build up values string.
 *
 * @example
 * 'key1 = value1, key2 = value2, ...'
 * "character_name = \'Bentrirri Stoneeyes\', character_race = \'Gnome, Deep\', date = \'<today's_date>\'"
 */
const _buildValuesString = (req) => {
    const body = req.body;
    const values = Object.keys(body).map(
        // [character_name, character_race, ...].map()
        (key) => `${key} = ${mysql.escape(body[key])}` // 'New 1 character name'
    );

    values.push(`created_date = NOW()`); // update current date and time
    values.join(', '); // make into a string
    return values;
};

// http://localhost:3000/characters/1
/**
 * PUT request -
 * {
 *  name: 'Bentrirri Stoneeyes',
 *  race: 'Gnome, Deep'
 * }
 */
exports.updateCharacter = async (req, res) => {
    // establish connection
    const con = await connection().catch((err) => {
        throw err;
    });
    const values = _buildValuesString(req);

    // query update character
    const result = await query(
        con,
        UPDATE_CHARACTER(req.params.characterId, values)
    ).catch(serverError(res));

    if (result.affectedRows !== 1) {
        res
            .status(500)
            .json({
                msg: `Unable to update character: '${req.body.character_name}'`
            });
    }
    res.json(result);
};

// http://localhost:3000/characters/1
exports.deleteCharacter = async (req, res) => {
    // establish connection
    const con = await connection().catch((err) => {
        throw err;
    });

    // query delete task
    const result = await query(
        con,
        DELETE_CHARACTER(req.params.characterId)
    ).catch(serverError(res));

    if (result.affectedRows !== 1) {
        res
            .status(500)
            .json({
                msg: `Unable to delete task at: ${req.params.characterId}`
            });
    }
    res.json({
        msg: 'Deleted successfully.'
    });
};