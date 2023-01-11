import React from "react";
import imageNotFound from "../images/image-not-found.webp";

const Meme = () => {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    image: imageNotFound
  });

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setMemesData(data);
    }
    fetchData();
  }, []);

  const [memesData, setMemesData] = React.useState([]);

  const clickImage = () => {
    let val = Math.floor(Math.random() * 100);
    setMeme((prevData) => {
      return {
        ...prevData,
        image: memesData.data.memes[val].url
      };
    });
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setMeme((prevData) => {
      return {
        ...prevData,
        [name]: value
      };
    });
  };

  return (
    <main>
      <div className="form">
        <input
          name="topText"
          onChange={handleInput}
          className="form--input"
          type="text"
          placeholder="Top Text"
        />
        <input
          name="bottomText"
          onChange={handleInput}
          className="form--input"
          type="text"
          placeholder="Bottom Text"
        />
        <button onClick={clickImage} className="form--button">
          Create a new Meme ➜
        </button>
      </div>
      <div className=""></div>
      <div className="meme--image">
        <img onClick={clickImage} src={meme.image} alt="" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
};

export default Meme;
