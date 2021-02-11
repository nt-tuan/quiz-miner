import { Element } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

interface Condition {
  tag?: string;
  className?: string;
}
export const firstChild = (
  e: Element,
  ...conditions: Condition[]
): Element | null => {
  let current = e;
  for (let i = 0; i < conditions.length; i++) {
    const condition = conditions[i];
    if (condition.tag != null) {
      const matchedElements = current.getElementsByTagName(condition.tag);
      if (matchedElements.length === 0) return null;
      current = matchedElements[0];
      continue;
    }
    if (condition.className != null) {
      const matchedElement = current.getElementsByClassName(
        condition.className,
      );
      if (matchedElement.length === 0) return null;
      current = matchedElement[0];
      continue;
    }
  }
  return current;
};
