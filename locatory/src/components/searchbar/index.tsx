import React, { useState, useEffect } from "react";

import {
  SearchContainer,
  SearchBar as Searchbar
} from './styles';

interface SearchBarProps {
  cb: (val: string) => void;
  placeholder: string;
  autoComplete?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  cb, placeholder, autoComplete = false
}) => {
  const [text, setText] = useState<string>("");
  const callback = () => cb(text);

  useEffect(() => {
    cb(text);
  }, [text]);

  return (
    <SearchContainer>
      <Searchbar
        value={text}
        onChangeText={setText}
        onIconPress={callback}
        onSubmitEditing={callback}
        placeholder={placeholder}
      />
    </SearchContainer>
  );
};

export default SearchBar;
