const CHARACTER_API = `${BASE_API_URL}/characters`; // http://localhost:3000/api/characters

const getCharacters = () => _get(CHARACTER_API, OPTIONS_WITH_AUTH);

const getClassCharacters = (characterClass, characterLevel) => _get(`${CHARACTER_API}/${characterClass}/${characterLevel}`, DEFAULT_OPTIONS_WITH_AUTH);

const addCharacter = (formData) =>
    _post(CHARACTER_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

const deleteCharacter = (characterId) =>
    _delete(`${CHARACTER_API}/${characterId}`, OPTIONS_WITH_AUTH);