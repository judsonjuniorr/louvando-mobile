import { chords } from './chordList';

function prettyChord(chord) {
  let newChord = chord;
  const chordsSup = ['#7', '7', '#'];
  chordsSup.map((c) => {
    newChord = newChord.replace(c, `<sup>${c}</sup>`);
    return true;
  });
  newChord = newChord
    .replace('Bb', 'B<sup>b</sup>')
    .replace('Eb', 'E<sup>b</sup>');
  return newChord;
}

const chordMarkdown = (lyrics) => {
  let newLyrics = lyrics
    .replace(new RegExp('Cb', 'g'), 'B')
    .replace(new RegExp('C/Bm', 'g'), 'C')
    .replace(new RegExp('<p></p>', 'g'), '<p>&nbsp;</p>');
  const chordArray = [];
  Object.keys(chords).map(key => chords[key].map((cl) => {
      const chordText = cl;
      return chordArray.push(
        {
          text: `[${cl}]`,
          value: `<span class="chord inline" data-tip data-for='chord_${cl}'>${chordText}</span>`,
        },
        {
          text: `{${cl}}`,
          value: `<span class="chord bellowBar" data-tip data-for='chord_${cl}'>${chordText}</span>`,
        },
        {
          text: `|${cl}|`,
          value: `<span class="chord bellowNoBar" data-tip data-for='chord_${cl}'>${chordText}</span>`,
        },
      );
    }),);

  chordArray.map((c) => {
    newLyrics = newLyrics.split(c.text).join(c.value);
    return true;
  });
  return newLyrics;
};

export default chordMarkdown;
