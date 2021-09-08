import type { Editor, Menu, WorkspaceLeaf } from "obsidian";
import t from "src/l10n/helpers";
import type DictionaryPlugin from "src/main";
import { VIEW_TYPE } from "src/_constants";

export default function handleContextMenu(menu: Menu, instance: Editor, plugin: DictionaryPlugin): void {
    if (!plugin.settings.shouldShowCustomContextMenu) {
        return;
    }
    const selection = instance.getSelection();

    if (selection && selection.split(" ").length === 1) {
        if (!plugin.settings.shouldShowSynonymPopover) {
            menu.addItem((item) => {
                item.setTitle(t('Show Synonyms'))
                    .setIcon('synonyms')
                    .onClick(async (_) => {
                        plugin.handlePointerUp();
                    });
            });
        }
        menu.addItem((item) => {
            item.setTitle(t('Look up'))
                .setIcon('quote-glyph')
                .onClick(async (_) => {
                    let leaf: WorkspaceLeaf = plugin.app.workspace.getLeavesOfType(VIEW_TYPE).first();
                    if(!leaf){
                        leaf = plugin.app.workspace.getRightLeaf(false);
                        await leaf.setViewState({
                            type: VIEW_TYPE,
                        });
                    }
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    leaf.view.query(selection);
                    plugin.app.workspace.revealLeaf(leaf);
                });
        });
    }
}