import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createCard } from "../utils/api/index";

function NewCardForm({ deck }) {
  const [frontSide, setFrontSide] = useState();
  const [backSide, setBackSide] = useState();
  const [card, setCard] = useState({});

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
      front: setFrontSide(""),
      back: setBackSide(""),
      deckId: deck.id,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label for="cardFront" className="form-label">
          Front
        </label>
        <textarea
          class="form-control"
          id="cardFront"
          rows="2"
          placeholder="Question"
          onChange={handleFrontChange}
          value={frontSide}
        ></textarea>
      </div>
      <div className="form-group">
        <label for="cardBack" className="form-label">
          Back
        </label>
        <textarea
          class="form-control"
          id="cardBack"
          rows="2"
          placeholder="Answer"
          onChange={handleBackChange}
          value={backSide}
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
