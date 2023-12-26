import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { type SortKey } from "@/types/types";
import { ArrowDownUp } from "lucide-react";

const sortByFilters = [
  {
    value: "title_asc",
    label: "Title (A-Z)",
  },
  { value: "title_desc", label: "Title (Z-A)" },
  { value: "publishedDate_desc", label: "Newest First" },
  { value: "publishedDate_asc", label: "Oldest First" },
  { value: "pageCount_desc", label: "Longest First" },
  { value: "pageCount_asc", label: "Shortest First" },
  { value: "averageRating_desc", label: "Highest Rated" },
  { value: "averageRating_asc", label: "Lowest Rated" },
];

interface SortByProps {
  activeSortByFilter: SortKey;
  onSortByFilterChange: (sortByFilter: SortKey) => void;
}

const SortBy = ({ activeSortByFilter, onSortByFilterChange }: SortByProps) => {
  return (
    <div className="lg:order-last">
      <Select onValueChange={onSortByFilterChange} value={activeSortByFilter}>
        <SelectTrigger className="br-sort-select without-ring ml-16p h-auto w-auto border-none bg-foreground !p-16p">
          <ArrowDownUp height={24} width={24} />
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="border-none bg-foreground-off py-14p text-left font-sans text-white">
          {sortByFilters.map(({ label, value }) => (
            <SelectItem
              key={value}
              value={value}
              className="mb-8p mr-8p cursor-pointer px-14p py-8p transition-all focus:bg-primary focus:text-white"
            >
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortBy;
