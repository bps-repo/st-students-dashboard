import {createActionGroup, props} from "@ngrx/store";
import {ChatRequest, ChatResponse} from "../../services/chat.service";

export const CHATBOT_FEATURE_KEY = 'chatbot';

export const ChatbotActions = createActionGroup({
  source: CHATBOT_FEATURE_KEY,
  events: {
    "Send message": props<{ prompt: ChatRequest }>(),
    "Send message success": props<{ aiResponse: ChatResponse }>(),
    "Send message failure": props<{ errors: any }>(),
  }
})
