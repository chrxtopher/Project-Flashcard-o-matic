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

  if (!card) {
    return <h1>Loading...</h1>;
  }

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
    updateCard(card).then((response) =>
      history.push(`/decks/${deckId}/cards/${cardId}/edit`)
    );
  };

  ////////////////
  //RETURN BELOW//
  ////////////////

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                class="bi bi-house-door-fill"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
              </svg>{" "}
              Home
            </Link>
          </li>
          <li class="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
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
            className="form-control"
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
