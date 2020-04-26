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

    /**
     *Gets the currently selected class from the form so that the displayed results can be filtered.
     *
     * @memberof CharacterList
     */
    getRequestedCharacterClass = () => {
        const classSelect = document.getElementById('class');
        const classOptions = classSelect.options;
        const selectedClass = classSelect.selectedIndex;
        const classStatus = classOptions[selectedClass].text;
        return classStatus;
    }

    /**
     *  Gets the currently selected character level from th eform so that the displayed results can be filteres
     *
     * @memberof CharacterList
     */
    getRequestedCharacterLevel = () => {
        const levelSelect = document.getElementById('level');
        const levelOptions = levelSelect.options;
        const selectedLevel = levelSelect.selectedIndex;
        const levelStatus = levelOptions[selectedLevel].value;
        return levelStatus;
    }

    /**
     * Builds the character card.
     * 
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

        /* Dynamically reates the link for the character image using information from the database */
        characterImage.className = 'character-image';
        characterImage.innerHTML = '<img src="./images/characters/' + character.character_image + '" alt="' + character.character_name + '" />';

        const characterContent = document.createElement('div');
        characterContent.className = 'character-content';

        /* Dynamically pulls the character name from teh database */
        const characterName = document.createElement('h2');
        characterName.className = 'character-name';
        const characterNameText = document.createTextNode(character.character_name);
        characterName.appendChild(characterNameText);

        /* Dynamically pulls the class, level, and build from the database */
        const characterClass = document.createElement('h3');
        characterClass.className = 'character-class';
        const characterClassText = document.createTextNode(character.character_class + ' ' + character.character_level + ': ' + character.character_build);
        characterClass.appendChild(characterClassText);

        /* Dynamically pulls the character race from the database. */
        const characterRace = document.createElement('p');
        characterRace.className = 'character-race';
        const characterRaceText = document.createTextNode(character.character_race);
        characterRace.appendChild(characterRaceText);

        /* Dynamically creates the link to the character sheet pdf using data stored in the database */
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

        /* Hides all characters not meeting the currently selected class and level */
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