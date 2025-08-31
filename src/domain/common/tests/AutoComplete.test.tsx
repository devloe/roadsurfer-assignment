// Autocomplete.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import {
  Autocomplete,
  type AutocompleteOption,
} from "../components/Autocomplete";

describe("Autocomplete", () => {
  const options: AutocompleteOption[] = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ];

  const fetchOptions = vi.fn(async (q: string) =>
    options.filter((o) => o.label.toLowerCase().includes(q.toLowerCase())),
  );

  it("renders input with placeholder", () => {
    render(
      <Autocomplete fetchOptions={fetchOptions} placeholder="Search fruit…" />,
    );
    expect(screen.getByPlaceholderText("Search fruit…")).toBeInTheDocument();
  });

  it("calls fetchOptions and shows results after typing", async () => {
    render(<Autocomplete fetchOptions={fetchOptions} />);
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "A" } });

    await waitFor(() => {
      expect(fetchOptions).toHaveBeenCalledWith("A");
      expect(screen.getByText("Apple")).toBeInTheDocument();
    });
  });

  it("shows 'No results' if fetchOptions returns empty", async () => {
    const emptyFetch = vi.fn(async () => []);
    render(<Autocomplete fetchOptions={emptyFetch} />);
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "X" } });

    await waitFor(() => {
      expect(screen.getByText("No results")).toBeInTheDocument();
    });
  });

  it("selects an option on click and calls onChange", async () => {
    const onChange = vi.fn();
    render(<Autocomplete fetchOptions={fetchOptions} onChange={onChange} />);
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "A" } });

    await waitFor(() => screen.getByText("Apple"));
    fireEvent.click(screen.getByText("Apple"));

    expect(onChange).toHaveBeenCalledWith("apple");
    expect(screen.queryByRole("listbox")).toBeNull(); // dropdown closed
  });

  it("closes dropdown on Escape", async () => {
    render(<Autocomplete fetchOptions={fetchOptions} />);
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "a" } });

    await waitFor(() => screen.getByText("Apple"));
    fireEvent.keyDown(input, { key: "Escape" });
    expect(screen.queryByRole("listbox")).toBeNull();
  });
});
