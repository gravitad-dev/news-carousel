import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "cmdk";
import { ChevronsUpDown, X } from "lucide-react";
import * as React from "react";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "../../lib/utils";

export type ComboboxOption = {
  value: string;
  label: string;
};

type ComboboxProps = {
  options: ComboboxOption[];
  value: string | null;
  onChange: (value: string) => void;
  id?: string;
  ariaLabel?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  triggerClassName?: string;
  disabled?: boolean;
};

export const Combobox = ({
  options,
  value,
  onChange,
  id,
  ariaLabel,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  className,
  triggerClassName,
  disabled
}: ComboboxProps) => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const listId = React.useId();
  const selected = options.find((option) => option.value === value);
  const searchTerms = search
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const filteredOptions = options.filter((option) => {
    const searchableText = option.label
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase();

    return searchTerms.every((term) => searchableText.includes(term));
  });

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) setSearch("");
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          id={id}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-label={ariaLabel}
          disabled={disabled}
          className={cn(
            "flex h-10 w-full items-center justify-between gap-2 rounded border border-gray-700 bg-gray-800 px-3 text-sm text-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
            triggerClassName,
            className
          )}
        >
          <span className={cn("truncate", !selected && "text-gray-400")}>
            {selected?.label ?? placeholder}
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] p-0"
      >
        <Command shouldFilter={false} className="bg-gray-800 text-gray-100">
          <div className="flex items-center border-b border-gray-700">
            <CommandInput
              placeholder={searchPlaceholder}
              value={search}
              className="flex h-10 w-full bg-transparent px-3 text-sm text-gray-100 outline-none placeholder:text-gray-500"
              onValueChange={setSearch}
            />
            {search && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setSearch("")}
                className="mr-2 rounded p-1 text-gray-400 hover:bg-gray-700 hover:text-gray-100"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <CommandList
            id={listId}
            className="max-h-64 overflow-auto p-1"
          >
            <CommandEmpty className="px-3 py-4 text-center text-sm text-gray-400">
              {emptyMessage}
            </CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex cursor-pointer items-center rounded px-2 py-2 text-sm text-gray-100 aria-selected:bg-gray-700",
                    option.value === value && "bg-blue-900"
                  )}
                >
                  <span
                    className={cn(
                      "truncate",
                      option.value === value && "text-blue-200"
                    )}
                  >
                    {option.label}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
