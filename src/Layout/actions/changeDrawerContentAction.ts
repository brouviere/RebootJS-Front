import { CHANGE_DRAWER_CONTENT, IChangeDrawerContentAction, IDrawerContent } from "../types";

// -- Définition de l'action --
export function changeDrawerContent(content?: IDrawerContent, showDrawer: boolean = false): IChangeDrawerContentAction {
  return {
    type: CHANGE_DRAWER_CONTENT,
    content: content,
    showDrawer: showDrawer
  }
}
