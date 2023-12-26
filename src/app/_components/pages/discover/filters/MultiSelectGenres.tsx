import { type Filter } from "@/types/types";
import { Check } from "lucide-react";
import { MultiSelect } from "primereact/multiselect";

interface MultiSelectGenresProps {
  filters: Filter[];
  activeGenres: string[];
  selectAllGenres: boolean;
  onSelectAllGenres: (checked: boolean) => void;
  onGenresChange: (genres: string[]) => void;
}

const MultiSelectGenres = ({
  filters,
  activeGenres,
  selectAllGenres,
  onSelectAllGenres,
  onGenresChange,
}: MultiSelectGenresProps) => {
  return (
    <MultiSelect
      options={filters}
      value={activeGenres}
      onChange={(e) => {
        const value = e.value as string[];

        onGenresChange(value);
        onSelectAllGenres(value.length === filters.length);
      }}
      selectAll={selectAllGenres}
      onSelectAll={(e) => {
        onSelectAllGenres(!e.checked);
        onGenresChange(e.checked ? [] : filters.map(({ value }) => value));
      }}
      placeholder="Select Genres"
      className="br-select"
      itemClassName="bg-select-item"
      panelClassName="bg-select-panel"
      checkboxIcon={
        <Check width={14} height={14} className="bg-select-checkbox-icon" />
      }
    />
  );
};

export default MultiSelectGenres;

// <MultiSelect
//             options={filterOptions}
//             value={activeGenres}
//             onChange={(e) => setActiveGenres(e.value as string[])}
//             selectAll={selectAllGenres}
//             onSelectAll={(e) => {
//               setSelectAllGenres(!e.checked);
//               setActiveGenres(
//                 e.checked ? [] : filterOptions.map((filter) => filter.value),
//               );
//             }}
//             placeholder="Select Genres"
//             className="br-select"
//             itemClassName="bg-select-item"
//             panelClassName="bg-select-panel"
//             checkboxIcon={
//               <Check
//                 width={14}
//                 height={14}
//                 className="bg-select-checkbox-icon"
//               />
//             }
//           />
