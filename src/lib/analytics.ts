/**
 * Umami Analytics Helper
 * Safely tracks events with optional properties
 */
export function trackEvent(
  eventName: string,
  properties?: Record<string, string | number | boolean>
) {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(eventName, properties);
  }
}

// Pre-defined event names for consistency
export const EVENTS = {
  // Navigation
  NAV_CLICK_LOGO: 'nav_click_logo',
  NAV_CLICK_MENU_ITEM: 'nav_click_menu_item',
  NAV_OPEN_MOBILE_MENU: 'nav_open_mobile_menu',
  NAV_CLOSE_MOBILE_MENU: 'nav_close_mobile_menu',
  NAV_CLICK_DROPDOWN: 'nav_click_dropdown',
  
  // CTAs
  CTA_CLICK_GET_STARTED: 'cta_click_get_started',
  CTA_CLICK_CONTACT: 'cta_click_contact',
  CTA_CLICK_VIEW_WORK: 'cta_click_view_work',
  CTA_CLICK_REQUEST_REPORT: 'cta_click_request_report',
  CTA_CLICK_BOOK_CALL: 'cta_click_book_call',
  CTA_CLICK_VIEW_PRICING: 'cta_click_view_pricing',
  
  // Forms
  FORM_SUBMIT_CONTACT: 'form_submit_contact',
  FORM_SUBMIT_REPORT_REQUEST: 'form_submit_report_request',
  FORM_ERROR: 'form_error',
  
  // Report Wizard
  WIZARD_OPEN: 'wizard_open',
  WIZARD_STEP: 'wizard_step',
  WIZARD_SELECT_REPORT: 'wizard_select_report',
  WIZARD_COMPLETE: 'wizard_complete',
  WIZARD_CLOSE: 'wizard_close',
  
  // Calendar
  CALENDAR_SELECT_DATE: 'calendar_select_date',
  CALENDAR_SELECT_TIME: 'calendar_select_time',
  
  // Pricing
  PRICING_VIEW_TAB: 'pricing_view_tab',
  PRICING_SELECT_PLAN: 'pricing_select_plan',
  
  // Case Studies
  CASE_STUDY_FILTER: 'case_study_filter',
  CASE_STUDY_VIEW: 'case_study_view',
  CASE_STUDY_EXTERNAL_LINK: 'case_study_external_link',
  
  // Footer
  FOOTER_CLICK_LINK: 'footer_click_link',
  FOOTER_CLICK_SOCIAL: 'footer_click_social',
  
  // External Links
  LINK_CLICK_PHONE: 'link_click_phone',
  LINK_CLICK_EMAIL: 'link_click_email',
  LINK_CLICK_EXTERNAL: 'link_click_external',
} as const;
