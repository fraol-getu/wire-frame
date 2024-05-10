import "./styles/index.css";
import Section1 from "./components/section/Section1";
import Section2 from "./components/section/Section2";
import Section3 from "./components/section/Section3";
import Section4 from "./components/section/Section4";
import Footer from "./components/section/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { Url } from "./api/api";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      axios.get(Url).then((res) => {setData(res.data.data);})
        .catch((err) => console.log(err, "error"));
    };
    fetchData();
  }, []);

  return (
    <main>
      <Section1 data={data}/>
      <Section2 data={data}/>
      <Section3 data={data}/>
      <Section4 data={data}/>
      <Footer />
    </main>
  );
}

export default App;
