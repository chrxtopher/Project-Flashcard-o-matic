import React, { useState, useEffect } from "react";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";
import { useParams, useHistory, Link } from "react-router-dom";

function Deck() {
  const [deck, setDeck] = useState();
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadDeck() {
      const currentDeck = await readDeck(deckId);
      setDeck(currentDeck);
    }
    loadDeck();
  }, [deckId]);

  if (!deck) {
    return <h1>Loading deck information...</h1>;
  }

  const handleDeleteDeck = () => {
    const certain = window.confirm(
      "Are you sure you want to delete this deck?"
    );

    if (certain) {
      deleteDeck(deckId);
      history.push("/");
    }
  };

  function handleDeleteCard(cardId) {
    const certain = window.confirm(
      "Are you sure you want to delete this card?"
    );

    if (certain) {
      deleteCard(cardId);
      window.location.reload(false);
    }
  }

  const cardList = deck.cards.map((card) => {
    return (
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <p className="card-text border-right">Q: {card.front}</p>
            </div>
            <div className="col">
              <p className="card-text">A: {card.back}</p>
            </div>
          </div>
          <div className="mt-3 float-right">
            <button
              type="button"
              className="btn btn-warning border border-dark mr-1"
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger border border-dark"
              onClick={() => handleDeleteCard(card.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active">{deck.name}</li>
        </ol>
      </nav>
      <div className="mb-3">
        <h2 className="display-4">{deck.name}</h2>
        <p>{deck.description}</p>
        <button type="button" className="btn btn-warning border border-dark">
          Edit
        </button>
        <button
          type="button"
          className="btn btn-success border border-dark ml-1"
        >
          Study
        </button>
        <Link to={`/decks/${deck.id}/cards/new`}>
          <button
            type="button"
            className="btn btn-primary border border-dark ml-1"
          >
            Add Cards
          </button>
        </Link>
        <button
          type="button"
          className="btn btn-danger float-right border border-dark"
          onClick={handleDeleteDeck}
        >
          Delete
        </button>
      </div>
      <div>
        <h3>Cards</h3>
        <div>{cardList}</div>
      </div>
    </div>
  );
}

export default Deck;
