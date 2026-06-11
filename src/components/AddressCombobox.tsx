import { useState, useRef, useEffect } from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface Option {
  code: string;
  name: string;
}

interface AddressComboboxProps {
  options: Option[];
  value: string; // selected code
  onSelect: (code: string, name: string) => void;
  placeholder: string;
  disabled?: boolean;
  loading?: boolean;
  error?: string;
}

export function AddressCombobox({
  options,
  value,
  onSelect,
  placeholder,
  disabled = false,
  loading = false,
  error,
}: AddressComboboxProps) {
  const [open, setOpen] = useState(false);
  const selectedName = options.find((o) => o.code === value)?.name || "";

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled || loading}
            className={cn(
              "w-full flex items-center justify-between px-4 py-3 rounded-xl border text-[14px] outline-none bg-white transition-colors text-left",
              disabled && "opacity-50 cursor-not-allowed",
              error ? "border-[#EF4444]" : "border-[#E5E7EB]"
            )}
            style={{ color: selectedName ? "#1F2937" : "#9CA3AF", minHeight: "48px" }}
          >
            <span className="truncate">
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading...
                </span>
              ) : selectedName || placeholder}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command>
            <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
            <CommandList className="max-h-[250px]">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.code}
                    value={option.name}
                    onSelect={() => {
                      onSelect(option.code, option.name);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.code ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && <p className="text-[11px] text-[#EF4444] mt-1">{error}</p>}
    </div>
  );
}
