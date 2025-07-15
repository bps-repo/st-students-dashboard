import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";

export interface ChatbotState extends EntityState<any> {
  messages: string[]
  loading: boolean;
  errors: any
}

export const ChatBotAdapter: EntityAdapter<any> = createEntityAdapter(
  {
    selectId: (chatbot: any) => chatbot.id,
    sortComparer: false
  }
)

export const ChatBotInitialState: ChatbotState = ChatBotAdapter.getInitialState({
  loading: false,
  errors: null,
  messages: []
})
