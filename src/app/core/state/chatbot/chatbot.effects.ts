import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ChatbotActions} from "./chatbot.actions";
import {exhaustMap, of} from "rxjs";
import {ChatService} from "../../services/chat.service";
import {catchError, map} from "rxjs/operators";

export class ChatbotEffects {
  constructor(private readonly actions$: Actions, private chatBotService: ChatService) {
  }

  sendMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatbotActions.sendMessage),
      exhaustMap(({prompt}) => {
        return this.chatBotService.sendMessage(prompt).pipe(
          map((e) => ChatbotActions.sendMessageSuccess({aiResponse: e})),
          catchError((e) => of(ChatbotActions.sendMessageFailure({errors: e.error.message})))
        );
      })
    )
  )
}
