# Fix homepage CMS flicker and update homepage calls to action

## Changes
- Replace per-text database requests with one shared CMS content query.
- Prime homepage CMS content before rendering, then reuse it through TanStack Query and local storage for instant repeat visits.
- Keep inline editing, admin checks, optimistic updates, and database saves intact while synchronizing successful edits into the cache.
- Change the hero buttons to “Join Batch 03” and “View Masterclass Details”, linking both to stable anchors in the Batch 03 course area.
- Remove only the homepage tutorial/embed section and photo-gallery placeholder section.
- Correct the existing `EditableImage` schema mismatch so the project compiles.

## Validation
- Confirm the homepage renders without the removed blocks or stale-text swaps.
- Test both hero links, anonymous browsing, and the admin page at desktop and 320px widths.
- Check the latest build and browser runtime logs.

## Technical details
- Add a public `createServerFn` for `content_blocks`, use route loader `ensureQueryData`, and subscribe through `useSuspenseQuery` in the CMS provider.
- Persist the latest content map in local storage as immediate client placeholder data; server-loaded query data remains authoritative.
- Reuse `CmsProvider` values inside `EditableText` instead of issuing one request per text node.
