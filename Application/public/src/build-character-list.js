/**
 * @class CharacterList
 *
 * Creates a list of characters and updates a list
 */

class CharacterList {
    characters = [];

    constructor() {}

    /**
     * Build character list parent.
     */
    createCharacterListParent = () => {
        const ul = document.createElement('ul');
        ul.id = 'character-list';
        ul.className = 'characters';
        return ul;
    };

    getRequestedCharacterClass = () => {
        const classSelect = document.getElementById('class');
        const classOptions = classSelect.options;
        const selectedClass = classSelect.selectedIndex;
        const classStatus = classOptions[selectedClass].text;
        return classStatus;
    }

    getRequestedCharacterLevel = () => {
        const levelSelect = document.getElementById('level');
        const levelOptions = levelSelect.options;
        const selectedLevel = levelSelect.selectedIndex;
        const levelStatus = levelOptions[selectedLevel].value;
        return levelStatus;
    }

    // _deleteEventHandler = (characterId) => async () => {
    //     if (characterId) {
    //         const res = await deleteCharacter(characterId);

    //         if (res !== null) {
    //             this.characters = this.characters.filter((character) => character.character_id !== characterId);
    //             const character = document.getElementById(`character-${characterId}`);
    //             character.remove();

    //             if (!this.characters.length) {
    //                 const div = document.getElementById('characters');
    //                 const loadingDiv = div.childNodes[1];
    //                 const errDiv = this.generateErrorMsg('Create some new characters!');
    //                 div.replaceChild(errDiv, loadingDiv);
    //             }
    //         }
    //     }
    // };

    /**
     * Builds the character card.
     * @example
     * <li class="character-item">
     *   <div class="character-card">
     *     <div class="character-image">
     *       <img src="./images/characters/Tinker.png" alt="Tinker">
     *     </div>
     *     <div class="character-content">
     *       <h2 class="character-name">Tinker</h2>
     *       <h3 class="character-class">Artificer 9: Artillerist</h3>
     *       <p class="character-race">Warforged</p>
     *       <a class="character-sheet" href="./characters/9/Artificer 9 [Artillerist] - Tinker.pdf">Download File</a>
     *     </div>
     *   </div>
     * </li>
     */

    buildCharacterListItem = (character) => {
        const characterItem = document.createElement('li');
        characterItem.id = `character-${character.character_id}`; // character-1
        characterItem.className = 'character-item';

        const characterCard = document.createElement('div');
        characterCard.className = 'character-card';

        const characterImage = document.createElement('div');
        characterImage.className = 'character-image';
        characterImage.innerHTML = '<img src="./images/characters/' + character.character_image + '" alt="' + character.character_name + '" />';

        const characterContent = document.createElement('div');
        characterContent.className = 'character-content';

        const characterName = document.createElement('h2');
        characterName.className = 'character-name';
        const characterNameText = document.createTextNode(character.character_name);
        characterName.appendChild(characterNameText);

        const characterClass = document.createElement('h3');
        characterClass.className = 'character-class';
        const characterClassText = document.createTextNode(character.character_class + ' ' + character.character_level + ': ' + character.character_build);
        characterClass.appendChild(characterClassText);

        const characterRace = document.createElement('p');
        characterRace.className = 'character-race';
        const characterRaceText = document.createTextNode(character.character_race);
        characterRace.appendChild(characterRaceText);

        const characterSheet = document.createElement('a');
        characterSheet.className = 'character-sheet';
        const characterSheetLink = './pdf/characters/' + character.character_level + '/' + character.character_sheet;
        characterSheet.setAttribute('href', characterSheetLink);
        const characterSheetLinkText = document.createTextNode('Download');
        characterSheet.appendChild(characterSheetLinkText);

        // add list item's details
        characterCard.appendChild(characterImage);
        characterContent.appendChild(characterName);
        characterContent.appendChild(characterClass);
        characterContent.appendChild(characterRace);
        characterContent.appendChild(characterSheet);
        characterCard.appendChild(characterContent);
        characterItem.appendChild(characterCard);

        if (character.character_class.toString() != this.getRequestedCharacterClass() || character.character_level.toString() != this.getRequestedCharacterLevel()) {
            characterItem.style.display = "none";
        } else {
            characterItem.style.display = "block";
        }

        return characterItem;
    };

    /**
     * Assembles the list items then mounts them to a parent node.
     */
    buildCharacterList = (mount, characters) =>
        characters.map((character) => {
            const characterListItem = this.buildCharacterListItem(character);

            // add entire list item
            mount.append(characterListItem);
        });

    generateErrorMsg = (msg) => {
        const div = document.createElement('div');
        const text = document.createTextNode(msg);
        div.id = 'user-message';
        div.className = 'center';
        div.appendChild(text);
        return div;
    };

    generateCharacters = async () => {
        const res = await getCharacters();
        const div = document.getElementById('characters');
        const loadingDiv = div.childNodes[1];

        if (res.length) {
            this.characters = res;
            const charactersDiv = this.createCharacterListParent();
            this.buildCharacterList(charactersDiv, res);
            div.replaceChild(charactersDiv, loadingDiv);
        } else {
            const errDiv = this.generateErrorMsg(res.msg);
            div.replaceChild(errDiv, loadingDiv);
        }
    };
}

const inst = new CharacterList();

// This is an IIFE (Immediately Invoked Function Expression).
(async () => {
    inst.generateCharacters();
})();