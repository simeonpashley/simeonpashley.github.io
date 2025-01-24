# Testimonial Component Design Specification

> **Compliance Note**: Unless specified below, at 2025-01-15, this specification complies with master design documents. It only documents component-specific variations and extensions to the master guidelines defined in BRAND_GUIDELINES.md, VISUAL_DESIGN_GUIDE.md, and WRITING_VOICE.md.

## Overview

The Testimonial component system provides a dynamic way to showcase customer feedback and social proof throughout the Simora website. It consists of two main components:
- `Testimonial`: Individual testimonial display
- `TestimonialSlideshow`: Auto-rotating carousel of testimonials

## Purpose & UX Goals

### Primary Goals

- Build trust through authentic customer stories
- Demonstrate real-world value of Simora Ops
- Support conversion by showing social proof
- Maintain visual engagement through motion

### User Experience Objectives

- Ensure readability across all devices
- Present testimonials in a non-intrusive manner
- Maintain accessibility during transitions
- Support both short and long testimonial content

## Design Decisions & Constraints

### Component Architecture

- Separation between display (`Testimonial`) and behavior (`TestimonialSlideshow`)
- Stateless individual testimonial cards
- Centralized state management in slideshow
- Fade transitions for smooth content changes

### Visual Design

- Refer to BRAND_GUIDELINES.md

### Animation Specifications

- Card Frame Behavior:
  - Maintains permanent presence on screen
  - Fixed dimensions to prevent layout shifts
  - Consistent elevation and border styling

- Content Transition Sequence:
  1. Initial State:
     - Card frame visible
     - Previous content at 0% opacity or empty
  2. Content Fade In:
     - Avatar, author, and text fade to 100% opacity
     - Duration: 300ms
  3. Content Display:
     - Content remains visible
     - Duration: 5000ms (5 seconds)
  4. Content Fade Out:
     - Avatar, author, and text fade to 0% opacity
     - Duration: 300ms
  5. Content Swap:
     - Once opacity reaches 0%, next testimonial content is loaded
     - No visible transition of content swap
  6. Sequence repeats from step 2

- Implementation Notes:
  - Use CSS opacity transitions for smooth fades
  - Maintain content in DOM during transitions
  - Prevent text selection during fade transitions
  - Handle interrupted transitions gracefully

### Testing Behavior

#### Core Functionality

1. Content Transitions
   - Single testimonial displays correctly
   - Multiple testimonials rotate in sequence
   - Transitions complete smoothly
   - Content remains readable during transitions
   - Avatar loads and displays correctly

2. Component Lifecycle
   - Mounts with initial testimonial
   - Updates with new testimonial data
   - Unmounts cleanly without memory leaks
   - Maintains state during parent re-renders

#### Edge Cases

1. Content Issues
   - Missing required fields (text/author)
   - Malformed testimonial data
   - Empty testimonials array
   - Single testimonial in array
   - Extremely long content
   - Special characters in text

2. Image Handling
   - Missing avatar image
   - Broken image URL
   - Oversized images

3. Timing Edge Cases
   - Rapid mount/unmount cycles
   - Browser tab inactive/active switches

#### Non-Functional Requirements (NFRs)

1. Visual Regression
   - Different viewport sizes
   - Font size adjustments

### Accessibility Features

- Proper ARIA labels for dynamic content
- Maintained readability during transitions
- Fallback avatar for testimonials without images
- Text remains selectable during animations

## Content Guidelines

### Testimonial Structure

- Quote text (required)
- Author name (required)
- Author image (optional)
- Company/role (recommended)

## Performance Indicators

- Zero layout shifts during transitions
- Responsive behavior across breakpoints
