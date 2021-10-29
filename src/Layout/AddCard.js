import React, { useEffect } from "react";
import { readDeck } from "../utils/api";
import { useParams, Link } from "react-router-dom";
import NewCardForm from "./NewCardForm";

function AddCard({ deck, setDeck }) {
  const { deckId } = useParams();

  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDeck();
  }, [deckId, setDeck]);

  if (!deck) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h2>{deck.name}: Add Card</h2>
      <div className="mt-3">
        <NewCardForm deck={deck} />
      </div>
    </div>
  );
}

export default AddCard;
