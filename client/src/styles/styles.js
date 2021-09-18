// S T Y L E S

const btnWaves = 'waves-effect waves-light btn';
const btnWavesDarken = btnWaves + ' grey darken-3';
const btnWavesOrange = btnWaves + ' deep-orange accent-3';

const card = { marginLeft: 10, marginRight: 10, marginTop: 30, marginBottom: 30, padding: 50, minHeight: 660 };
const bold = { fontWeight: 600 };
const red = { color: 'orangered' };
const boldRed = { ...bold, ...red };
const textArea = { minHeight: 400 };
const btnIcon = { ...red, cursor: 'pointer', position: 'relative', top: 25 };
const image = { maxHeight: 300, maxWidth: 300 };
const imageMuted = { ...image, opacity: 0.5 };

const arrow = { ...red, cursor: 'pointer', position: 'absolute', left: 15 };
const arrowAuthor = { ...arrow, top: 225 };
const arrowCategory = { ...arrow, top: 310 };
const drop = { zIndex: 100, position: 'absolute', left: '13%', width: '80%', overflow: 'auto', backgroundColor: 'gainsboro' };
const dropAuthor = { ...drop, top: 265, height: 320 };
const dropCategory = { ...drop, top: 350, height: 235 };
const dropRow = { height: 40 };

const btn = { position: 'absolute', bottom: 20 };
const btnL1 = { ...btn, left: 20 };
const btnL2 = { ...btn, left: 150 };
const btnR1 = { ...btn, right: 20 };
const btnR2 = { ...btn, right: 150 };
const btnL1red = { ...btnL1, ...red };
const btnL2red = { ...btnL2, ...red };
const btnR1red = { ...btnR1, ...red };
const btnR2red = { ...btnR2, ...red };

export const styles = {
    btnWavesDarken, btnWavesOrange,
    card, bold, red, boldRed, textArea, btnIcon, image, imageMuted,
    arrowAuthor, arrowCategory, dropAuthor, dropCategory, dropRow,
    btnL1, btnL2, btnL1red, btnL2red,
    btnR1, btnR2, btnR1red, btnR2red
};
