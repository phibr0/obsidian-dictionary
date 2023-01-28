// Português do Brasil
// Brazilian Portuguese

export default {
    //main.ts
    'Open Dictionary View': 'Abrir Visualização do Dicionário',
    'Open Language Switcher': 'Abrir Seletor de Idioma',

    //_constants.ts
    'Dictionary': 'Dicionário',

    //customContextMenu.ts
    'Cut': 'Cortar',
    'Copy': 'Copiar',
    'Paste': 'Colar',
    'Show Synonyms': 'Mostrar Sinônimos',
    'Look up': 'Procurar',

    //settingsTab.ts
    "Reset to default": "Restaurar para o padrão",
    'Dictionary Settings': 'Configurações do Dicionário',
    'Language': 'Idioma',
    'The Language the Plugin will use to search for Definitions and Pronunciations.': 'O Idioma que o Plugin irá utilizar para pesquisar as Definições e as Pronunciações.',
    'Synonym Suggestions': 'Sugestões de Sinônimo',
    'Show synonyms for highlighted words': 'Mostrar sinônimos para palavras em destaque',
    'Enabling this will allow the Plugin to analyze full sentences to better suggest synonyms based on the context.': 'A ativação disso permitirá ao Plugin analisar as frases completas para melhor sugerir sinônimos com base no contexto.',
    'Click ': 'Clique ',
    'here': 'aqui',
    ' for Privacy Concerns.': ' para Questões de Privacidade.',
    'Advanced Synonym Search': 'Pesquisa Avançada de Sinônimos',
    'Show Options in Context Menu': 'Mostrar Opções no Menu de Contexto',
    'Enable custom Context Menu with options to search for synonyms (only if the auto suggestions are disabled) and to look up a full definition in the Sidebar. Warning: This will override Obsidian\'s default Context Menu.': 'Permitir Menu de Contexto personalizado com opções para procurar sinônimos (apenas se as sugestões automáticas estiverem desativadas) e procurar uma definição completa na Barra Lateral. Aviso: Isso substituirá o Menu de Contexto padrão do Obsidian.',
    'Click Here': 'Clique Aqui',
    'Definition Provider': 'Provedor de Definição',
    'The API the Plugin will use to search for Definitions.': 'A API que o plugin utilizará para procurar por Definições.',
    'Synonym Provider': 'Provedor de Sinônimo',
    'The API the Plugin will use to search for Synonyms.': 'A API que o plugin utilizará para procurar por Sinônimos.',
    'More Information': 'Mais Informações',
    'View Information about the API\'s and the Plugin itself.': 'Ver Informações sobre a API e sobre o Plugin em si.',
    'More Info': 'Mais Info',
    'Donate': 'Doar',
    'If you like this Plugin, consider donating to support continued development:': 'Se você gosta deste Plugin, considere fazer uma doação para apoiar o desenvolvimento contínuo:',
    'Local Dictionary Folder': 'Pasta do Dicionário Local',
    'Specify a Folder, where all new Notes created by the Dictionary are placed. Please note that this Folder needs to already exist.': 'Especificar uma Pasta, onde todas as novas Notas criadas pelo Dicionário serão colocadas. É necessário que esta Pasta já exista em seu Obsidian.',
    'Capitalize File Name': 'Capitalizar o Nome do Arquivo',
    'If you disable this, the names of newly created files will be all lowercase.': 'Se você desativar isso, os nomes dos arquivos recém-criados serão todos em minúsculas.',
    'Filename Prefix and Suffix': 'Prefixo e Sufixo    \'Meaning splitter\': \'Meaning splitter\',\n' +
        '    \'Here you can decide splitter for every single meaning.\': \'Here you can decide splitter for every single meaning. Default is "---"\',\n do nome do arquivo',
    'Here you can add a Prefix and Suffix for your newly created Files.': 'Aqui você pode adicionar um Prefixo e Sufixo para seus arquivos recém-criados. Você pode usar a variável {{lang}} aqui.',
    "Prefix": "Prefixo",
    "Suffix": "Sufixo",
    'Here you can edit the Template for newly created Files.': 'Aqui você pode editar o Template para arquivos recém-criados.',
    'Click for a List of Variables': 'Clique para uma Lista de Variáveis',
    'Meaning splitter': 'Divisor de significado',
    'Here you can decide splitter for every single meaning.': 'Aqui você pode decidir o divisor para cada significado. O padrão é "---"',
    'Template': 'Template',
    "Local-Dictionary-Builder Settings": "Configurações do Local-Dictionary-Builder (Construtor do Dicionário Local)",
    "Miscellaneous": "Miscelâneas",
    "Caching Settings": "Configurações de Cache",
    "Use Caching": "Usar Cache",
    "Enable or disable caching. Caching provides a semi-offline experience by saving every result for later use.": "Habilitar ou desabilitar o cache. O cache proporciona uma experiência semi-offline ao salvar cada resultado para uso posterior.",
    'Here you can delete all cached Data.': 'Aqui você pode excluir todos os dados armazenados em cache.',
    "You currently have ": "Você atualmente tem ",
    " cached Definitions and ": " Definições em cache e ",
    " cached Synonyms.": " Sinônimos em cache.",
    "Delete Cache": "Apagar Cache",
    "Delete": "Apagar",
    "Success": "Sucesso",
    'Use Language specific Subfolders': 'Usar Subpastas específicas do Idioma',
    'Create Subfolders for every language, e.g. "Dictionary/en-US/Cake"': 'Criar subpastas para cada idioma, por exemplo, "Dictionary/en-US/Cake"',


    //localDictionaryBuilder.ts
    'Autogenerated by Obsidian Dictionary Plugin': 'Autogerado pelo Plugin Dicionário do Obsidian',
    "Yes, overwrite the old File.": "Sim, substitua o Arquivo antigo.",
    "A existing File with the same Name was found, do you want to overwrite it?": "Foi encontrado um Arquivo existente com o mesmo Nome, você quer substituí-lo?",
    "No, keep the old File.": "Não, manter o Arquivo antigo.",
    "Meaning {{i}}": "Significado {{i}}",


    //infoModal.svelte
    'API Information': 'Informação da API',
    'Definition API\'s': 'API de Definição',
    'Website': 'Página Web',
    'Synonym API\'s': 'API de Sinônimos',
    'Part of Speech API\'s': 'Parte da API de Discurso',
    'This Plugin is using <a href="https://feathericons.com/">Feather Icons</a>': 'Este Plugin está usando <a href="https://feathericons.com/">Feather Icons</a>',

    //dictionaryView.svelte
    'Enter a word': 'Digite uma palavra',
    "Clear": "Limpar",
    "Change Language": "Mudar Idioma",
    "Change Provider": "Mudar Provedor",
    "Collapse Results": "Colapsar os Resultados",
    'Pronunciation': 'Pronúncia',
    'Meanings': 'Significados',
    "Origin": "Origem",
    'New Note': 'Nova Nota',
    "View Error": "Ver Erro",
    "Match Case": "Corresponder Caixa",
    "Copied \"{{word}}\" to clipboard": "Copiado \"{{word}}\" para a área de transferência (clipboard)",

    //errorComponent.ts
    'I can\'t find the word you are looking for or the server can\'t be reached. You can try again in a few minutes.': 'Não consigo encontrar a palavra que procura ou o servidor não pode ser alcançado. Tente novamente dentro de alguns minutos.',

    //meaningComponent.ts
    'Definition:': 'Definição:',
    'Synonyms:': 'Sinônimos:',
    'Antonyms:': 'Antônimos:',

    //modals
    "Choose a Definition Provider Service": "Escolha um Serviço de Provedor de Definição",
    "Choose a Language": "Escolha um Idioma",
    "Choose a Synonym Provider Service": "Escolha um Serviço de Provedor de Sinônimo",
};
