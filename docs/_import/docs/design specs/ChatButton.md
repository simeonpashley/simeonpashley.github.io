# **Specification Document: Chat Button Overlay Feature**

## **Overview**

This document specifies the requirements for implementing a chat button overlay, inspired by the behaviour of tools like Intercom. The feature includes a fixed-position chat button, an expandable contact dialog, idle prompts, and smooth animations to enhance user interaction.

---

## **Functional Requirements**

The button emulates the behaviour of tools like Intercom _BUT_ it is not a chat widget. When clicked it behaves as if the chat agent is offline and the user is prompted to enter a message.

The Button has 3 states:

- **Closed**
- **Open**
- **Idle**

---

### **1. Closed: Chat Button**

- **Positioning:**
  - Fixed at the bottom-right corner of the viewport, always visible.
- **Appearance:**
  - Circular button with an icon (e.g., a speech bubble).
  - Configurable styles, such as size, colour, and hover effects, to align with the brand.
- **Hover State:**
  - Highlights subtly with a shadow, opacity change, or colour shift to indicate interactivity.
- **Click Behaviour:**
  - Expands into a small dialog box positioned above or next to the button.
  - Changes the button's icon to a "minimise" symbol while the dialog is open.

---

### **2. Open: Contact Dialog**

- **Positioning:**

  - Anchored to the chat button, appearing above or beside it.
  - For mobile devices, the dialog adjusts to a larger portion of the screen for usability.

- **Appearance:**

  - Compact and clean design, including the following elements:
    - **Header:**
      - Branding or welcome message (e.g., "Simora").
      - Optional avatars or representative images of the support team.
      - A minimise or expand button in the top-right corner.
    - **Body:**
      - A configurable welcome message (e.g., "Hi 👋 How can I help you?").
      - A list of quick reply options (e.g., "Chat with a product expert", "Learn more about us").
    - **Input Area:**
      - If enabled, allows the user to type custom messages.

- **Behaviour:**

  - Smooth open/close animation with a slide and fade transition.
  - Supports dynamic updates to messages and quick reply buttons.

- **Close Options:**

  - Clicking the minimise button.
  - Clicking outside the dialog area.
  - For mobile devices, a swipe-down gesture may optionally minimise the dialog.

- **Responsive Design:**

  - On smaller screens, the dialog resizes or occupies a more significant portion of the screen.
  - Touch-friendly buttons and input areas for usability on mobile devices.

---

### **3. Idle Prompts**

- **Triggering:**

  - Idle state is NOT triggered when button is open
  - Idle state is NOT triggered if the user has interacted with the button at any point.
  - Appears after a defined period of user inactivity (e.g., 10 seconds).
  - Inactivity is measured by the absence of mouse movement, keyboard input, or touch interactions.
  - Once shown, stays visible until explicitly dismissed

- **Appearance:**

  - Fixed width of 340px with 10px outer padding
  - The idle prompt resembles a small pop-out dialog box with the following elements:
    - **Message Content:**
      - A friendly, conversational prompt such as "Hi 👋 How can I help you?".
      - Optionally includes an avatar or logo for branding purposes.
      - Timestamp or context marker (e.g., "Message from Simora · 1m ago").
      - Message spans full width of container
    - **Action Buttons:**
      - Stacked vertically below the message
      - Each button is a proper link wrapping a button element
      - Pill-shaped with rounded ends
      - Equal horizontal and vertical padding
      - Light shadow effect
      - Right-aligned to the container
      - Auto-sized to content
      - Hover state indicates clickability
      - Can be configured as quick replies or regular actions
      - Uses Next.js Link components for proper routing

- **Hover Controls:**

  - On hover, shows "View More" and close "X" buttons
  - View More opens the chat dialog directly
  - Close button dismisses the entire message stack
  - Controls fade in/out smoothly

- **Dismissal:**
  - Only through explicit user interaction:
    - Clicking X button
    - Clicking View More (opens chat)
    - Clicking an action link
    - Clicking the chat button
  - General user activity no longer auto-dismisses
  - Reset the last activity time when the dialog is closed

---

## **Detailed Behaviour**

### **Chat Button**

- **Default State:**

  - Circular button positioned at the bottom-right corner of the viewport.
  - Fixed width of 340px container with 10px padding

- **Hover:**

  - Highlights subtly with visual feedback (e.g., shadow or colour change).

- **Click:**
  - Transitions smoothly to open the contact dialog.
  - Changes the button icon to a "minimise" symbol.
  - When clicked again, closes the dialog with a smooth animation.

---

### **Contact Dialog**

- **Animation:**

  - Slides and fades in/out when opening or closing.
  - Transitions should be smooth and subtle, lasting no more than 300ms.

- **Interactivity:**

  - Displays a configurable welcome message and optional quick reply buttons.
  - Allows the user to type messages in an input field (if enabled).
  - Fixed width of 340px with 10px outer padding

- **Action Buttons:**

  - Configurable array of action links
  - Each action has text and href properties
  - Uses Next.js Link components for proper routing
  - Pill-shaped with rounded ends
  - Equal horizontal and vertical padding (px-4 py-2)
  - Light shadow effect
  - Right-aligned for cleaner appearance
  - Auto-sized to prevent text wrapping
  - Hover state indicates clickability

- **Close Options:**
  - Minimise button inside the dialog.
  - Clicking outside the dialog area.

---

### **Idle Prompts**

- **Initial Trigger:**

  - Appear after a defined period of user inactivity (e.g., 10 seconds).

- **Appearance:**

  - A small prompt styled as a speech bubble or tooltip.
  - Positioned near the chat button to subtly draw attention.

- **Dismissal:**

  - Fades out when the user interacts with the button or dialog.
  - Automatically disappears after a short period if there is no interaction.

---

## **Changelog**

## **2024-03-14: Idle Message Enhancements**

### Added

- Stacked action buttons below idle message
  - Configurable array of action links in the config
  - Each action has text and href properties
  - Actions styled as clickable cards
  - Hover state indicates clickability
  - Actions navigate to specified URLs

### Changed

- Idle message behavior
  - Message stays visible until explicitly dismissed
  - Removed auto-fade behavior
  - View More and Close buttons now control entire message stack
  - Hover state only affects action buttons visibility
  - General user activity no longer dismisses the message

### Fixed

- Idle message persistence
  - Message no longer disappears on mouse movement
  - Only dismissible through explicit user interaction:
    - Clicking X button
    - Clicking View More
    - Clicking an action link
    - Clicking the chat button

## **2024-03-14: Intercom-Style Refinements**

### Changed

- View More behavior
  - Now opens the chat dialog instead of navigating to a new page
  - Consistent with Intercom's interaction pattern
  - Provides immediate access to chat functionality

### Improved

- Message and button sizing
  - Messages and buttons now auto-size to content
  - Maximum width constraint for larger screens
  - Right-aligned buttons for cleaner appearance
  - Prevents text wrapping in action buttons
  - More responsive to different content lengths

## **2024-03-14: Fixed Width and Button Styling**

### Changed

- Fixed width implementation
  - Set consistent 340px width for both idle and open states
  - Added 10px padding to outer container
  - Message box now spans full width of container
  - Matches Intercom's layout approach

### Improved

- Action button styling
  - Pill-shaped buttons with rounded ends (rounded-full)
  - Equal horizontal and vertical padding (px-4 py-2)
  - Lighter shadow effect (shadow-sm)
  - Cleaner hover transitions
  - Better visual distinction from message box

## **2024-03-14: Link Handling Improvements**

### Changed

- Action handling
  - Actions now use proper Next.js Link components
  - Improved type safety for href properties
  - Consistent link behavior across components

### Fixed

- Link wrapping
  - Links now properly wrap buttons instead of buttons containing links
  - Maintains semantic HTML structure
  - Better accessibility for navigation
  - Consistent styling between link and non-link buttons

## **2024-03-14: Animation and Idle State Fixes**

### Fixed

- Animation structure
  - Removed duplicate button rendering
  - Separated chat button from dialog animations
  - Fixed AnimatePresence mode conflicts
  - Improved animation reliability

- Idle detection reliability
  - Added scroll event to activity tracking
  - Implemented more reliable interval-based idle checking
  - Fixed initial activity timestamp setting
  - Added proper cleanup of event listeners
  - Ensured idle prompt only shows in closed state
  - Added comprehensive state dependency tracking

### Changed

- Idle timer implementation
  - Switched from setTimeout to setInterval for more reliable checks
  - Added 1-second interval checks instead of single timeout
  - Improved state management for activity tracking
  - Better handling of component cleanup
