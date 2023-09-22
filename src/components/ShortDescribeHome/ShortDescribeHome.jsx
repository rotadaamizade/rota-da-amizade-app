import { useState } from "react";
import ShortDescribe from "../ShortDescribe/ShortDescribe";
import { useEffect } from "react";
import axios from "axios";
import "./ShortDescribeHome.css";

function ShortDescribeHome() {
  const [sponsors, setSponsors] = useState([]);
  useEffect(() => {
    axios.get("Data/sponsors.json").then((res) => {
      setSponsors(res.data);
    });
  }, []);

  return (
    <ShortDescribe>
      <h1>ROTA DA AMIZADE</h1>
      <p id="supporters">apoiadores</p>
      {sponsors.map((sponsor) => {
        return (
          <img
            key={sponsor.id}
            src={`Icons/${sponsor.icon}`}
            alt={sponsor.icon}
            className="sponsor"
          />
        );
      })}
    </ShortDescribe>
  );
}

export default ShortDescribeHome;
