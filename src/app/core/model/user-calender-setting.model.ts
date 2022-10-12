export interface UserCalendarSetting {
    id: number;
    user_id: number;
    time_zone: string;
    starting_day_of_the_week: string;
    day_starts_at: string;
    date_format: string;
    calendar_hour_format: string;
    default_calendar_view: string;
    default_call_duration_mins: string;
    other_event_duration_mins: string;
    default_event_status: string;
    default_activity_type: string;
    popup_reminder_interval: string;
    hide_completed_calendar_events: string;
    created_at: Date;
    updated_at: Date;
  };