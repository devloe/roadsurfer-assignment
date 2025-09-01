import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

export type AutocompleteOption<TValue = string> = {
  label: string;
  value: TValue;
};

type AutocompleteProps<TValue = string> = {
  id?: string; // ✅ nuevo
  value?: TValue | null;
  query?: string;
  placeholder?: string;
  minChars?: number;
  debounceMs?: number;
  disabled?: boolean;
  fetchOptions: (q: string) => Promise<AutocompleteOption<TValue>[]>;
  onChange?: (value: TValue | null) => void;
  onQueryChange?: (q: string) => void;
};

export function Autocomplete<TValue = string>({
  id, // ✅ nuevo
  query: externalQuery,
  placeholder = "Search…",
  minChars = 1,
  debounceMs = 250,
  disabled = false,
  fetchOptions,
  onChange,
  onQueryChange,
}: AutocompleteProps<TValue>) {
  const [internalQuery, setInternalQuery] = useState<string>(
    externalQuery ?? "",
  );
  const [options, setOptions] = useState<AutocompleteOption<TValue>[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const query = externalQuery !== undefined ? externalQuery : internalQuery;
  const debouncedQuery = useDebouncedValue(query, debounceMs);

  useEffect(() => {
    if (debouncedQuery.trim().length < minChars) {
      setOptions([]);
      setIsOpen(false);
      setHighlightIndex(-1);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    fetchOptions(debouncedQuery)
      .then((opts) => {
        if (!cancelled) {
          setOptions(opts);
          setIsOpen(true);
          setHighlightIndex(opts.length > 0 ? 0 : -1);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setOptions([]);
          setIsOpen(false);
          setHighlightIndex(-1);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, minChars, fetchOptions]);

  useEffect(() => {
    function onDocumentClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (e.target instanceof Node && containerRef.current.contains(e.target))
        return;
      setIsOpen(false);
    }
    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    if (onQueryChange) onQueryChange(next);
    else setInternalQuery(next);
  };

  const handleSelect = (opt: AutocompleteOption<TValue>) => {
    onChange?.(opt.value);
    if (onQueryChange) onQueryChange("");
    else setInternalQuery("");
    setIsOpen(false);
    setOptions([]);
    setHighlightIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setIsOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (isOpen && highlightIndex >= 0 && highlightIndex < options.length) {
        e.preventDefault();
        handleSelect(options[highlightIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const ariaActiveDescendant = useMemo(() => {
    if (!isOpen || highlightIndex < 0) return undefined;
    return `ac-option-${highlightIndex}`;
  }, [isOpen, highlightIndex]);

  return (
    <div ref={containerRef} style={{ position: "relative", textAlign: "left" }}>
      <input
        id={id} // ✅ ahora se aplica al input
        type="text"
        value={query}
        placeholder={placeholder}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (options.length > 0) setIsOpen(true);
        }}
        disabled={disabled}
        role="combobox"
        aria-expanded={isOpen}
        aria-autocomplete="list"
        aria-controls="ac-listbox"
        aria-activedescendant={ariaActiveDescendant}
        style={{ width: "100%", padding: "8px 10px" }}
      />
      {isOpen && (
        <ul id="ac-listbox" role="listbox" className="ac-dropdown">
          {isLoading && (
            <li className="ac-option ac-muted" aria-disabled>
              Loading…
            </li>
          )}
          {!isLoading && options.length === 0 && (
            <li className="ac-option ac-muted" aria-disabled>
              No results
            </li>
          )}
          {!isLoading &&
            options.map((opt, idx) => (
              <li
                key={idx}
                id={`ac-option-${idx}`}
                role="option"
                aria-selected={idx === highlightIndex}
                className={`ac-option${idx === highlightIndex ? " is-active" : ""}`}
                onMouseEnter={() => setHighlightIndex(idx)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(opt)}
              >
                {opt.label}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
