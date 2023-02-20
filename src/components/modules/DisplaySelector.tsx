import { Select } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { filter } from '../atom';

const DisplaySelector = () => {
  const [Filter, setFilter] = useRecoilState(filter);

  const handleChange = (e:any) => {
    const newFilter = {...Filter, state: e.target.value};
    setFilter(newFilter);
  };
  return (
    <>
      <Select mx={[0,"2%"]} value={Filter.state} onChange={handleChange} w={"7vw"}>
        <option value='all'>すべて</option>
        <option value='not_started'>未着手</option>
        <option value='start'>着手</option>
        <option value='complete'>完了</option>
      </Select>
    </>
  );
}

export default DisplaySelector;