import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Loader from "./Loader";
import { useNavigation } from "react-router-dom";

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="grid h-[100svh] grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default AppLayout;
