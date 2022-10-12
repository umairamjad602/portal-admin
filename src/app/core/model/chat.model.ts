  export interface Avatar {
      sm: string;
      md: string;
      lg: string;
  }

  export interface Options {
      admin: boolean;
      manage_bots: boolean;
      chat_bots: boolean;
      muted: boolean;
      add_participants: boolean;
      invitations: boolean;
      call: boolean;
      message: boolean;
      knock: boolean;
      awaiting_my_approval: boolean;
  }

  export interface Base {
      id: number;
      company_id: number;
      role_id: number;
      type_id: number;
      reports_to: number;
      status: string;
      first_name: string;
      last_name: string;
      email: string;
      username: string;
      email_opt_out: number;
      email_verified: number;
      registration_ip?: any;
      website_language?: any;
      recovery_question?: any;
      recovery_answer?: any;
      type_of_authentication: string;
      email_verification_token_created_at?: any;
      last_login_at: string;
      online: number;
      last_seen: string;
      last_login_ip: string;
      drive_session_id?: any;
      created_at: Date;
      updated_at: Date;
      deleted_at?: any;
      website_language_id?: any;
      brand_id: number;
  }

  export interface Options2 {
      can_message_first: boolean;
      friendable: boolean;
      can_friend: boolean;
      searchable: boolean;
      can_search: boolean;
      online_status: number;
      online_status_verbose: string;
      friend_status: number;
      friend_status_verbose: string;
      last_active?: any;
  }

  export interface Avatar2 {
      sm: string;
      md: string;
      lg: string;
  }

  export interface Recipient {
      name: string;
      route?: any;
      provider_id: number;
      provider_alias: string;
      base: Base;
      options: Options2;
      avatar: Avatar2;
  }

  export interface Base2 {
      id: number;
      company_id: number;
      role_id: number;
      type_id: number;
      reports_to: number;
      status: string;
      first_name: string;
      last_name: string;
      email: string;
      username: string;
      email_opt_out: number;
      email_verified: number;
      registration_ip?: any;
      website_language?: any;
      recovery_question?: any;
      recovery_answer?: any;
      type_of_authentication: string;
      email_verification_token_created_at?: any;
      last_login_at: string;
      online: number;
      last_seen: string;
      last_login_ip: string;
      drive_session_id?: any;
      created_at: Date;
      updated_at: Date;
      deleted_at?: any;
      website_language_id?: any;
      brand_id?: number;
  }

  export interface Avatar3 {
      sm: string;
      md: string;
      lg: string;
  }

  export interface Owner {
      name: string;
      route?: any;
      provider_id: number;
      provider_alias: string;
      base: Base2;
      avatar: Avatar3;
  }

  export interface Meta {
      thread_id: string;
      thread_type: number;
      thread_type_verbose: string;
  }

  export interface LatestMessage {
      id: string;
      thread_id: string;
      owner_id: number;
      owner_type: string;
      owner: Owner;
      type: number;
      type_verbose: string;
      system_message: boolean;
      from_bot: boolean;
      body: string;
      edited: boolean;
      reacted: boolean;
      embeds: boolean;
      extra?: any;
      created_at: Date;
      updated_at: Date;
      meta: Meta;
  }

  export interface Resources {
      recipient: Recipient;
      latest_message: LatestMessage;
  }

  export interface Thread {
      id: string;
      type: number;
      type_verbose: string;
      has_call: boolean;
      locked: boolean;
      pending: boolean;
      name: string;
      avatar: Avatar;
      group: boolean;
      unread: boolean;
      unread_count: number;
      created_at: Date;
      updated_at: Date;
      options: Options;
      resources: Resources;
      latest_message?: LatestMessage;
      is_dirty?: boolean;
      resource?: any;
  }

  export interface Meta2 {
      index: boolean;
      page_id?: any;
      next_page_id?: any;
      next_page_route?: any;
      final_page: boolean;
      per_page: number;
      results: number;
      total: number;
  }

  export interface SystemFeatures {
      bots: boolean;
      calling: boolean;
      invitations: boolean;
      invitations_max: number;
      knocks: boolean;
      audio_messages: boolean;
      document_messages: boolean;
      image_messages: boolean;
      message_edits: boolean;
      message_edits_view: boolean;
      message_reactions: boolean;
      message_reactions_max: number;
      provider_avatars: boolean;
      thread_avatars: boolean;
      bot_avatars: boolean;
  }

  export interface ThreadsResponse {
      data: Thread[];
      meta: Meta2;
      system_features: SystemFeatures;
  }

  export interface ThreadMessage {
    id: string;
    thread_id: string;
    owner_id: number;
    owner_type: string;
    owner: Owner;
    type: number;
    type_verbose: string;
    system_message: boolean;
    from_bot: boolean;
    body: string;
    edited: boolean;
    reacted: boolean;
    embeds: boolean;
    extra?: any;
    created_at: Date;
    updated_at: Date;
    meta: Meta;
  }

  export interface ThreadMessages {
    data: ThreadMessage[];
    meta: Meta2;
  }

  export interface Channel {
    id?: number;
    company_id?: number;
    created_by?: number;
    disply_name?: string;
    type?: string;
    channel_credentials?: string;
    channel_settings?: string;
    status?: string;
    created_at?: any;
    updated_at?: any;
    unread?: boolean;
    threads?: Thread[];
  }

  export interface DashboardOverViewDTO {
    data: {
      teams: any[];
      channels: Channel[];
      labels: any[];
    }
  }

  export type Nullable<T> = T | undefined | null;

  export type ChatEvent = { name: string; payload: any };
