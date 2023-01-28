// Português

export default {
  //main.ts
  "Open Dictionary View": "Abrir Vista do Dicionário",
  "Open Language Switcher": "Abrir Selector de Língua",

  //_constants.ts
  Dictionary: "Dicionário",

  //customContextMenu.ts
  Cut: "Cortar",
  Copy: "Copiar",
  Paste: "Colar",
  "Show Synonyms": "Mostrar Sinónimos",
  "Look up": "Procurar",

  //settingsTab.ts
  "Reset to default": "Reinicialização por defeito",
  "Dictionary Settings": "Configurações de Dicionário",
  Language: "Língua",
  "The Language the Plugin will use to search for Definitions and Pronunciations.":
    "A Língua que o Plugin utilizará para pesquisar Definições e Pronúncias.",
  "Synonym Suggestions": "Sugestões de Sinónimos",
  "Show synonyms for highlighted words":
    "Mostrar sinónimos para palavras em destaque",
  "Enabling this will allow the Plugin to analyze full sentences to better suggest synonyms based on the context.":
    "A habilitação permitirá ao Plugin analisar as frases completas para melhor sugerir sinónimos com base no contexto.",
  "Click ": "Clicar ",
  here: "aqui",
  " for Privacy Concerns.": " por Questões de Privacidade.",
  "Advanced Synonym Search": "Pesquisa Avançada de Sinónimos",
  "Show Options in Context Menu": "Mostrar Opções no Menu de Contexto",
  "Enable custom Context Menu with options to search for synonyms (only if the auto suggestions are disabled) and to look up a full definition in the Sidebar. Warning: This will override Obsidian's default Context Menu.":
    "Permitir Menu de Contexto personalizado com opções para procurar sinónimos (apenas se as sugestões automáticas estiverem desactivadas) e procurar uma definição completa na Barra Lateral. Advertência: Isto substituirá o Menu de Contexto padrão da Obsidian.",
  "Click Here": "Clicar Aqui",
  "Definition Provider": "Provedor de Definições",
  "The API the Plugin will use to search for Definitions.":
    "O API que o Plugin utilizará para pesquisar Definições.",
  "Synonym Provider": "Provedor de Sinónimos",
  "The API the Plugin will use to search for Synonyms.":
    "O API que o Plugin utilizará para procurar Sinónimos.",
  "More Information": "Mais Informações",
  "View Information about the API's and the Plugin itself.":
    "Ver Informação sobre as API's e o próprio Plugin.",
  "More Info": "Mais Info",
  Donate: "Doar",
  "If you like this Plugin, consider donating to support continued development:":
    "Se gostar deste Plugin, considere fazer uma doação para apoiar o desenvolvimento contínuo:",
  "Local Dictionary Folder": "Pasta de Dicionários Local",
  "Specify a Folder, where all new Notes created by the Dictionary are placed. Please note that this Folder needs to already exist.":
    "Especificar uma Pasta, onde todas as novas Notas criadas pelo Dicionário são colocadas. É favor notar que esta Pasta já deve existir.",
  "Capitalize File Name": "Capitalizar Nome do Ficheiro",
  "If you disable this, the names of newly created files will be all lowercase.":
    "Se desactivar isto, os nomes dos ficheiros recém-criados serão todos em minúsculas.",
  "Filename Prefix and Suffix": "Prefixo e Sufixo do Nome do Ficheiro",
  "Here you can add a Prefix and Suffix for your newly created Files.":
    "Aqui pode adicionar um Prefixo e Sufixo para os seus Ficheiros recentemente criados. Pode utilizar a variável {{lang}} aqui.",
  Prefix: "Prefixo",
  Suffix: "Sufixo",
  "Here you can edit the Template for newly created Files.":
    "Aqui pode editar o Template para Ficheiros recém-criados.",
  "Click for a List of Variables": "Clique para uma Lista de Variáveis",
  'Meaning splitter': 'Divisor de significado',
  'Here you can decide splitter for every single meaning.': 'Aqui você pode decidir o divisor para cada significado. O padrão é "---"',
  Template: "Template",
  "Local-Dictionary-Builder Settings":
    "Configurações do Local-Dictionary-Builder",
  Miscellaneous: "Miscelâneos",
  "Caching Settings": "Configurações de Caching",
  "Use Caching": "Usar Caching",
  "Enable or disable caching. Caching provides a semi-offline experience by saving every result for later use.":
    "Activar ou desactivar o caching. O caching proporciona uma experiência semi-offline ao guardar todos os resultados para utilização posterior.",
  "Here you can delete all cached Data.":
    "Aqui pode apagar todos os dados armazenados em cache.",
  "You currently have ": "Actualmente tem ",
  " cached Definitions and ": " Definições em cache e ",
  " cached Synonyms.": " Sinónimos em cache.",
  "Delete Cache": "Eliminar Cache",
  Delete: "Eliminar",
  Success: "Êxito",
  "Use Language specific Subfolders":
    "Utilizar Subpastas específicas da Língua",
  'Create Subfolders for every language, e.g. "Dictionary/en-US/Cake"':
    'Criar Subpastas para cada língua, por exemplo, "Dicionário/en-US/Cake".',

  //localDictionaryBuilder.ts
  "Autogenerated by Obsidian Dictionary Plugin":
    "Autogerado por Obsidian Dictionary Plugin",
  "Yes, overwrite the old File.": "Sim, sobregravar o ficheiro antigo.",
  "A existing File with the same Name was found, do you want to overwrite it?":
    "Foi encontrado um Ficheiro existente com o mesmo Nome, quer sobregravá-lo?",
  "No, keep the old File.": "Não, manter o ficheiro antigo.",
  "Meaning {{i}}": "Significado {{i}}",

  //infoModal.svelte
  "API Information": "Informação de API",
  "Definition API's": "API de Definição",
  Website: "Sítio Web",
  "Synonym API's": "API de Sinónimos",
  "Part of Speech API's": "Parte das API de Discurso",
  'This Plugin is using <a href="https://feathericons.com/">Feather Icons</a>':
    'Este Plugin está a usar <a href="https://feathericons.com/">Feather Icons</a>',

  //dictionaryView.svelte
  "Enter a word": "Introduza uma palavra",
  Clear: "Limpar",
  "Change Language": "Mudar Língua",
  "Change Provider": "Mudar Provedor",
  "Collapse Results": "Colapsar os Resultados",
  Pronunciation: "Pronunciamento",
  Meanings: "Significados",
  Origin: "Origem",
  "New Note": "Nova Nota",
  "View Error": "Ver Erro",
  "Match Case": "Corresponder Caixa",
  'Copied "{{word}}" to clipboard': 'Copiado "{{word}}" para clipboard',

  //errorComponent.ts
  "I can't find the word you are looking for or the server can't be reached. You can try again in a few minutes.":
    "Não consigo encontrar a palavra que procura ou o servidor não pode ser alcançado. Pode tentar novamente dentro de alguns minutos.",

  //meaningComponent.ts
  "Definition:": "Definição:",
  "Synonyms:": "Sinónimos:",
  "Antonyms:": "Antónimos:",

  //modals
  "Choose a Definition Provider Service":
    "Escolha um Serviço Provedor de Definições",
  "Choose a Language": "Escolha uma Língua",
  "Choose a Synonym Provider Service":
    "Escolha um Serviço Provedor de Sinónimos",
};
