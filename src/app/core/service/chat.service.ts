import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { AuthenticationService } from "../authentication";
import { BaseAPIClass } from "../class/baseAPI.class";
import { Channel, DashboardOverViewDTO, Nullable, Thread, ThreadMessage, ThreadMessages, ThreadsResponse } from "../model/chat.model";
import { Subject } from "rxjs";

declare const window: any;
@Injectable({
  providedIn: 'root'
})

export class ChatService extends BaseAPIClass {
  private readonly URL_LIST_THREADS: string = 'messenger/threads';
  private readonly URL_LIST_CHANNELS: string = 'channels';
  private readonly URL_LIST_INBOXES_OVERVIEW: string = 'channels/overview';
  private readonly URL_FETCH_USERS = 'users';
  public chatEvent = new Subject<any>();
  public overview: DashboardOverViewDTO;
  private threadMessagesStore: Map<string, ThreadMessage[]> = new Map();
  private currentlyActiveChannel: Channel;
  private currentlyActiveThread: Thread;
  private currentThreadMessages: ThreadMessage[] = [];
  public threadLoading = false;

  constructor(
    protected override httpClient: HttpClient,
    protected override authenticationService: AuthenticationService) {
    super(httpClient, authenticationService);
    this.authenticationSubscription = this.authenticationService.onAuthenticationChange.subscribe(
    );
  }

  public fireChatEvent(event: any) {
    this.chatEvent.next(event);
  }

  public bootstrapChat(user: any) {
    window.Pusher = Pusher;
    window.ChatEcho = new Echo({
      devMode: true,
      broadcaster: 'pusher',
      authEndpoint: environment.serverUrl + 'open/test',
      auth: {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + this.authenticationService.getAccessToken(),
        },
      },
      key: environment.pusherKey,
      forceTLS: false,
      encrypted: false,
      enabledTransports: ['ws'],
      cluster: environment.pusherCluster,
      wsHost: environment.pusherHost,
      wsPort: environment.pusherPort
    });
    console.log('Subscribing to: ' + 'messenger.user.' + user.id);

    window.ChatEcho.private('messenger.user.' + user.id)
      .listenToAll((data: any, message: any) => {
        console.log("Message on user channel");
        this.onNewMessageArrived(message);
    });


    console.log('Subscribing to: ' + 'messenger.user.' + user.company_id);
    window.ChatEcho.private('messenger.user.' + user.company_id)
      .listenToAll((data: any, message: any) => {
        this.onNewMessageArrived(message);
    });
  }

  private onNewMessageArrived(message: ThreadMessage) {
    const messageChannelId = message.extra.channel_id;
    const threadId = message.thread_id;
    console.info("%c ===============", 'background: #1db954; color: #000');
    console.log("New Message Arrived From: " + "Channel: " + messageChannelId +"("+ message.extra.channel_type +")");
    console.log("Thread ID: " + threadId +" * Message Body: ("+ message.body +")");
    const channel = this.getChannelByChannelId(messageChannelId);
    this.addThreadMessageToStore(threadId, message);
    if(channel != null) {
      channel.unread = true;
      const thread = this.getThreadFromChannelByThreadId(threadId, channel);
      console.log("Thread: "+ thread);
      if(thread === null) {
        console.log("%c Thread: "+ threadId + " not available in channels should create a new thread", 'background: #c7083b; color: #fff');
        this.fetchThreadForMessageAndAddToChannel(message, channel);
      } else {
        // If thread is found.
        // If the thread is currently open. Do not show bubble.
        if(this.currentlyActiveThread != null && thread.id == this.currentlyActiveThread.id) {
          console.debug("New message on currently active thread : "+ threadId, 'background: #1db954; color: #fff');
          this.chatEvent.next({name: 'new-message-added-to-the-message-box', payload: message});
        } else {
          console.debug("%c New message on an existing thread: "+ threadId, 'background: #1db954; color: #000');
          thread.unread = true;
        }
        this.updateLastMessageInThread(thread, message);
      }
    } else {
      console.log("Unable to push message to thread, channel not found");
    }
    console.info("%c ===============", 'background: #1db954; color: #000');
  }

  private updateLastMessageInThread(thread: Thread, message: ThreadMessage) {
    if(thread.resource?.resources?.latest_message) {
      thread.resource.resources.latest_message = message;
    } else {
      thread.resources.latest_message = message;
    }
  }

  private fetchThreadForMessageAndAddToChannel(message: ThreadMessage, channel: Channel) {
    const threadId = message.thread_id;
    this.fetchThread(threadId).subscribe({
      next: (thread: Thread)=> {
        thread.is_dirty = true;
        thread.unread = true;
        channel.threads?.push(thread);
      }
    });
  }

  private getChannelByChannelId(channelId: number) {
    for(let i = 0; i < this.overview.data.channels.length; i++) {
      if(this.overview.data.channels[i].id == channelId)
        return this.overview.data.channels[i];
    }

    return null;
  }

  private getThreadFromChannelByThreadId(threadId: string, channel: Channel) {
    const channelThreads: Nullable<Thread[]> = channel.threads;
    if(channelThreads) {
      for(let p = 0; p < channelThreads?.length; p++) {
        if(channelThreads[p].id == threadId)
          return channelThreads[p];
      }
    }
    return null;
  }

  public setOverview(overview: DashboardOverViewDTO) {
    this.overview = overview;
  }

  public getOverview() {
    return this.overview;
  }

  public getCurrentThreadMessages() {
    return this.currentThreadMessages;
  }

  public setCurrentlyActiveThread(thread: Thread) {
    this.threadLoading = true;
    this.currentlyActiveThread = thread;
    thread.unread = false;
    const threadMessages = this.getThreadMessagesFromStoreByThreadId(thread.id);
    if(Number(threadMessages?.length) <= 1) {
      this.fetchThreadDetails(thread.id).subscribe({
        next: (response: ThreadMessages) => {
          this.reverseSortMessages(response.data).forEach((message: ThreadMessage)=> {
            this.addThreadMessageToStore(thread.id, message);
          });
          this.currentThreadMessages = this.getThreadMessagesFromStoreByThreadId(thread.id)!;
          this.fireThreadLoaded();
        }
      });
    } else {
      this.currentThreadMessages = this.getThreadMessagesFromStoreByThreadId(thread.id)!;
      this.fireThreadLoaded();
    }
  }

  private fireThreadLoaded() {
    this.threadLoading = false;
    this.chatEvent.next({'name': 'thread-loaded', payload: null});
  }

  public getCurrentlyActiveThread() {
    return this.currentlyActiveThread;
  }

  public setCurrentlyActiveChannel(channel: Channel) {
    this.currentlyActiveChannel = channel;
  }

  public getCurrentlyActiveChannel() {
    return this.currentlyActiveChannel;
  }

  private isChannelAvailable(channelId: number) {
    if(this.overview == null)
      return false;
    if(this.overview.data.channels.length == 0)
      return false;

    for(let i = 0; i < this.overview.data.channels.length; i++) {
      if(this.overview.data.channels[i] == channelId)
        return true;
    }
    return false;
  }

  private isThreadAvailableInChannel(threadId: string) {
    if(this.overview == null)
      return false;
    if(this.overview.data.channels.length == 0)
      return false;

    for(let i = 0; i < this.overview.data.channels.length; i++) {
      const channelThreads: Nullable<Thread[]> = this.overview.data.channels[i].threads;
      if(channelThreads) {
        for(let p = 0; p <= channelThreads?.length; p++) {
          if(channelThreads[p].id == threadId)
            return true;
        }
      }
    }
    return false;
  }

  public fetchConversationsList() {
    return this.getAsync<ThreadsResponse>(this.URL_LIST_THREADS);
  }

  public fetchThread(threadId: string) {
    return this.getAsync<Thread>(this.URL_LIST_THREADS +"/"+ threadId);
  }

  public fetchThreadDetails(threadId: string) {
    return this.getAsync<ThreadMessages>(this.URL_LIST_THREADS +"/"+ threadId+"/messages");
  }

  public sendMessageToChannelThread(channelId: number, threadId: string, message: {temporary_id: string, message: string}) {
    return this.postAsync<ThreadMessage>(this.URL_LIST_CHANNELS+"/"+channelId+"/threads/"+ threadId+"/messages", message);
  }

  public fetchChannels(filter: any) {
    return this.getAsync(this.URL_LIST_CHANNELS, filter);
  }

  public fetchDashboardOverview() {
    return this.getAsync<DashboardOverViewDTO>(this.URL_LIST_INBOXES_OVERVIEW);
  }

  public createChannel(channel: any) {
    return this.postAsync(this.URL_LIST_CHANNELS, channel);
  }

  public addThreadMessageToStore(thredId: string, message: ThreadMessage) {
    if(this.threadMessagesStore.has(thredId)) {
      let threadMessages: Nullable<ThreadMessage[]> = this.threadMessagesStore.get(thredId) || [];
      threadMessages.push(message);
      this.threadMessagesStore.set(thredId, threadMessages);
    } else {
      this.threadMessagesStore.set(thredId, [message]);
    }
  }

  public getThreadMessagesFromStoreByThreadId(threadId: string) {
    if(this.threadMessagesStore == null)
      return [];
    if(this.threadMessagesStore.has(threadId))
      return this.threadMessagesStore.get(threadId);
    return [];
  }

  public generateUUID() {
    let d = new Date().getTime();
    let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;
        if(d > 0){
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  private reverseSortMessages(messages: ThreadMessage[]) {
    messages.sort((a: ThreadMessage, b: ThreadMessage) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      if( dateA > dateB )
        return 1;
      if(dateA < dateB)
        return -1;
      return 0;
    });
    return messages;
  }
  public getUsers(){
    return this.getAsync(this.URL_FETCH_USERS,{per_page: 1000},{},false);
  }
}
