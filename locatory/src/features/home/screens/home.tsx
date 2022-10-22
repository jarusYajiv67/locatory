import React, {useState, useEffect} from "react";
import { FlatList } from "react-native";

import {Container} from './styles';
import SearchBar from "../../../components/searchbar";
import { useMainContext } from "../../../context/main.context";
import {favTranslations as translations} from '../../../utils/translations';

import { ResultItem } from "../../../components/search-result/data";
import SearchResult from "../../../components/search-result";
import axios from "axios";
import { API_URL } from "../../../utils/constants";
import { InfoCard } from "./info";
import NearbyCard from "../../../components/nearby-card";
import { useUserContext } from "../../../context/user.context";

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const {lang, location} = useMainContext();
  const {setLoading, token} = useUserContext();
  const [input, setInput] = useState<string>("");
  const [results, setResults] = useState<Array<ResultItem>>([]);
  const [items, setItems] = useState<Array<InfoCard>>([]);
  const [page, setPage] = useState<string>("");

  const fetchData = async () => {
    if (page === null) return;
    const body = {location, page};
    try {
      setLoading!(true);
      const { data } = await axios.post(
        `${API_URL}api/google-api/nearby-search`,
        { ...body },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPage(data.token);
      setItems([...items, ...data.items]);
      setLoading!(false);
    } catch (err){
      setLoading!(false);
    }
  };

  useEffect(() => {
    if (input.length < 1) {
      setResults([]);
    } else {
      axios
        .post(
          `${API_URL}api/google-api/autocomplete`,
          { location, input },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(({ data }) => setResults(data))
        .catch(console.log);
    }
  }, [input]);

  useEffect(() => {
    if (location.length < 1) return;
    fetchData();
  }, [location]);

  return (
    <Container>
      <SearchBar cb={setInput} placeholder={translations.search[lang]} />
      {input.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={(val) => val.place_id}
          renderItem={(val) => <SearchResult {...val.item} />}
        />
      )}
      {input.length < 1 && (
        <FlatList
          data={items.filter((val) => val.rating !== undefined)}
          keyExtractor={(val) => val.place_id}
          renderItem={(val) => <NearbyCard {...val.item} />}
          onEndReached={fetchData}
          onEndReachedThreshold={0.5}
        />
      )}
    </Container>
  );
};

export default HomeScreen;