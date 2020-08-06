import ScratchBlocks from 'scratch-blocks';
import { colors } from '../make-device-toolbox-xml/common';
const Cast = require('./util/cast');
const Clone = require('./util/clone');
const nets = require('nets');
const MathUtil = require('./util/math-util');
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgNDAgNDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjIgKDY3MTQ1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5FeHRlbnNpb25zL1NvZnR3YXJlL1RleHQtdG8tU3BlZWNoLUJsb2NrPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkV4dGVuc2lvbnMvU29mdHdhcmUvVGV4dC10by1TcGVlY2gtQmxvY2siIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1vcGFjaXR5PSIwLjE1Ij4KICAgICAgICA8ZyBpZD0idGV4dDJzcGVlY2giIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQuMDAwMDAwLCA0LjAwMDAwMCkiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjMDAwMDAwIj4KICAgICAgICAgICAgPHBhdGggZD0iTTExLjUsMTcuNjY5MzQzNSBDMTEuNSwxNi42NTM5MjY5IDEwLjAwNjAxNDUsMTYuMDg0NDI3NCA5LjExMjU2MDI0LDE2Ljg4ODMgTDYuNDEyNTYwMjQsMTkuMDUwNzE0IEM1LjM5MzQ2NzU1LDE5Ljg2Njg5OTQgNC4wNzQ5NzM1MSwyMC4zMzE3NTc1IDIuNywyMC4zMzE3NTc1IEwyLjMsMjAuMzMxNzU3NSBDMS4yNjUxOTIzMywyMC4zMzE3NTc1IDAuNSwyMS4wMjEyMDAzIDAuNSwyMS45MDQwNzEgTDAuNSwyNi4xMzg3OTg2IEMwLjUsMjcuMDIxNjY5MyAxLjI2NTE5MjMzLDI3LjcxMTExMiAyLjMsMjcuNzExMTEyIEwyLjcsMjcuNzExMTEyIEM0LjE1NzU1NjgyLDI3LjcxMTExMiA1LjQ1MzcyMzIyLDI4LjEzMzUyNzEgNi41MTk3MjA5OCwyOC45OTggTDkuMTE4NDAyOTMsMzEuMTU5MzIxNiBDMTAuMDI2MTg1NSwzMS45MDkwNzkzIDExLjUsMzEuMzQ3MjY4OSAxMS41LDMwLjI4MzQyNTUgTDExLjUsMTcuNjY5MzQzNSBaIiBpZD0ic3BlYWtlciIgZmlsbD0iIzRENEQ0RCI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMjEuNjQzNjA2NiwxNi41IEMxOS45NzcwMDk5LDE4LjQzNzAyMzQgMTcuMTA1MDI3NSwxOS45Mjg1NzE0IDE1LjY2NjY2NjcsMTkuOTI4NTcxNCBDMTUuNTEyNjM5NywxOS45Mjg1NzE0IDE1LjMxNjYyOTIsMTkuODk1OTAzIDE1LjEwOTcyNjUsMTkuNzkyNDUxNyBDMTQuNzM3NjAzOSwxOS42MDYzOTA0IDE0LjUsMTkuMjQ5OTg0NiAxNC41LDE4Ljc2MTkwNDggQzE0LjUsMTguNjU2ODA0MSAxNC41MTcwNTU1LDE4LjU1NDUwNzYgMTQuNTQ5NDQ2NywxOC40NTQwODQ0IEMxNC42MjU3NTQ1LDE4LjIxNzUwNjMgMTUuMTczNTcyMSwxNy40Njc1MzEgMTUuMjc3MjA3MSwxNy4yODA5ODgxIEMxNS41NDYzNTI2LDE2Ljc5NjUyNjEgMTUuNzM5MDI1LDE2LjIwNjM1NjEgMTUuODQzMjg5MSwxNS40MTYwMDM0IEMxMy4xODk3MDA1LDEzLjkyNjgzNjkgMTEuNSwxMS4xMTM5NjY4IDExLjUsOCBDMTEuNSwzLjMwNTU3OTYzIDE1LjMwNTU3OTYsLTAuNSAyMCwtMC41IEwyNCwtMC41IEMyOC42OTQ0MjA0LC0wLjUgMzIuNSwzLjMwNTU3OTYzIDMyLjUsOCBDMzIuNSwxMi42OTQ0MjA0IDI4LjY5NDQyMDQsMTYuNSAyNCwxNi41IEwyMS42NDM2MDY2LDE2LjUgWiIgaWQ9InNwZWVjaCIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+';


const SERVER_HOST = 'https://synthesis-service.scratch.mit.edu';

const SERVER_TIMEOUT = 10000; // 10 seconds
const SPEECH_VOLUME = 250;

const ALTO_ID = 'ALTO';
const TENOR_ID = 'TENOR';
const SQUEAK_ID = 'SQUEAK';
const GIANT_ID = 'GIANT';
const KITTEN_ID = 'KITTEN';

const FEMALE_TENOR_RATE = 0.89; // -2 semitones
const FEMALE_GIANT_RATE = 0.79; // -4 semitones

const CHINESE_ID = 'zh-cn';
const DANISH_ID = 'da';
const DUTCH_ID = 'nl';
const ENGLISH_ID = 'en';
const FRENCH_ID = 'fr';
const GERMAN_ID = 'de';
const HINDI_ID = 'hi';
const ICELANDIC_ID = 'is';
const ITALIAN_ID = 'it';
const JAPANESE_ID = 'ja';
const KOREAN_ID = 'ko';
const NORWEGIAN_ID = 'nb';
const POLISH_ID = 'pl';
const PORTUGUESE_BR_ID = 'pt-br';
const PORTUGUESE_ID = 'pt';
const ROMANIAN_ID = 'ro';
const RUSSIAN_ID = 'ru';
const SPANISH_ID = 'es';
const SPANISH_419_ID = 'es-419';
const SWEDISH_ID = 'sv';
const TURKISH_ID = 'tr';
const WELSH_ID = 'cy';

let _getSpeechSynthLocale;
let _getState;
let VOICE_INFO;
let LANGUAGE_INFO;
let getCurrentLanguage;
const DEFAULT_LANGUAGE = ENGLISH_ID;
let _soundPlayers;
let setCurrentLanguage;

const generatePrimitiveFunc = runtime => {
  runtime._primitives.AIVoice_TextToSpeech = (args, util) => {
    let words = Cast.toString(args.inputText);
    let locale = _getSpeechSynthLocale();

    const state = _getState(util.target);

    let gender = VOICE_INFO[state.voiceId].gender;
    let playbackRate = VOICE_INFO[state.voiceId].playbackRate;

    if (LANGUAGE_INFO[getCurrentLanguage()].singleGender) {
      gender = 'female';
      if (state.voiceId === TENOR_ID) {
        playbackRate = FEMALE_TENOR_RATE;
      }
      if (state.voiceId === GIANT_ID) {
        playbackRate = FEMALE_GIANT_RATE;
      }
    }

    if (state.voiceId === KITTEN_ID) {
      words = words.replace(/\S+/g, 'meow');
      locale = LANGUAGE_INFO[DEFAULT_LANGUAGE].speechSynthLocale;
    }

    let path = `${SERVER_HOST}/synth`;
    path += `?locale=${locale}`;
    path += `&gender=${gender}`;
    path += `&text=${encodeURIComponent(words.substring(0, 128))}`;

    return new Promise(resolve => {
      nets({
        url: path,
        timeout: SERVER_TIMEOUT
      }, (err, res, body) => {
        if (err) {
          console.warn(err);
          return resolve();
        }

        if (res.statusCode !== 200) {
          console.warn(res.statusCode);
          return resolve();
        }

        // Play the sound
        const sound = {
          data: {
            buffer: body.buffer
          }
        };
        runtime.audioEngine.decodeSoundPlayer(sound).then(soundPlayer => {
          _soundPlayers.set(soundPlayer.id, soundPlayer);

          soundPlayer.setPlaybackRate(playbackRate);

          // Increase the volume
          const engine = runtime.audioEngine;
          const chain = engine.createEffectChain();
          chain.set('volume', SPEECH_VOLUME);
          soundPlayer.connect(chain);

          soundPlayer.play();
          soundPlayer.on('stop', () => {
            _soundPlayers.delete(soundPlayer.id);
            resolve();
          });
        });
      });
    });
  };

  runtime._primitives.AIBlock_setVoice = (args, util) => {
    const state = _getState(util.target);

    let voice = args.VOICE;

    // If the arg is a dropped number, treat it as a voice index
    let voiceNum = parseInt(voice, 10);
    if (!isNaN(voiceNum)) {
      voiceNum -= 1; // Treat dropped args as one-indexed
      voiceNum = MathUtil.wrapClamp(voiceNum, 0, Object.keys(VOICE_INFO).length - 1);
      voice = Object.keys(VOICE_INFO)[voiceNum];
    }

    // Only set the voice if the arg is a valid voice id.
    if (Object.keys(VOICE_INFO).includes(voice)) {
      state.voiceId = voice;
    }
  };

  runtime._primitives.AIBlock_setLanguage = (args, util) => {
    setCurrentLanguage(args.LANGUAGE);
  };
};

export const text2SpeakBlocks = function (intl, runtime) {
  generatePrimitiveFunc(runtime);

  
  VOICE_INFO = {
    [ALTO_ID]: {
      name: intl.messages.ENLIGHTENMENTKIT_ALTO,
      gender: 'female',
      playbackRate: 1
    },
    [TENOR_ID]: {
      name: intl.messages.ENLIGHTENMENTKIT_TENOR,
      gender: 'male',
      playbackRate: 1
    },
    [SQUEAK_ID]: {
      name: intl.messages.ENLIGHTENMENTKIT_SQUEAK,
      gender: 'female',
      playbackRate: 1.19 // +3 semitones
    },
    [GIANT_ID]: {
      name: intl.messages.ENLIGHTENMENTKIT_GIANT,
      gender: 'male',
      playbackRate: 0.84 // -3 semitones
    },
    [KITTEN_ID]: {
      name: intl.messages.ENLIGHTENMENTKIT_KITTEN,
      gender: 'female',
      playbackRate: 1.41 // +6 semitones
    }
  };

  LANGUAGE_INFO =
     {
       [CHINESE_ID]: {
         name: intl.messages.AI_LANGUAGE_INFO_CHINESE,
         locales: ['zh-cn', 'zh-tw'],
         speechSynthLocale: 'cmn-CN',
         singleGender: true
       },
       [DANISH_ID]: {
         name: intl.messages.AI_LANGUAGE_INFO_DANISH,
         locales: ['da'],
         speechSynthLocale: 'da-DK'
       },
       [DUTCH_ID]: {
         name: intl.messages.AI_LANGUAGE_INFO_DUTCH,
         locales: ['nl'],
         speechSynthLocale: 'nl-NL'
       },
       [ENGLISH_ID]: {
         name: intl.messages.AI_LANGUAGE_INFO_ENGLISH,
         locales: ['en'],
         speechSynthLocale: 'en-US'
       },
       [FRENCH_ID]: {
         name: intl.messages.AI_LANGUAGE_INFO_FRENCH,
         locales: ['fr'],
         speechSynthLocale: 'fr-FR'
       },
       [GERMAN_ID]: {
         name: intl.messages.AI_LANGUAGE_INFO_GERMAN,
         locales: ['de'],
         speechSynthLocale: 'de-DE'
       },
       [HINDI_ID]: {
         name: intl.messages.AI_LANGUAGE_INFO_HINDI,
         locales: ['hi'],
         speechSynthLocale: 'en-IN',
         singleGender: true
       },
       [ICELANDIC_ID]: {
         name: intl.messages.AI_LANGUAGE_INFO_ICELANDIC,
         locales: ['is'],
         speechSynthLocale: 'is-IS'
       },
       [ITALIAN_ID]: {
         name: intl.messages.AI_LANGUAGE_INFO_ITALIAN,
         locales: ['it'],
         speechSynthLocale: 'it-IT'
       },
       [JAPANESE_ID]: {
         name: intl.messages.AI_LANGUAGE_INFO_JAPANESE,
         locales: ['ja', 'ja-Hira'],
         speechSynthLocale: 'ja-JP'
       },
       [KOREAN_ID]: {
         name: intl.messages.AI_LANGUAGE_INFO_KOREAN,
         locales: ['ko'],
         speechSynthLocale: 'ko-KR',
         singleGender: true
       },
       [NORWEGIAN_ID]: {
         name: intl.messages.AI_LANGUAGE_INFO_NORWEGIAN,
         locales: ['nb', 'nn'],
         speechSynthLocale: 'nb-NO',
         singleGender: true
       },
       [POLISH_ID]: {
         name: intl.messages.AI_LANGUAGE_INFO_POLISH,
         locales: ['pl'],
         speechSynthLocale: 'pl-PL'
       },
       [PORTUGUESE_BR_ID]: {
         name: intl.messages.AI_LANGUAGE_INFO_PORTUGUESE_BRAZILIAN,
         locales: ['pt-br'],
         speechSynthLocale: 'pt-BR'
       },
       [PORTUGUESE_ID]: {
         name: intl.messages.AI_LANGUAGE_INFO_PORTUGUESE_EUROPEAN,
         locales: ['pt'],
         speechSynthLocale: 'pt-PT'
       },
       [ROMANIAN_ID]: {
         name: intl.messages.AI_LANGUAGE_INFO_ROMANIAN,
         locales: ['ro'],
         speechSynthLocale: 'ro-RO',
         singleGender: true
       },
       [RUSSIAN_ID]: {
         name: intl.messages.AI_LANGUAGE_INFO_RUSSIAN,
         locales: ['ru'],
         speechSynthLocale: 'ru-RU'
       },
       [SPANISH_ID]: {
         name: intl.messages.AI_LANGUAGE_INFO_SPANISH_EUROPEAN,
         locales: ['es'],
         speechSynthLocale: 'es-ES'
       },
       [SPANISH_419_ID]: {
         name: intl.messages.AI_LANGUAGE_INFO_SPANISH_LATIN_AMERICAN,
         locales: ['es-419'],
         speechSynthLocale: 'es-US'
       },
       [SWEDISH_ID]: {
         name: intl.messages.AI_LANGUAGE_INFO_SWEDISH,
         locales: ['sv'],
         speechSynthLocale: 'sv-SE',
         singleGender: true
       },
       [TURKISH_ID]: {
         name: intl.messages.AI_LANGUAGE_INFO_TURKISH,
         locales: ['tr'],
         speechSynthLocale: 'tr-TR',
         singleGender: true
       },
       [WELSH_ID]: {
         name: intl.messages.AI_LANGUAGE_INFO_WELSH,
         locales: ['cy'],
         speechSynthLocale: 'cy-GB',
         singleGender: true
       }
     };
  

  _soundPlayers = new Map();
  const STATE_KEY = 'Scratch.text2speech';
  const _getSupportedLocales = () => Object.keys(LANGUAGE_INFO).reduce((acc, lang) =>
    acc.concat(LANGUAGE_INFO[lang].locales), []);

  const _stopAllSpeech = () => {
    _soundPlayers.forEach(player => {
      player.stop();
    });
  };

  const _onTargetCreated = (newTarget, sourceTarget) => {
    if (sourceTarget) {
      const state = sourceTarget.getCustomState(STATE_KEY);
      if (state) {
        newTarget.setCustomState(STATE_KEY, Clone.simple(state));
      }
    }
  };
  if (runtime) {
    runtime.on('PROJECT_STOP_ALL', _stopAllSpeech);
  }

  if (runtime) {
    runtime.on('targetWasCreated', _onTargetCreated);
  }

  
  const _supportedLocales = _getSupportedLocales();
  
  const DEFAULT_TEXT2SPEECH_STATE = {
    voiceId: ALTO_ID
  };

  _getState = target => {
    let state = target.getCustomState(STATE_KEY);
    if (!state) {
      state = Clone.simple(DEFAULT_TEXT2SPEECH_STATE);
      target.setCustomState(STATE_KEY, state);
    }
    return state;
  };

  const _getExtensionLocaleForSupportedLocale = locale => {
    for (const lang in LANGUAGE_INFO) {
      if (LANGUAGE_INFO[lang].locales.includes(locale)) {
        return lang;
      }
    }
    console.error(`cannot find extension locale for locale ${locale}`);
  };

  const getEditorLanguage = () => intl.locale ||
            navigator.language || navigator.userLanguage || DEFAULT_LANGUAGE;

  const isSupportedLanguage = languageCode => _supportedLocales.includes(languageCode);

  setCurrentLanguage = locale => {
    const stage = runtime.getTargetForStage();
    if (!stage) return;

    if (isSupportedLanguage(locale)) {
      stage.textToSpeechLanguage = _getExtensionLocaleForSupportedLocale(locale);
    }

    if (!stage.textToSpeechLanguage) {
      stage.textToSpeechLanguage = DEFAULT_LANGUAGE;
    }
  };
  
  getCurrentLanguage = () => {
    const stage = runtime.getTargetForStage();
    if (!stage) return DEFAULT_LANGUAGE;
    // If no language has been set, set it to the editor locale (or default).
    if (!stage.textToSpeechLanguage) {
      setCurrentLanguage(getEditorLanguage());
    }
    return stage.textToSpeechLanguage;
  };

  _getSpeechSynthLocale = () => {
    let speechSynthLocale = LANGUAGE_INFO[DEFAULT_LANGUAGE].speechSynthLocale;
    if (LANGUAGE_INFO[getCurrentLanguage()]) {
      speechSynthLocale = LANGUAGE_INFO[getCurrentLanguage()].speechSynthLocale;
    }
    return speechSynthLocale;
  };
  
  const getVoiceMenu = () => Object.keys(VOICE_INFO).map(voiceId => ([VOICE_INFO[voiceId].name, voiceId]));
  
  const getLanguageMenu = () => Object.keys(LANGUAGE_INFO).map(key => ([LANGUAGE_INFO[key].name, key]));

  ScratchBlocks.Blocks.AIVoice_TextToSpeech = {
    init: function() {
      this.jsonInit({
        id: 'AIVoice_TextToSpeech',
        message0: intl.messages.ENLIGHTENMENTKIT_SPEAKANDWAITBLOCK,
        args0: [
          {
            type: 'field_image',
            src: blockIconURI,
            width: 40,
            height: 30
          },
          {
            type: 'input_value',
            name: 'inputText'
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'ai',
        extensions: ['shape_statement']
      });
    }
  };
  ScratchBlocks.Blocks.AIBlock_setVoice = {
    init: function() {
      this.jsonInit({
        id: 'AIBlock_setVoice',
        message0: intl.messages.ENLIGHTENMENTKIT_SETVOICE,
        args0: [
          {
            type: 'field_image',
            src: blockIconURI,
            width: 40,
            height: 30
          },
          {
            type: 'field_dropdown',
            name: 'VOICE',
            options: getVoiceMenu
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'ai',
        extensions: ['shape_statement']
      });
    }
  };

  ScratchBlocks.Blocks.AIBlock_setLanguage = {
    init: function() {
      this.jsonInit({
        id: 'AIBlock_setLanguage',
        message0: intl.messages.ENLIGHTENMENTKIT_SETLANGUAGE,
        args0: [
          {
            type: 'field_image',
            src: blockIconURI,
            width: 40,
            height: 30
          },
          {
            type: 'field_dropdown',
            name: 'LANGUAGE',
            options: getLanguageMenu
          }
        ],
        colour: colors[7].colour,
        colourSecondary: colors[7].secondaryColour,
        colourTertiary: colors[7].secondaryColour,
        category: 'ai',
        extensions: ['shape_statement']
      });
    }
  };
};
