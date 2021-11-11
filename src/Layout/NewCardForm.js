import React from "react";

function NewCardForm({
  handleFrontChange,
  handleBackChange,
  handleSaveClick,
  handleDoneClick,
  cardFront,
  cardBack,
}) {
  return (
    <form>
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
          value={cardFront}
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
          value={cardBack}
        ></textarea>
      </div>
      <div>
        <button
          type="button"
          className="btn btn-secondary border border-dark"
          onClick={handleDoneClick}
        >
          Done
        </button>
        <button
          type="submit"
          className="btn btn-primary border border-dark ml-1"
          onClick={handleSaveClick}
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default NewCardForm;
