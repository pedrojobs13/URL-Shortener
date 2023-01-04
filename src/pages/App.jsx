import axios from "axios";
import { useEffect, useState } from "react";
import "./styles.css";

import { CopyToClipboard } from "react-copy-to-clipboard";
export function App() {
  const [Link, setLink] = useState("");

  const handleClick = () => {
    const url = "https://api-ssl.bitly.com/v4/shorten";
    let options = {
      method: "POST",
      url: url,
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SOME_KEY}`,
        "Content-Type": "application/json",
      },
      data: {
        long_url: Link,
      },
    };

    axios
      .request(options)
      .then((response) => setLink(response))
      .catch((err) => console.log(err));
  };

  return (
    <div className="Container">
      <label>Encurtador de Link</label>
      <input type="text" onChange={(e) => setLink(e.target.value)} />
      <button
        onClick={() => {
          handleClick();
        }}
      >
        Entrar
      </button>

      {Link.data && (
        <div className="link_pronto">
          {Link.data.link}
          <CopyToClipboard text={Link.data.link}>
            <button>Copiar </button>
          </CopyToClipboard>
        </div>
      )}
    </div>
  );
}
