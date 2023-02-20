import { CurrentItem } from '../../components/CurrentItem';
import { Header, Main } from '../../layouts';

export const Item = () => {
  return (
    <>
      <Header />
      <Main>
        <CurrentItem />
      </Main>
    </>
  );
};
