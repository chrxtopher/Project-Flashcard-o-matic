import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api/index";
import { useParams, useHistory, Link } from "react-router-dom";
import NotEnoughCards from "./NotEnoughCards";

function Study() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState();
  const [view, setView] = useState({
    cards: [],
    current: 0,
    front: true,
    flipped: false,
    max: 0,
  });

  useEffect(() => {
    async function loadDeck() {
      const currentDeck = await readDeck(deckId);
      setDeck(currentDeck);
      setView({
        cards: currentDeck.cards,
        current: 0,
        front: true,
        flipped: false,
        max: currentDeck.cards.length,
      });
    }
    loadDeck();
  }, [deckId]);

  function cardFace() {
    return view.front
      ? view.cards[view.current].front
      : view.cards[view.current].back;
  }

  function nextButton() {
    if (view.flipped)
      return (
        <button
          className="btn btn-warning border border-dark"
          onClick={handleNext}
        >
          Next
        </button>
      );
  }

  const handleFlip = () => {
    setView({
      ...view,
      front: !view.front,
      flipped: !view.flipped,
    });
  };

  const handleNext = () => {
    if (view.current >= view.max - 1) {
      if (window.confirm("Would you like to start over?")) {
        setView({
          ...view,
          current: 0,
          front: true,
          flipped: false,
        });
      } else {
        history.push("/");
      }
    } else {
      setView({
        ...view,
        current: view.current + 1,
        front: true,
        flipped: false,
      });
    }
  };

  if (!deck) {
    return <h1>Loading...</h1>;
  }

  if (view.max < 3) {
    return <NotEnoughCards deck={deck} />;
  }

  return (
    <div>
      <div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li class="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
      </div>
      <div>
        <h1 className="display-4">Study: {deck.name}</h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{`Card ${view.current + 1} of ${
              view.max
            }`}</h5>
            <p className="card-text">{cardFace()}</p>
            <button
              className="btn btn-primary border border-dark mr-2"
              onClick={handleFlip}
            >
              Flip
            </button>
            {nextButton()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Study;
