# Tutoring Booking Flow

## Overview

This document describes the new tutoring booking flow that allows families to convert their Bright Horizons backup care credits for tutoring services.

## Features

### Provider Selection
- **Sylvan Learning In-Person Tutoring**: Traditional in-person tutoring at learning centers
- **Sylvan Learning Virtual Tutoring**: Online tutoring with the proven Sylvan Method™
- **Varsity Tutors Virtual Tutoring**: 24/7 online tutoring platform

All providers are marked as "Bright Choice" and are filtered based on student age and employer offerings.

### Package Selection
Users can choose from three tutoring packages:
- **4 Virtual Tutoring Hours**: Deducts 1 day from backup care bank
- **8 Virtual Tutoring Hours**: Deducts 2 days from backup care bank (most popular)
- **12 Virtual Tutoring Hours**: Deducts 3 days from backup care bank

### Checkout Process
The checkout step includes:
- Review of selected tutoring credits
- Estimated benefit utilization (days deducted from backup care bank)
- Estimated co-pay ($30)
- Payment method selection
- Contact method preferences
- Final confirmation

## Implementation Details

### Components
- `TutoringFormModal.tsx`: Main modal component for the tutoring booking flow
- `app/tutoring/page.tsx`: Route that redirects to the main page with tutoring modal
- Updated `BentoEnrollmentCard.tsx` and `BentoNetworkCard.tsx` to include tutoring buttons

### Navigation
- Direct access: `/tutoring` redirects to `/?modal=tutoring`
- Modal can be opened from multiple entry points:
  - "Book Tutoring" button on the main enrollment card
  - "Book Tutoring" button on the network card
  - "Book Tutoring" button in the CTA section

### UI Reuse
The tutoring flow reuses existing UI components:
- Progress bar/stepper from the coaching form
- Card components for provider and package selection
- Form components for checkout
- Modal structure and animations
- Button styles and interactions

### Animations
Following the workspace animation guidelines:
- Uses `ease-out-quart` for modal entrance/exit
- Fast animations (200-300ms duration)
- Hardware-accelerated transforms
- Reduced motion support

## Usage

1. Click any "Book Tutoring" button on the homepage
2. Select a tutoring provider (Sylvan Learning or Varsity Tutors)
3. Choose a tutoring package (4, 8, or 12 hours)
4. Complete the checkout process with payment and contact information
5. Click "Reserve Credits" to complete the booking

## Technical Notes

- The flow is completely separate from the coaching reservation flow
- All data is currently hardcoded for demonstration purposes
- The checkout step includes a fake $30 copay
- The flow follows the same design patterns as the existing coaching form
- Mobile-responsive with horizontal stepper on mobile devices
