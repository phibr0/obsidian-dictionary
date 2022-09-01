import { Application, Context, createHttpExceptionBody } from "https://deno.land/x/abc@v1.3.3/mod.ts";
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { NodeList } from "https://deno.land/x/deno_dom@v0.1.21-alpha/src/dom/node-list.ts";
import { Definition, DictionaryWord } from "./types.ts";

const app = new Application();

const LANGUAGES = {
  'en': 'english',
  'de': 'deutsch',
  pt: 'portuguese',
  'pt-BR': 'portuguese brazilian',
}

console.log("http://localhost:5000/");

app
    .get("/v1/definition", async (ctx: Context) => {
      const lang = LANGUAGES[ctx.queryParams.lang as keyof typeof LANGUAGES];
      if(!lang) {
        return "Unsupported Language";
      }

      if(!ctx.queryParams.word) {
        return "Supply a word";
      }

      try {
        const result = await fetch(`https://www.google.co.in/search?q=define+${ctx.queryParams.word.replaceAll(' ', '+')}&hl=${lang}&lr=lang_${lang}`, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36' }
        });

        const doc = new DOMParser().parseFromString(await result.text(), 'text/html')!;
        const data = doc.querySelector(`div[data-query-term=${ctx.queryParams.word}]`);

        if(!data) throw "";

        const def: DictionaryWord = {
          phonetics: [],
          meanings: [],
          word: data.querySelector('span[data-dobid="hdw"]')?.textContent ?? ctx.queryParams.word
        };

        //Something like eɪpr(ɪ)l (April)
        const phoneticText = data.querySelector('.LTKOO > span')?.textContent;
        if (phoneticText) {
          def.phonetics.push({
            text: phoneticText,
            audio: data.querySelector('audio > source')?.getAttribute('src') ?? undefined
          });
        }

        //Something like noun
        const type = data.querySelector('.vmod i')?.textContent;
        if (type) {
          const defGenerator = (defs: NodeList) => {

            const out: Definition[] = [];
            const syns: string[] = [];
            const tmp = data.querySelectorAll('.lr_container div[role="button"] span');
            tmp.forEach((el) => {
              if (!el.parentElement?.getAttribute('data-topic') && el.textContent) {
                syns.push(el.textContent.trim());
              }
            })
            defs.forEach((el, idx) => {
              out.push({
                definition: el.textContent,
                example: el.nextSibling?.textContent,
                synonyms: !idx ? syns : undefined
              })
            })
            return out;
          }

          def.meanings.push({
            partOfSpeech: type,
            definitions: defGenerator(data.querySelectorAll('div[data-dobid="dfn"]'))
          });
        }

        return def;
      } catch (_) {
        return createHttpExceptionBody('No definition found');
      }
    })
    .start({ port: 5000 });
