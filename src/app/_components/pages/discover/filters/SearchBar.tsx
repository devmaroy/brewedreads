import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (searchTerm: string) => void;
}

const SearchBar = ({ searchTerm, onSearchTermChange }: SearchBarProps) => {
  return (
    <>
      <Search
        width={16}
        height={16}
        strokeWidth={3}
        className="flex-shrink-0"
      />
      <Input
        type="search"
        placeholder="browse coffee break books..."
        className="without-ring !h-auto border-0 border-none border-transparent bg-transparent !py-18p"
        value={searchTerm}
        onChange={(e) => {
          onSearchTermChange(e.target.value);
        }}
      />
      <Button className="bg-gradient rounded-full p-14p">Search</Button>
    </>
  );
};

export default SearchBar;
