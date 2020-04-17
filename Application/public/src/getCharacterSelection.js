const doGetCharacters = async (e) => {
    e.preventDefault();

    const res = await getCharacters();

    if (res !== null) {
        inst.generateCharacters();
    }
};