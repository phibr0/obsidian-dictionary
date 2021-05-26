# Obsidian Dictionary Plugin [![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/phibr0/obsidian-dictionary)](https://github.com/phibr0/obsidian-dictionary/releases) ![GitHub all releases](https://img.shields.io/github/downloads/phibr0/obsidian-dictionary/total) [![](https://img.shields.io/badge/Support%3F-Buy%20me%20a%20Coffee-yellow)](https://www.buymeacoffee.com/phibr0)

This Plugin adds a Dictionary to the [Obsidian](https://obsidian.md) Note-Taking tool.

## Usage

Open the *Command Palette* (default: `ctrl` + `p`), search for *Open Dictionary View* and run the command. You will see that a new View appears in the right Sidebar of Obsidian. You can set your default Language in Obsidian's Settings under *Plugin Options* > *Obsidian Dictionary* > *Default Language*.

<img align="right" width="550" src="https://media.discordapp.net/attachments/796853434397360128/847198380878069771/Screen_Shot_2021-05-26_at_12.43.43_PM.png?width=736&height=676">

## Supported Languages


The following Languages are currently supported:

- English (US)
- English (UK)
- Hindi
- Spanish
- French
- Japanese
- Russian
- German
- Italian
- Korean
- Brazilian Portuguese
- Arabic
- Turkish

## How to install

1. Go to **Community Plugins** in your [Obsidian](https://www.obsidian.md) Settings and **disable** Safe Mode
2. Click on **Browse** and search for “Obsidian Dictionary”
3. Click install
4. Toggle the Plugin on in the **Community Plugins** Tab

## Roadmap

- [ ] Mobile Support

## How to make this Plugin better

This Plugin is meant to be easily extensible! If you want to add a new API for a new (or already supported) Language see: [API Manager](src/apiManager.ts).

You will need to create a new class for the new API, which implements [DefinitionProvider](src/api/types.ts) or [SynonymProvider](src/api/types.ts) (or both).

If the Language you are working with doesn't exist yet, add it to the `LANGUAGES` in [_constants.ts](src/_constants.ts).

After that, add the API to the respective List in the [API Manager](src/apiManager.ts) and finally open a Pull Request here on GitHub.
This will automatically make it selectable in the Settings.

> Special Thanks to [@mgmeyers](https://github.com/mgmeyers) for already making this Plugin a lot better!

## Support me

If you find this Plugin helpful, consider supporting me:

<a href="https://www.buymeacoffee.com/phibr0"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=phibr0&button_colour=5F7FFF&font_colour=ffffff&font_family=Inter&outline_colour=000000&coffee_colour=FFDD00"></a>

> This Plugin relies on the [Free Dictionary API](https://dictionaryapi.dev/) by [meetDeveloper](https://github.com/meetDeveloper). He is providing this API to the public for free and needs help from the community. [**More Information**](https://github.com/meetDeveloper/freeDictionaryAPI#important-note)
