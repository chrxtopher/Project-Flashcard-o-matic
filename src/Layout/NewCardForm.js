import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createCard } from "../utils/api/index";

function NewCardForm({ deck }) {
  const [card, setCard] = useState({});

  //////////////////
  //HANDLERS BELOW//
  //////////////////

  const handleFrontChange = (event) => {
    setCard({ ...card, front: event.target.value });
  };

  const handleBackChange = (event) => {
    setCard({ ...card, back: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    async function loadCard() {
      await createCard(deck.id, card);
    }
    loadCard();
    setCard({
      ...card,
      front: "",
      back: "",
      deckId: deck.id,
    });
  };

  ////////////////
  //RETURN BELOW//
  ////////////////

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="cardFront" className="form-label">
          Front
        </label>
        <textarea
          className="form-control"
          id="cardFront"
          rows="2"
          placeholder="Question"
          onChange={handleFrontChange}
          value={card.front}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="cardBack" className="form-label">
          Back
        </label>
        <textarea
          className="form-control"
          id="cardBack"
          rows="2"
          placeholder="Answer"
          onChange={handleBackChange}
          value={card.back}
        ></textarea>
      </div>
      <div>
        <Link to={`/decks/${deck.id}`}>
          <button
            type="button"
            className="btn btn-secondary border border-dark"
          >
            Done
          </button>
        </Link>
        <button
          type="submit"
          className="btn btn-primary border border-dark ml-1"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default NewCardForm;
