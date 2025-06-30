import {createFeature, createReducer, on} from "@ngrx/store";
import {CHATBOT_FEATURE_KEY, ChatbotActions} from "./chatbot.actions";
import {ChatBotAdapter, ChatBotInitialState} from "./chatbot.state";

export const ChatBotFeature = createFeature({
  name: CHATBOT_FEATURE_KEY,
  reducer: createReducer(ChatBotInitialState,
    on(ChatbotActions.sendMessage, (state) => ({
      ...state,
      errors: null,
      loading: true,
    })),
    on(ChatbotActions.sendMessageSuccess, (state, {aiResponse}) =>
      ChatBotAdapter.setOne(aiResponse, {
        ...state,
        loading: false,
        errors: null,
      })),
    on(ChatbotActions.sendMessageFailure, (state, {errors}) => ({
      ...state,
      errors,
      loading: false,
    }))
  )
})
