document.addEventListener('DOMContentLoaded', function() {
    function Fun_Shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    async function loadButtons() {
        const _ButtonContainer = document.querySelector('._Button_Container');
        if (!_ButtonContainer) return;

        const buttonsPath = 'Media/Buttons/';
        let _ButtonFiles = [
            '28 (copy 1).gif', '98plusani.gif', 'angel99.gif', 'aseprite.gif',
            'bestvieweddesktop.gif', 'eeveelutions-glaceon.gif', 'eeveelutions-sylveon.gif',
            'eeveelutions-vaporeon.gif', 'ezgif2.gif', 'funny.gif', 'ily.png',
            'kromer.gif', 'kromernow.png', 'lovevirus.gif', 'miku.gif',
            'minecraft.png', 'neocities-pink.gif', 'office97.gif', 'PAINT4EVER.png',
            'paintnet.gif', 'powered-cpp.gif', 'ralseismokingadart.gif', 'reshirii.gif',
            'spamtombutton.gif', 'srgb-now.gif', 'steam.gif', 'vocaloid.png',
            'vscbutton.gif', 'xp.gif', 'queen.gif', 'Tails7.png', 'tumblr_0e9e8c986a91ff8c473585a70f0428ff_62f51094_100.webp',
            'frutigeraeroarchive_2.png', 'tumblr_07f320adf87aae019e9f2a604f869467_da6cdc50_100.webp', 'tumblr_32ee9dd279018f9709f003e4551efa04_36081447_100.webp',
            'tumblr_4874a8b02f5d2d6638c8fb8b68487825_24f65212_100.gif', 'tumblr_b6ece958592a05678b93636e10c3f505_c6a7ea9e_100.gif',
            '2ktan.png', 'konata.gif', 'WEBP.gif'
        ];
        
        _ButtonFiles = Fun_Shuffle([..._ButtonFiles]);

        for (let i = 0; i < 2; i++) {
            const buttonGroup = document.createElement('div');
            buttonGroup.className = '_Button_Group';
            
            _ButtonFiles.forEach(file => {
                const button = document.createElement('img');
                button.src = buttonsPath + file;
                button.alt = file.split('.')[0];
                button.className = '_Button_Image';
                buttonGroup.appendChild(button);
            });
            
            _ButtonContainer.appendChild(buttonGroup);
        }
    }

    loadButtons();
});