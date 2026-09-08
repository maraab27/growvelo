import { useEffect, useRef, type ElementType } from "react";

import { useCms } from "./CmsProvider";

type EditableTextProps = {
  id: string;
  children: string;
  as?: ElementType;
  className?: string;
};

/**
 * Every readable string on the site goes through this component.
 * Public visitors see plain text; the admin sees an inline-editable node.
 */
export function EditableText({ id, children, as, className }: EditableTextProps) {
  const Tag = (as ?? "span") as ElementType;
  const { isAdmin, values, stage } = useCms();
  const ref = useRef<HTMLElement | null>(null);
  const stored = values[id];
  const text = stored !== undefined && stored !== "" ? stored : children;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.activeElement === el) return;
    if (el.textContent !== text) el.textContent = text;
  }, [text]);

  if (!isAdmin) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag
      ref={ref as never}
      data-cms-key={id}
      title={id}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      className={`${className ?? ""} cms-editable`}
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        const next = (e.currentTarget.textContent ?? "").replace(/\s+$/g, "");
        if (next !== text) stage(id, next);
      }}
      onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter") {
          e.preventDefault();
          (e.currentTarget as HTMLElement).blur();
        }
      }}
    >
      {text}
    </Tag>
  );
}
