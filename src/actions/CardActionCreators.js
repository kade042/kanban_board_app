import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import KanbanAPI from '../api/KanbanApi';
import { throttle } from '../utils';
import CardStore from '../stores/CardStore';

let CardActionCreators = {
  fetchCards() {
    AppDispatcher.dispatchAsync(KanbanAPI.fetchCards(), {
      request: constants.FETCH_CARDS,
      success: constants.FETCH_CARDS_SUCCESS,
      failure: constants.FETCH_CARDS_ERROR,
    });
  },

  addCard(card) {
    AppDispatcher.dispatchAsync(KanbanAPI.addCard(card), {
      request: constants.CREATE_CARD,
      success: constants.CREATE_CARD_SUCCESS,
      failure: constants.CREATE_CARD_ERROR,
    }, (card));
  },

  updateCard(card, draftCard) {
    AppDispatcher.dispatchAsync(KanbanAPI.updateCard(card, draftCard), {
      request: constants.UPDATE_CARD,
      success: constants.UPDATE_CARD_SUCCESS,
      failure: constants.UPDATE_CARD_ERROR,
    }, (card, draftCard));
  },

  updateCardStatus: throttle((cardId, listId) => {
    AppDispatcher.dispatch({
      type: constants.UPDATE_CARD_STATUS,
      payload: { cardId, listId },
    });
  }),

  updateCardPosition: throttle((cardId, afterId) => {
    AppDispatcher.dispatch({
      type: constants.UPDATE_CARD_POSITION,
      payload: { cardId, afterId },
    });
  }, 500),

  persistCardDrag(cardProps) {
    let card = CardStore.getCard(cardProps.id);
    let cardIndex = CardStore.getCardIndex(cardProps.id);

    AppDispatcher.dispatchAsync(KanbanAPI.persistCardDrag(card.id, card.status, cardIndex), {
      request: constants.PERSIST_CARD_DRAG,
      success: constants.PERSIST_CARD_DRAG_SUCCESS,
      failure: constants.PERSIST_CARD_DRAG_ERROR,
    }, (cardProps));
  },

  deleteTask(cardId, task, taskIndex) {
    AppDispatcher.dispatchAsync(KanbanAPI.deleteTask(cardId, task, taskIndex), {
      request: constants.DELETE_TASK,
      success: constants.DELETE_TASK_SUCCESS,
      failure: constants.DELETE_TASK_ERROR,
    }, (cardId, task, taskIndex));
  },

  toggleTask(cardId, task, taskIndex) {
    AppDispatcher.dispatchAsync(KanbanAPI.toggleTask(cardId, task, taskIndex), {
      request: constants.TOGGLE_TASK,
      success: constants.TOGGLE_TASK_SUCCESS,
      failure: constants.TOGGLE_TASK_ERROR,
    }, (cardId, task, taskIndex));
  },
};

export default CardActionCreators;