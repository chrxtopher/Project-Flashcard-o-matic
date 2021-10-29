import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { updateCard, readCard, readDeck } from "../utils/api/index";
import { Link } from "react-router-dom";

function EditCard({ card, setCard, deck, setDeck }) {
  const { deckId, cardId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadDeck() {
      const currentDeck = await readDeck(deckId);
      setDeck(currentDeck);
    }
    loadDeck();
  }, [deckId, setDeck]);

  useEffect(() => {
    async function loadCard() {
      const currentCard = await readCard(cardId);
      setCard(currentCard);
    }
    loadCard();
  }, [cardId, setCard]);

  const handleFrontChange = (event) => {
    setCard({ ...card, front: event.target.value });
  };

  const handleBackChange = (event) => {
    setCard({ ...card, back: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateCard(card).then((response) =>
      history.push(`/decks/${deckId}/cards/${cardId}/edit`)
    );
  };

  if (!card) {
    return <h1>Loading...</h1>;
  }

  //////
  return (
    <div>
      <h1 className="display-4">Edit Card</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="cardFront" className="form-label">
            Front
          </label>
          <textarea
            class="form-control"
            id="cardFront"
            rows="2"
            onChange={handleFrontChange}
            defaultValue={card.front}
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
            onChange={handleBackChange}
            defaultValue={card.back}
          ></textarea>
        </div>
        <div>
          <Link to={`/decks/${deckId}`}>
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
    </div>
  );
}

export default EditCard;
