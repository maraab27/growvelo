# Plan: Fix UI Text Overlays and Interaction Issues

The user reported that several sections of the website show incorrect instruction text when hovering, images are missing, and FAQ items are not clickable. This was caused by a previous misunderstanding where instruction text was literally inserted into the code as UI elements.

## Proposed Changes

### 1. Cleanup `src/components/site/sections.tsx`
- Remove the `z-50` overlay blocks in `StudentShowcase`, `AccordionItem` (FAQ), and `BigCTA` that display the instruction text and block interactions.
- Specifically remove lines 694-700, 1179-1185, and 1279-1285.

### 2. Restore Interactions
- Removing the overlays will naturally restore clickability to the FAQ items and other elements covered by the overlays.

### 3. Verify Asset Paths
- Ensure that the imported assets (`growveloMark`, `courseThumbnail`, `instructorAtaullah`) are correctly rendered.
- The user mentioned images are missing. I will verify if the asset URLs in the `.asset.json` files are valid or if there's a rendering issue.

## Technical Details
- Using `code--line_replace` to remove the unwanted blocks of code.
- No changes to business logic or design system tokens are required.
